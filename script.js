// Image loading handler for mobile menu background
function handleMobileMenuBackground() {
  const mobileMenu = document.querySelector(".mobile-menu");
  if (!mobileMenu) return;

  const img = new Image();
  img.src = "media/Frame-3.webp";

  // Set timeout to check if image loaded within 1 second
  const loadTimeout = setTimeout(() => {
    if (!img.complete) {
      // Image didn't load quickly, keep fallback color
      mobileMenu.style.backgroundImage = "none";
    }
  }, 1000);

  // If image loads successfully
  img.onload = function () {
    clearTimeout(loadTimeout);
    // Apply the image background
    mobileMenu.style.backgroundImage =
      'linear-gradient(rgba(231, 235, 240, 0.3), transparent), url("media/Frame-3.webp")';
  };

  // If image fails to load
  img.onerror = function () {
    clearTimeout(loadTimeout);
    // Keep fallback color only
    mobileMenu.style.backgroundImage = "none";
  };
}

// Mobile menu handler with landscape fixes
function setupMobileMenu() {
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!menuIcon || !closeIcon || !mobileMenu) return;

  function positionCloseIcon() {
    if (window.innerWidth <= 1124 && window.innerHeight < window.innerWidth) {
      // Landscape mode
      closeIcon.style.position = "absolute";
      closeIcon.style.top = "1rem";
      closeIcon.style.right = "1rem";
      closeIcon.style.fontSize = "2rem";
    } else {
      // Portrait mode
      closeIcon.style.position = "fixed";
      closeIcon.style.top = "2rem";
      closeIcon.style.right = "2rem";
      closeIcon.style.fontSize = "2.4rem";
    }
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
    document.body.style.overflow = ""; // Restore scrolling
  }

  function openMobileMenu() {
    mobileMenu.classList.add("active");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
    document.body.style.overflow = "hidden"; // Prevent body scrolling
    positionCloseIcon(); // Position icon properly when opening
  }

  // Toggle mobile menu
  menuIcon.addEventListener("click", openMobileMenu);

  // Close mobile menu
  closeIcon.addEventListener("click", closeMobileMenu);

  // Close when clicking links - updated to handle all mobile links
  document.querySelectorAll(".mobile-nav a, .mobile-cta a").forEach((link) => {
    link.addEventListener("click", (e) => {
      closeMobileMenu();

      // Only prevent default for anchor links
      if (link.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
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

  // Handle resize events
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1125) {
      closeMobileMenu();
    } else {
      menuIcon.style.display = "block";
      positionCloseIcon();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  handleMobileMenuBackground();
  setupMobileMenu();

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

  AOS.init({
    once: false,
    mirror: true,
    throttleDelay: 50, // Helps with Firefox performance
    debounceDelay: 30, // Helps prevent multiple triggers
    offset: 200, // Increased from 150
    duration: 1300,
    startEvent: "DOMContentLoaded",
    // New settings for smoother transitions
    easing: "ease-in-out",
    delay: 100,
  });

  // Firefox-specific AOS refresh handler
  if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
    const aosElements = document.querySelectorAll("[data-aos]");

    // Add persistence class when element enters view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-persist");
          } else {
            // Delay removal for smoother exit
            setTimeout(() => {
              entry.target.classList.remove("aos-persist");
            }, 300); // 300ms delay before removing
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px", // Larger bottom margin
      }
    );

    aosElements.forEach((el) => observer.observe(el));
  }
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
  link.href = "media/Frame-3.webp";
  link.as = "image";
  document.head.appendChild(link);
}
