document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");
  const mobileMenu = document.querySelector(".mobile-menu");

  // Toggle mobile menu
  menuIcon.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
    document.body.style.overflow = "hidden";
  });

  // Close mobile menu
  closeIcon.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
    document.body.style.overflow = "";
  });

  // Close when clicking links
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".mobile-menu") &&
      !e.target.closest(".menu-icon") &&
      mobileMenu.classList.contains("active")
    ) {
      mobileMenu.classList.remove("active");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 576) {
      // Desktop breakpoint
      mobileMenu.classList.remove("active");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
      document.body.style.overflow = ""; // Re-enable scrolling
    }
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    // Safety check

    // Real-time validation
    document
      .getElementById("full-name")
      .addEventListener("input", function (e) {
        this.value = this.value.replace(/[^A-Za-z\s]/g, "");
      });

    document.getElementById("phone-no").addEventListener("input", function (e) {
      this.value = this.value.replace(/[^0-9]/g, "");
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      //Clear previous errors
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
  }
});

AOS.init({
  once: false,
  mirror: true,
});

if (!CSS.supports("scroll-padding-top", "0")) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}
