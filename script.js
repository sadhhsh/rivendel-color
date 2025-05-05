document.addEventListener("DOMContentLoaded", () => {
  // 1. Define all elements first
  const navLinks = document.querySelectorAll(".nav a"); // All nav links
  const nav = document.querySelector(".nav"); // Nav element
  const html = document.documentElement; // HTML element
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");

  // 2. Mobile menu toggle
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.add("active");
  });

  // 3. Close menu function
  const closeMenu = () => {
    nav.classList.remove("active");
  };

  // 4. Close menu events
  closeIcon.addEventListener("click", closeMenu);

  // 5. Nav link click handler (your code - fixed)
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.href.includes(window.location.hostname)) {
        if (!link.href.includes(window.location.pathname)) {
          return; // Allow normal navigation for external/page-change links
        }

        e.preventDefault();
        const targetId = link.getAttribute("href").split("#")[1];
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          closeMenu(); // Use the close function we defined
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // 6. Close when clicking outside
  html.addEventListener("click", (e) => {
    if (
      nav.classList.contains("active") &&
      !e.target.closest(".nav, .menu-icon")
    ) {
      closeMenu();
    }
  });

  // 7. Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      closeMenu();
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
