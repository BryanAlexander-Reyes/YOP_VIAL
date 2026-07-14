// YopalVial - Gestor de vistas (Home vs Educación) y navegación

document.addEventListener('DOMContentLoaded', () => {
  const eduView = document.getElementById('sv-view-education');
  
  // Función para cambiar de vista
const showView = (viewName) => {

  if (viewName === 'education') {

    if (eduView) {
      eduView.style.display = 'block';
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  } else if (viewName === 'home') {

    // regresar al index principal
    window.location.href = '../index.html';
  }
};

  // Escuchar clics en el logo para volver al Home
  const logo = document.querySelector('.sv-nav-logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      showView('../index.html');
    });
  }

  // Manejo de clics en la barra de navegación
  const navLinks = document.querySelectorAll('.sv-nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (targetId === '#educacion') {
        e.preventDefault();
        showView('education');
      } else {
        // Asegurar que volvemos a la vista home y luego desplazamos
        showView('home');
        if (targetId.startsWith('#')) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            // Retrasar ligeramente para permitir el cambio de visualización
            setTimeout(() => {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }
        }
      }
    });
  });

  // Botón del Hero "Módulo de Educación"
  const heroEduBtn = document.querySelector('.sv-hero-btns a[href="#educacion"]');
  if (heroEduBtn) {
    heroEduBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('education');
    });
  }

  // Manejo de clic en botón de reportar incidente
  const reportBtn = document.querySelector('.sv-nav-cta');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      alert('Esta función te permitirá reportar huecos, semáforos dañados o accidentes en tiempo real. ¡Disponible próximamente!');
    });
  }
  
  // Hacer que la función sea accesible globalmente por si el controlador de educación la necesita
  window.switchAppView = showView;
});
