const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

menuIcon.addEventListener("click", () => {
  nav.classList.add("show");
  document.body.style.overflow = "hidden";
});

closeIcon.addEventListener("click", () => {
  nav.classList.remove("show");
  document.body.style.overflow = "";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    document.body.style.overflow = "";
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Only handle internal page links (not external links)
    if (link.href.includes(window.location.hostname)) {
      // If link points to a different page
      if (!link.href.includes(window.location.pathname)) {
        // Let the browser handle the navigation normally
        return;
      }

      // Only prevent default for same-page anchors
      e.preventDefault();

      const targetId = link.getAttribute("href").split("#")[1];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        nav.classList.remove("show");
        document.body.style.overflow = "";

        // Smooth scroll to section
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".navbar__links");
  const toggleBtn = document.querySelector(".navbar__toggle");

  // Exit if elements don't exist
  if (!navbar || !navLinks || !toggleBtn) {
    console.warn("Navigation elements missing");
    return;
  }

  // Toggle menu function
  const toggleMenu = (shouldOpen) => {
    const isOpen = navLinks.classList.contains("is-open");

    // Only update if state changes
    if (shouldOpen !== isOpen) {
      navLinks.classList.toggle("is-open", shouldOpen);
      document.body.style.overflow = shouldOpen ? "hidden" : "";

      // Update ARIA attributes for accessibility
      toggleBtn.setAttribute("aria-expanded", shouldOpen);
    }
  };

  // Toggle menu on button click
  toggleBtn.addEventListener("click", () => {
    const shouldOpen = !navLinks.classList.contains("is-open");
    toggleMenu(shouldOpen);
  });

  // Close menu when clicking links
  document.querySelectorAll(".navbar__links a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInsideNavbar = e.target.closest(".navbar");
    if (!clickedInsideNavbar && navLinks.classList.contains("is-open")) {
      toggleMenu(false);
    }
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
      toggleMenu(false);
    }
  });
});

AOS.init({
  once: false,
  mirror: true,
});

