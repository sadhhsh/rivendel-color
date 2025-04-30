const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");
const nav = document.querySelector(".nav");

menuIcon.addEventListener("click", () => {
  nav.classList.add("show");
  document.body.style.overflow = "hidden";
});

closeIcon.addEventListener("click", () => {
  nav.classList.remove("show");
  document.body.style.overflow = "";
});

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});
