document.addEventListener("DOMContentLoaded", () => {
  const tabSets = document.querySelectorAll(".code-tabs");

  tabSets.forEach((tabSet) => {
    const buttons = Array.from(tabSet.querySelectorAll(".tab-button"));
    const panels = Array.from(tabSet.querySelectorAll(".tab-panel"));
    const defaultTab = tabSet.dataset.default || (buttons[0] && buttons[0].dataset.tab);

    const activate = (lang) => {
      buttons.forEach((button) => {
        const isActive = button.dataset.tab === lang;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== lang;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => activate(button.dataset.tab));
    });

    if (defaultTab) {
      activate(defaultTab);
    }
  });
});
