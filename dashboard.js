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

  // --- Gestion des ressources de cours ---
  const courseCards = document.querySelectorAll('.course-card');
  const coursListView = document.getElementById('view-cours');
  const courseDetailView = document.getElementById('view-course-detail');
  const courseDetailTitle = document.getElementById('courseDetailTitle');
  const courseResources = document.getElementById('courseResources');
  const backBtn = document.getElementById('backToCourses');

  // Données de simulation pour les ressources de cours
  const courseData = {
    'Mathématiques': [
      { title: 'Introduction à l\'Algèbre', type: 'Support PDF', icon: '📄', link: '#' },
      { title: 'Vidéo : Résolution d\'équations', type: 'Tutoriel Vidéo', icon: '🎥', link: '#' },
      { title: 'QCM de révision interactive', type: 'Lien externe', icon: '🔗', link: '#' }
    ],
    'SVT': [
      { title: 'La Photosynthèse (Schémas)', type: 'Fiche de cours', icon: '🧬', link: '#' },
      { title: 'Le système nerveux', type: 'Animation interactive', icon: '🎥', link: '#' }
    ],
    'Français': [
      { title: 'Molière : L\'Avare', type: 'Texte intégral (PDF)', icon: '📚', link: '#' },
      { title: 'Analyse des figures de style', type: 'Support de cours', icon: '📄', link: '#' }
    ],
    'Anglais': [
      { title: 'List of Irregular Verbs', type: 'PDF Recap', icon: '🇬🇧', link: '#' },
      { title: 'Podcast : British Culture', type: 'Audio MP3', icon: '🎧', link: '#' }
    ]
  };

  courseCards.forEach(card => {
    card.addEventListener('click', () => {
      const courseName = card.querySelector('strong').textContent;
      if (courseDetailTitle) courseDetailTitle.textContent = courseName;
      
      // Vidage et remplissage des ressources
      if (courseResources) {
        courseResources.innerHTML = '';
        const resources = courseData[courseName] || [];
        
        if (resources.length === 0) {
          courseResources.innerHTML = '<p style="color:var(--muted);">Aucune ressource disponible pour le moment.</p>';
        } else {
          resources.forEach(res => {
            const item = document.createElement('div');
            item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;';
            item.innerHTML = `
              <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="font-size: 1.5rem;">${res.icon}</span>
                <div>
                  <div style="font-weight: 600; color: var(--dark);">${res.title}</div>
                  <div style="font-size: 0.85rem; color: var(--muted);">${res.type}</div>
                </div>
              </div>
              <a href="${res.link}" target="_blank" class="btn outline" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Consulter</a>
            `;
            courseResources.appendChild(item);
          });
        }
      }

      // Changement de vue vers le détail du cours
      if (coursListView) coursListView.style.display = 'none';
      if (courseDetailView) {
        courseDetailView.style.display = 'block';
        setTimeout(() => courseDetailView.classList.add('fade-in'), 10);
      }
    });
  });

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (courseDetailView) courseDetailView.style.display = 'none';
      if (coursListView) {
        coursListView.style.display = 'block';
        setTimeout(() => coursListView.classList.add('fade-in'), 10);
      }
    });
  }
});