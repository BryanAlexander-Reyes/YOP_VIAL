// ═══════════════════════════════
// ANIMACIONES AL HACER SCROLL
// ═══════════════════════════════

document.addEventListener("DOMContentLoaded", () => {

  // Mostrar hero inmediatamente
  const hero = document.querySelector(".fade-up");
  if (hero) {
    hero.classList.add("active");
  }

  // Animaciones al hacer scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".sv-nav-links");

if(menuBtn && navLinks){

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".sv-nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

}