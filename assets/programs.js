document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");

  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  }

  const tabsRoot = document.querySelector("[data-tabs]");
  if (!tabsRoot) {
    return;
  }

  const tabButtons = Array.from(tabsRoot.querySelectorAll(".tab-button"));
  const tabPanels = Array.from(tabsRoot.querySelectorAll(".tab-panel"));
  const tabSelect = tabsRoot.querySelector(".tab-select");

  const activateTab = (panelId) => {
    tabButtons.forEach((button) => {
      const isSelected = button.getAttribute("aria-controls") === panelId;
      button.setAttribute("aria-selected", isSelected);
    });

    tabPanels.forEach((panel) => {
      panel.hidden = panel.id !== panelId;
    });

    if (tabSelect) {
      tabSelect.value = panelId;
    }
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.getAttribute("aria-controls"));
    });
  });

  if (tabSelect) {
    tabSelect.addEventListener("change", (event) => {
      activateTab(event.target.value);
    });
  }

  const initialButton = tabButtons.find((button) => button.getAttribute("aria-selected") === "true") || tabButtons[0];
  if (initialButton) {
    activateTab(initialButton.getAttribute("aria-controls"));
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://seniorsdigitalliteracy.ca/",
    "logo": "https://seniorsdigitalliteracy.ca/assets/logo2.png",
    "name": "Senior Digital Literacy",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "seniorsdigitalliteracy@proton.me",
      "contactType": "Customer Service"
    },
    "sameAs": [
      "https://www.facebook.com/share/18aBp6LEHC/"
    ]
  };

  const structuredDataScript = document.createElement("script");
  structuredDataScript.type = "application/ld+json";
  structuredDataScript.textContent = JSON.stringify(structuredData);
  document.head.appendChild(structuredDataScript);
});