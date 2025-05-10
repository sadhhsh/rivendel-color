document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");
  const mobileMenu = document.querySelector(".mobile-menu");

  // Function to close mobile menu properly
  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Function to open mobile menu
  function openMobileMenu() {
    mobileMenu.classList.add("active");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
    document.body.style.overflow = "hidden"; // Prevent body scrolling
  }

  // Toggle mobile menu
  menuIcon.addEventListener("click", openMobileMenu);

  // Close mobile menu
  closeIcon.addEventListener("click", closeMobileMenu);

  // Close when clicking links
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // Only prevent default if it's a hash link
      if (link.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          closeMobileMenu();
          // Small delay to allow menu to close before scrolling
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } else {
        // For non-hash links (like contact.html), just close menu
        closeMobileMenu();
      }
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".mobile-menu") &&
      !e.target.closest(".menu-icon") &&
      mobileMenu.classList.contains("active")
    ) {
      closeMobileMenu();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1125) {
      closeMobileMenu();
    } else {
      menuIcon.style.display = "block";

      // Additional check for landscape mobile
      if (window.innerHeight < 500) {
        // Typical landscape height threshold
        document.querySelector(".mobile-nav").style.maxHeight = "60vh";
      }
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

  const animatedElements = document.querySelectorAll(".animated-heading");

  // Reset animation - now accepts element parameter
  const resetAnimation = (element) => {
    element.classList.remove("animate");
    void element.offsetWidth; // Force reflow
    element.classList.add("animate");
  };

  // Create observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetAnimation(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Initialize animations for all elements
  animatedElements.forEach((element) => {
    if (element) {
      resetAnimation(element); // Initial animation
      observer.observe(element); // Start observing
    }
  });
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

if (window.innerWidth <= 768) {
  // Only preload for mobile
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = "media/Frame-3-mobile.webp";
  link.as = "image";
  document.head.appendChild(link);
}
