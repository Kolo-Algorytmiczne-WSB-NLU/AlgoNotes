document.addEventListener("DOMContentLoaded", () => {
  const demos = document.querySelectorAll(".lang-demo");

  demos.forEach((demo) => {
    const buttons = Array.from(demo.querySelectorAll(".lang-button"));
    const panels = Array.from(demo.querySelectorAll(".lang-panel"));
    const defaultLang = demo.dataset.default || (buttons[0] && buttons[0].dataset.lang);

    const activate = (lang) => {
      buttons.forEach((button) => {
        const isActive = button.dataset.lang === lang;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.langPanel !== lang;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => activate(button.dataset.lang));
    });

    if (defaultLang) {
      activate(defaultLang);
    }
  });
});
