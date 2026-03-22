terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region used by the GitHub Actions deploy workflow."
  type        = string
  default     = "us-east-1"
}

variable "github_owner" {
  description = "GitHub organization or user that owns the repository."
  type        = string
  default     = "Kolo-Algorytmiczne-WSB-NLU"
}

variable "github_repo" {
  description = "GitHub repository name."
  type        = string
  default     = "AlgoNotes"
}

variable "github_branch" {
  description = "Branch allowed to deploy directly when the workflow is branch-based."
  type        = string
  default     = "master"
}

variable "github_environment" {
  description = "GitHub Actions environment allowed to assume the AWS role."
  type        = string
  default     = "production"
}

variable "s3_bucket_name" {
  description = "Existing S3 bucket name used for static site deployment."
  type        = string
  default     = "algo-notes"
}

variable "iam_role_name" {
  description = "IAM role name assumed by GitHub Actions."
  type        = string
  default     = "github-actions-algonotes-s3-deploy"
}

variable "iam_policy_name" {
  description = "IAM policy name attached to the GitHub Actions role."
  type        = string
  default     = "github-actions-algonotes-s3-deploy"
}

variable "existing_github_oidc_provider_arn" {
  description = "Existing GitHub OIDC provider ARN. Leave null to discover the account-level GitHub OIDC provider by URL."
  type        = string
  default     = null
}

variable "create_github_oidc_provider" {
  description = "Create the GitHub OIDC provider in this stack. Leave false when the account already has the shared provider."
  type        = bool
  default     = false
}

locals {
  bucket_arn = "arn:aws:s3:::${var.s3_bucket_name}"

  allowed_subjects = [
    "repo:${var.github_owner}/${var.github_repo}:ref:refs/heads/${var.github_branch}",
    "repo:${var.github_owner}/${var.github_repo}:environment:${var.github_environment}",
  ]

  github_oidc_provider_arn = var.existing_github_oidc_provider_arn != null ? var.existing_github_oidc_provider_arn : (
    var.create_github_oidc_provider ? aws_iam_openid_connect_provider.github[0].arn : data.aws_iam_openid_connect_provider.github[0].arn
  )
}

data "aws_iam_openid_connect_provider" "github" {
  count = var.existing_github_oidc_provider_arn == null && !var.create_github_oidc_provider ? 1 : 0

  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "github" {
  count = var.existing_github_oidc_provider_arn == null && var.create_github_oidc_provider ? 1 : 0

  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com",
  ]
}

data "aws_iam_policy_document" "github_actions_assume_role" {
  statement {
    sid    = "GitHubActionsAssumeRole"
    effect = "Allow"

    actions = [
      "sts:AssumeRoleWithWebIdentity",
    ]

    principals {
      type = "Federated"

      identifiers = [
        local.github_oidc_provider_arn,
      ]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"

      values = [
        "sts.amazonaws.com",
      ]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = local.allowed_subjects
    }
  }
}

resource "aws_iam_role" "github_actions_s3_deploy" {
  name               = var.iam_role_name
  assume_role_policy = data.aws_iam_policy_document.github_actions_assume_role.json
}

data "aws_iam_policy_document" "github_actions_s3_deploy" {
  statement {
    sid    = "ListDeploymentBucket"
    effect = "Allow"

    actions = [
      "s3:ListBucket",
    ]

    resources = [
      local.bucket_arn,
    ]
  }

  statement {
    sid    = "ManageDeploymentObjects"
    effect = "Allow"

    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
    ]

    resources = [
      "${local.bucket_arn}/*",
    ]
  }
}

resource "aws_iam_policy" "github_actions_s3_deploy" {
  name   = var.iam_policy_name
  policy = data.aws_iam_policy_document.github_actions_s3_deploy.json
}

resource "aws_iam_role_policy_attachment" "github_actions_s3_deploy" {
  role       = aws_iam_role.github_actions_s3_deploy.name
  policy_arn = aws_iam_policy.github_actions_s3_deploy.arn
}

output "github_actions_role_arn" {
  description = "IAM role ARN to use in aws-actions/configure-aws-credentials."
  value       = aws_iam_role.github_actions_s3_deploy.arn
}

output "github_environment_name" {
  description = "GitHub Actions environment expected by the IAM trust policy."
  value       = var.github_environment
}

output "github_branch_name" {
  description = "GitHub branch allowed by the IAM trust policy for branch-based workflows."
  value       = var.github_branch
}

output "github_oidc_provider_arn" {
  description = "GitHub OIDC provider ARN used by the IAM role trust policy."
  value       = local.github_oidc_provider_arn
}

output "s3_bucket_name" {
  description = "Existing S3 bucket used by the deploy workflow."
  value       = var.s3_bucket_name
}

output "aws_region" {
  description = "AWS region used by the deploy workflow."
  value       = var.aws_region
}
