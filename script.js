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

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });

    // Name validation
    const nameInput = document.getElementById("full-name");
    const nameError = document.getElementById("name-error");
    if (!/^[A-Za-z\s]{3,50}$/.test(nameInput.value)) {
      nameError.textContent =
        "Please enter a valid name (letters and spaces only, 3-50 characters)";
      nameError.style.display = "block";
      isValid = false;
    }

    // Email validation
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailError.textContent = "Please enter a valid email address";
      emailError.style.display = "block";
      isValid = false;
    }

    // Phone validation
    const phoneInput = document.getElementById("phone-no");
    const phoneError = document.getElementById("phone-error");
    if (!/^[0-9]{10,15}$/.test(phoneInput.value)) {
      phoneError.textContent =
        "Please enter a valid phone number (10-15 digits)";
      phoneError.style.display = "block";
      isValid = false;
    }

    // Message validation
    const messageInput = document.getElementById("message");
    const messageError = document.getElementById("message-error");
    if (messageInput.value.length < 10 || messageInput.value.length > 500) {
      messageError.textContent =
        "Message must be between 10 and 500 characters";
      messageError.style.display = "block";
      isValid = false;
    }

    // Sanitize message content
    const sanitizedMessage = messageInput.value.replace(/<[^>]*>/g, "");
    messageInput.value = sanitizedMessage;

    if (isValid) {
      // Form is valid - proceed with submission
      this.submit();
    }
  });

// Real-time validation for name field (no special characters)
document.getElementById("full-name").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^A-Za-z\s]/g, "");
});

// Real-time validation for phone field (numbers only)
document.getElementById("phone-no").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9]/g, "");
});
