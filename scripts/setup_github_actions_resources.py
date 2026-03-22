#!/usr/bin/env python3
"""Create GitHub Actions deployment resources using gh CLI authentication."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any
from urllib.parse import quote


DEFAULT_REPO = "Kolo-Algorytmiczne-WSB-NLU/AlgoNotes"
DEFAULT_ENVIRONMENT = "production"
DEFAULT_BRANCH = "master"
DEFAULT_AWS_REGION = "us-east-1"
DEFAULT_BUCKET = "algo-notes"
API_VERSION = "2022-11-28"


def run_command(command: list[str], *, input_text: str | None = None) -> str:
    result = subprocess.run(
        command,
        input=input_text,
        text=True,
        capture_output=True,
        check=False,
    )

    if result.returncode != 0:
        stderr = result.stderr.strip() or result.stdout.strip()
        raise RuntimeError(f"Command failed: {' '.join(command)}\n{stderr}")

    return result.stdout.strip()


def gh_api(endpoint: str, *, method: str = "GET", body: dict[str, Any] | None = None) -> Any:
    endpoint = endpoint.lstrip("/")

    command = [
        "gh",
        "api",
        "--method",
        method,
        endpoint,
        "--header",
        "Accept: application/vnd.github+json",
        "--header",
        f"X-GitHub-Api-Version: {API_VERSION}",
    ]

    input_text = None
    if body is not None:
        command.extend(["--input", "-"])
        input_text = json.dumps(body)

    output = run_command(command, input_text=input_text)
    if not output:
        return None
    return json.loads(output)


def ensure_dependencies() -> None:
    for executable in ("gh", "terraform"):
        if executable == "terraform":
            continue
        if shutil.which(executable) is None:
            raise RuntimeError(f"Missing required executable: {executable}")

    run_command(["gh", "auth", "status"])


def load_terraform_outputs(terraform_dir: Path) -> dict[str, str]:
    if not terraform_dir.exists():
        return {}

    try:
        raw = run_command(["terraform", f"-chdir={terraform_dir}", "output", "-json"])
    except RuntimeError:
        return {}

    outputs = json.loads(raw)
    values: dict[str, str] = {}

    for key, payload in outputs.items():
        value = payload.get("value")
        if isinstance(value, str):
            values[key] = value

    return values


def resolve_user_reviewer_id(login: str) -> int:
    user = gh_api(f"/users/{login}")
    return int(user["id"])


def resolve_team_reviewer_id(org: str, slug: str) -> int:
    team = gh_api(f"/orgs/{org}/teams/{slug}")
    return int(team["id"])


def build_reviewers(owner: str, users: list[str], teams: list[str]) -> list[dict[str, Any]]:
    reviewers: list[dict[str, Any]] = []

    for login in users:
        reviewers.append({"type": "User", "id": resolve_user_reviewer_id(login)})

    for slug in teams:
        reviewers.append({"type": "Team", "id": resolve_team_reviewer_id(owner, slug)})

    if len(reviewers) > 6:
        raise RuntimeError("GitHub environments support at most 6 reviewers.")

    return reviewers


def ensure_environment(
    owner: str,
    repo: str,
    environment: str,
    branch: str | None,
    reviewers: list[dict[str, Any]],
    wait_timer: int,
    prevent_self_review: bool,
) -> None:
    payload: dict[str, Any] = {
        "wait_timer": wait_timer,
        "prevent_self_review": prevent_self_review,
        "reviewers": reviewers or None,
        "deployment_branch_policy": None,
    }

    if branch:
        payload["deployment_branch_policy"] = {
            "protected_branches": False,
            "custom_branch_policies": True,
        }

    endpoint = f"/repos/{owner}/{repo}/environments/{quote(environment, safe='')}"
    gh_api(endpoint, method="PUT", body=payload)

    if branch:
        ensure_branch_policy(owner, repo, environment, branch)


def ensure_branch_policy(owner: str, repo: str, environment: str, branch: str) -> None:
    environment_path = quote(environment, safe="")
    endpoint = f"/repos/{owner}/{repo}/environments/{environment_path}/deployment-branch-policies"
    response = gh_api(endpoint)

    existing_names = {policy["name"] for policy in response.get("branch_policies", [])}
    if branch in existing_names:
        return

    gh_api(endpoint, method="POST", body={"name": branch, "type": "branch"})


def ensure_environment_variable(owner: str, repo: str, environment: str, name: str, value: str) -> None:
    environment_path = quote(environment, safe="")
    list_endpoint = f"/repos/{owner}/{repo}/environments/{environment_path}/variables"
    response = gh_api(list_endpoint)
    existing_names = {item["name"] for item in response.get("variables", [])}

    if name in existing_names:
        variable_endpoint = f"{list_endpoint}/{name}"
        gh_api(variable_endpoint, method="PATCH", body={"name": name, "value": value})
        return

    gh_api(list_endpoint, method="POST", body={"name": name, "value": value})


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create or update the GitHub Actions deployment environment for AlgoNotes."
    )
    parser.add_argument("--repo", default=DEFAULT_REPO, help="Repository in OWNER/REPO format.")
    parser.add_argument("--environment", default=None, help="GitHub environment name.")
    parser.add_argument("--branch", default=None, help="Allowed deployment branch.")
    parser.add_argument("--aws-region", default=None, help="AWS region stored as an environment variable.")
    parser.add_argument("--bucket", default=None, help="S3 bucket name stored as an environment variable.")
    parser.add_argument("--role-arn", default=None, help="IAM role ARN stored as an environment variable.")
    parser.add_argument(
        "--terraform-dir",
        default="infra",
        help="Directory containing Terraform state and outputs.",
    )
    parser.add_argument(
        "--reviewer-user",
        action="append",
        default=[],
        help="GitHub username allowed to approve deployments. Can be repeated.",
    )
    parser.add_argument(
        "--reviewer-team",
        action="append",
        default=[],
        help="GitHub team slug allowed to approve deployments. Can be repeated.",
    )
    parser.add_argument(
        "--wait-timer",
        type=int,
        default=0,
        help="Environment wait timer in minutes.",
    )
    parser.add_argument(
        "--prevent-self-review",
        action="store_true",
        help="Prevent the actor who started the deployment from self-approving.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    ensure_dependencies()

    if "/" not in args.repo:
        raise RuntimeError("--repo must use OWNER/REPO format.")

    owner, repo = args.repo.split("/", 1)
    terraform_outputs = load_terraform_outputs(Path(args.terraform_dir))

    environment = (
        args.environment
        or terraform_outputs.get("github_environment_name")
        or DEFAULT_ENVIRONMENT
    )
    branch = (
        args.branch
        or terraform_outputs.get("github_branch_name")
        or DEFAULT_BRANCH
    )
    aws_region = args.aws_region or terraform_outputs.get("aws_region") or DEFAULT_AWS_REGION
    bucket = args.bucket or terraform_outputs.get("s3_bucket_name") or DEFAULT_BUCKET
    role_arn = args.role_arn or terraform_outputs.get("github_actions_role_arn")

    if not role_arn:
        raise RuntimeError(
            "Unable to determine the IAM role ARN. Pass --role-arn or run the script after terraform apply."
        )

    reviewers = build_reviewers(owner, args.reviewer_user, args.reviewer_team)

    ensure_environment(
        owner=owner,
        repo=repo,
        environment=environment,
        branch=branch,
        reviewers=reviewers,
        wait_timer=args.wait_timer,
        prevent_self_review=args.prevent_self_review,
    )

    variables = {
        "AWS_REGION": aws_region,
        "AWS_ROLE_ARN": role_arn,
        "S3_BUCKET_NAME": bucket,
    }

    for name, value in variables.items():
        ensure_environment_variable(owner, repo, environment, name, value)

    print(f"Configured GitHub environment '{environment}' for {owner}/{repo}.")
    print(f"Allowed branch policy: {branch}")
    print(f"Stored variables: {', '.join(sorted(variables))}")
    if reviewers:
        print(f"Configured reviewers: {len(reviewers)}")
    else:
        print("Configured reviewers: none")

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(1)
