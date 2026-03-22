document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(
    document.querySelectorAll('.tree-nav a[href^="#"]'),
  );

  const entries = navLinks
    .map((link) => {
      const id = decodeURIComponent(link.getAttribute("href").slice(1));
      const element = document.getElementById(id);
      return element ? { id, link, element } : null;
    })
    .filter(Boolean);

  if (!entries.length) {
    return;
  }

  let ticking = false;

  const setActive = (activeLink) => {
    for (const link of navLinks) {
      link.classList.toggle("is-active", link === activeLink);
    }
  };

  const getHashEntry = () => {
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    return entries.find((entry) => entry.id === hash) || null;
  };

  const getScrollEntry = () => {
    const probeLine = 150;
    let current = null;

    for (const entry of entries) {
      const rect = entry.element.getBoundingClientRect();
      if (rect.top <= probeLine && rect.bottom > probeLine) {
        current = entry;
      }
    }

    if (current) {
      return current;
    }

    for (const entry of entries) {
      const rect = entry.element.getBoundingClientRect();
      if (rect.top > probeLine) {
        return entry;
      }
    }

    return entries[entries.length - 1];
  };

  const updateActiveLink = () => {
    ticking = false;

    const hashEntry = getHashEntry();
    if (hashEntry) {
      const rect = hashEntry.element.getBoundingClientRect();
      const hashTargetIsInFocus =
        rect.top <= window.innerHeight * 0.35 && rect.bottom >= 80;

      if (hashTargetIsInFocus) {
        setActive(hashEntry.link);
        return;
      }
    }

    const currentEntry = getScrollEntry();
    if (currentEntry) {
      setActive(currentEntry.link);
    }
  };

  const requestUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateActiveLink);
  };

  for (const { link } of entries) {
    link.addEventListener("click", () => {
      setActive(link);
      window.setTimeout(updateActiveLink, 80);
    });
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", updateActiveLink);

  updateActiveLink();
});
