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

AOS.init({
  once: false,
  mirror: true,
});
