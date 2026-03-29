document.addEventListener('DOMContentLoaded', function() {
  // Gestion de la navigation du Dashboard
  const navItems = document.querySelectorAll('.dash-nav-item');
  const views = document.querySelectorAll('.dash-view');
  const pageTitle = document.getElementById('pageTitle');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Retirer la classe active de tous les items
      navItems.forEach(nav => nav.classList.remove('active'));
      // Ajouter la classe active à l'item cliqué
      item.classList.add('active');

      // Cacher toutes les vues
      views.forEach(view => {
        view.style.display = 'none';
        view.classList.remove('fade-in');
      });

      // Afficher la vue correspondante
      const targetId = item.getAttribute('href').substring(1); // enlève le #
      const targetView = document.getElementById(targetId);
      
      if (targetView) {
        targetView.style.display = 'block';
        // Petit délai pour l'animation
        setTimeout(() => targetView.classList.add('fade-in'), 10);
        
        // Mise à jour du titre (optionnel)
        if(pageTitle) pageTitle.textContent = item.querySelector('span').textContent;
      }
    });
  });

  // Simulation : Bouton PDF dans Grades
  const pdfBtns = document.querySelectorAll('.btn-pdf');
  pdfBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const originalText = btn.textContent;
      btn.textContent = 'Téléchargement...';
      setTimeout(() => {
        btn.textContent = '✓ Téléchargé';
        setTimeout(() => btn.textContent = originalText, 2000);
      }, 1000);
    });
  });

  // Simulation : Changement de thème
  const themeSelect = document.getElementById('themeSelect');
  if(themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      if(e.target.value === 'dark') {
        alert("Le mode sombre sera disponible dans la prochaine mise à jour !");
      }
    });
  }
});