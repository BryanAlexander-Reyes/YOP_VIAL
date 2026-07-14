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
// ══════════════════════════════
// MENÚ RESPONSIVE
// ══════════════════════════════
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".sv-nav-links");

if(menuBtn && navLinks){

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".sv-nav-links > a").forEach(link => {
    link.addEventListener("click", (e) => {
      if (link.closest(".sv-dropdown-content")) return; // evita cerrar el menú si es un enlace del dropdown
      navLinks.classList.remove("active");
    });
  });

}

// ══════════════════════════════
// BOTÓN DE REPORTE DE INCIDENTE
// ══════════════════════════════
document.getElementById("btnReporte").addEventListener("click", () => {
  window.location.href = "PQR/reportes-ciudadanos.html";
});

// // ══════════════════════════════
// // MENÚ DESPLEGABLE EDUCACIÓN
// // ══════════════════════════════
// function toggleEducacion(event) {
//   event.preventDefault();

//   const menu = document.querySelector(".sv-dropdown-content");

//   if (!menu) return; // 🔥 evita el error si no existe

//   if (menu.style.display === "block") {
//     menu.style.display = "none";
//   } else {
//     menu.style.display = "block";
//   }
// }