document.addEventListener("DOMContentLoaded", function () {
  // Configuration for all color pickers
  const pickerConfigs = [
    // Hero Section
    {
      id: "bg-picker",
      target: ".hero-section",
      property: "backgroundColor",
      defaultColor: "#ffffff",
      showCode: true,
    },
    {
      id: "heading-picker",
      target: ".hero-heading",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      textContrast: true,
      showCode: true,
    },
    {
      id: "text-picker",
      target: ".hero-paragraph",
      property: "color",
      defaultColor: "#333333",
      textContrast: true,
      textContrast: true,
      showCode: true,
    },
    {
      id: "button-picker",
      target: ".hero-button",
      property: "backgroundColor",
      defaultColor: "#ff9900",
      textContrast: true,
      showCode: true,
    },

    // Intro Section
    {
      id: "bg-picker-intro",
      target: ".intro-section",
      property: "backgroundColor",
      defaultColor: "#f5f5f5",
      showCode: true,
    },
    {
      id: "heading-picker-intro-h2",
      target: ".intro-section h2",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-intro-h3",
      target: ".intro-section h3",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "text-picker-intro",
      target: ".intro-section p",
      property: "color",
      defaultColor: "#444444",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    //problem

    {
      id: "bg-picker-problem",
      target: ".problem-section",
      property: "backgroundColor",
      defaultColor: "#f5f5f5",
      textContrast: true,
      showCode: true,
    },
    {
      id: "heading-picker-problem-h3",
      target: ".problem-section h3",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-problem-h4",
      target: ".problem-section h4",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    {
      id: "heading-picker-problem-para",
      target: ".problem-section p",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    //services
    {
      id: "bg-picker-service",
      target: ".services-section",
      property: "backgroundColor",
      defaultColor: "#f5f5f5",
      textContrast: true,
      showCode: true,
    },
    {
      id: "heading-picker-service-h2",
      target: ".services-section h2",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-service-h4",
      target: ".services-section h4",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-service-para",
      target: ".services-section p",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    //benefits
    {
      id: "bg-picker-benefit",
      target: ".benefit-section",
      property: "backgroundColor",
      defaultColor: "#f5f5f5",
      textContrast: true,
      showCode: true,
    },
    {
      id: "heading-picker-benefit-h2",
      target: ".benefit-section h2",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-benefit-h2-para",
      target: ".benefit-heading p",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-benefit-h4",
      target: ".benefit-section h4",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-benefit-para",
      target: ".benefit-section p",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    //process
    {
      id: "bg-picker-process",
      target: ".process-section",
      property: "backgroundColor",
      defaultColor: "#f5f5f5",
      textContrast: true,
      showCode: true,
    },
    {
      id: "heading-picker-process-h2",
      target: ".process-heading h2",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-process-h2-para",
      target: ".process-heading p",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-process-h4",
      target: ".process-container h3",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-process-para",
      target: ".process-container p",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    // CTA SECTION
    {
      id: "bg-picker-cta",
      target: ".cta-section",
      property: "backgroundColor",
      defaultColor: "#f5f5f5",
      textContrast: true,
      showCode: true,
    },
    {
      id: "heading-picker-cta",
      target: ".cta-section h2",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-cta-para",
      target: ".cta-section p",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    {
      id: "heading-picker-cta-a",
      target: ".cta-button",
      property: "backgroundColor",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    //outcome
    {
      id: "bg-picker-outcome",
      target: ".outcome-section",
      property: "backgroundColor",
      defaultColor: "#f5f5f5",
      textContrast: true,
      showCode: true,
    },
    {
      id: "heading-picker-outcome",
      target: ".outcome-heading h2",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-outcome-para",
      target: ".outcome-heading p",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-outcome-h4",
      target: ".outcome-bottom h4",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-outcome-h4-p",
      target: ".outcome-bottom p",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    //FOOTER - CTA
    {
      id: "bg-picker-footer-cta",
      target: ".footer-cta",
      property: "backgroundColor",
      defaultColor: "#f5f5f5",
      textContrast: true,
      showCode: true,
    },
    {
      id: "heading-picker-footer-cta",
      target: ".footer-cta h2",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },
    {
      id: "heading-picker-cta-footer-para",
      target: ".footer-cta p",
      property: "color",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    {
      id: "heading-picker-cta-footer-a",
      target: ".footer-cta a",
      property: "backgroundColor",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    {
      id: "bg-picker-main",
      target: "body",
      property: "backgroundColor",
      defaultColor: "#000000",
      textContrast: true,
      multiple: true,
      showCode: true,
    },

    // Add more sections here following the same pattern
  ];

  // Initialize all pickers with added input fields
  pickerConfigs.forEach((config) => {
    const container = document.getElementById(config.id).parentElement;

    // Create input container
    const inputContainer = document.createElement("div");
    inputContainer.style.marginTop = "5px";
    inputContainer.style.display = "flex";

    // Create text input
    const colorInput = document.createElement("input");
    colorInput.type = "text";
    colorInput.placeholder = "Enter hex color";
    colorInput.style.flex = "1";
    colorInput.style.padding = "5px";
    colorInput.style.border = "1px solid #ddd";

    // Create apply button
    const applyButton = document.createElement("button");
    applyButton.textContent = "Apply";
    applyButton.style.marginLeft = "5px";
    applyButton.style.padding = "5px 10px";
    applyButton.style.background = "#4CAF50";
    applyButton.style.color = "white";
    applyButton.style.border = "none";
    applyButton.style.borderRadius = "3px";

    // Add to DOM
    inputContainer.appendChild(colorInput);
    inputContainer.appendChild(applyButton);
    container.appendChild(inputContainer);

    // Handle manual color input
    applyButton.addEventListener("click", function () {
      let hexCode = colorInput.value.trim();

      // Validate hex color
      if (!/^#([0-9A-F]{3}){1,2}$/i.test(hexCode)) {
        if (/^[0-9A-F]{6}$/i.test(hexCode)) {
          hexCode = "#" + hexCode;
        } else {
          alert("Please enter a valid hex color (e.g. #FF0000 or FF0000)");
          return;
        }
      }

      // Update the color picker
      const picker = document.getElementById(config.id)._iro;
      if (picker) {
        picker.color.hexString = hexCode;
      }

      // Apply to elements (using your existing logic)
      if (config.multiple) {
        document.querySelectorAll(config.target).forEach((el) => {
          el.style[config.property] = hexCode;
        });
      } else {
        const element = document.querySelector(config.target);
        if (element) element.style[config.property] = hexCode;
      }

      // Update code display if exists
      const codeDisplay = container.querySelector(".color-code");
      if (codeDisplay) codeDisplay.textContent = hexCode;
    });
  });

  // Initialize all pickers
  pickerConfigs.forEach((config) => {
    const container = document.getElementById(config.id).parentElement;

    // Add code display
    if (config.showCode) {
      const codeDisplay = document.createElement("div");
      codeDisplay.className = "color-code";
      codeDisplay.textContent = config.defaultColor;
      container.appendChild(codeDisplay);
    }

    const picker = new iro.ColorPicker(`#${config.id}`, {
      width: 150,
      color: config.defaultColor,
    });

    picker.on("color:change", (color) => {
      const hexCode = color.hexString;

      // Update code display
      if (config.showCode) {
        container.querySelector(".color-code").textContent = hexCode;
      }

      // Apply to elements
      if (config.multiple) {
        document.querySelectorAll(config.target).forEach((el) => {
          el.style[config.property] = hexCode;
        });
      } else {
        const element = document.querySelector(config.target);
        if (element) {
          element.style[config.property] = hexCode;
          if (config.textContrast) {
            element.style.color = getContrastColor(hexCode);
          }
        }
      }
    });
  });

  // Helper function for contrast calculation
  function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  }
});

class FontPicker {
  constructor(pickerElement) {
    this.picker = pickerElement;
    this.currentTarget = null;
    this.fonts = [];

    // Add debug message
    console.log("Initializing font picker on:", pickerElement);

    this.init().catch((error) => {
      console.error("FontPicker initialization failed:", error);
      this.showError("Failed to initialize font picker");
    });
  }

  async init() {
    // Set up target selection
    const targetButtons = this.picker.querySelectorAll(".target-btn");
    if (targetButtons.length === 0) {
      throw new Error("No target buttons found");
    }

    targetButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        targetButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentTarget = btn.dataset.target;
        console.log("Selected target:", this.currentTarget);
      });
    });

    // Set default target
    const defaultBtn = this.picker.querySelector(".target-btn.active");
    if (defaultBtn) {
      this.currentTarget = defaultBtn.dataset.target;
      console.log("Default target:", this.currentTarget);
    }

    // Load fonts
    try {
      console.log("Loading fonts.json...");
      const response = await fetch("./fonts.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.fonts = data.familyMetadataList;
      console.log(`Loaded ${this.fonts.length} fonts`);
      this.setupSearch();
      this.displayFonts(this.fonts);
    } catch (error) {
      console.error("Error loading fonts:", error);
      this.showError("Failed to load fonts. Please check console for details.");
    }
  }

  setupSearch() {
    const searchInput = this.picker.querySelector(".font-search");
    if (!searchInput) {
      console.error("Search input not found");
      return;
    }
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filtered = this.fonts.filter((font) =>
        font.family.toLowerCase().includes(query)
      );
      this.displayFonts(filtered);
    });
  }

  displayFonts(fonts) {
    const resultsList = this.picker.querySelector(".font-results");
    if (!resultsList) {
      console.error("Results list not found");
      return;
    }
    resultsList.innerHTML = "";

    fonts.forEach((font) => {
      const li = document.createElement("li");
      li.className = "font-option";
      li.textContent = font.family;
      li.addEventListener("click", () => this.applyFont(font.family));
      resultsList.appendChild(li);
    });
  }

  applyFont(fontFamily) {
    if (!this.currentTarget) {
      alert("Please select a target first!");
      return;
    }

    console.log(`Applying font ${fontFamily} to ${this.currentTarget}`);

    const selectors = this.currentTarget.split(",").map((s) => s.trim());
    let totalElements = 0;

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      console.log(
        `Found ${elements.length} elements for selector: ${selector}`
      );

      if (elements.length === 0) {
        console.warn(`No elements found for: ${selector}`);
        return;
      }

      totalElements += elements.length;

      elements.forEach((el) => {
        const original = window.getComputedStyle(el);
        el.style.fontFamily = `'${fontFamily}', ${
          original.fontFamily.split(",")[1] || "sans-serif"
        }`;
      });
    });

    if (totalElements === 0) {
      alert("No elements found for the selected targets!");
      return;
    }

    // Load from Google
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      / /g,
      "+"
    )}`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    console.log(`Loaded Google Font: ${fontFamily}`);
  }

  showError(message) {
    const resultsList = this.picker.querySelector(".font-results");
    if (resultsList) {
      resultsList.innerHTML = `<li style="color:red">${message}</li>`;
    }
  }
}

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, initializing font pickers...");
  document.querySelectorAll(".font-picker").forEach((picker) => {
    new FontPicker(picker);
  });
});
