document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.dash-nav-item');
  const views = document.querySelectorAll('.dash-view');
  const pageTitle = document.getElementById('adminPageTitle');
  const roleSelector = document.getElementById('roleSelector');
  const roleBadge = document.getElementById('roleBadge');

  // --- GESTION DES RÔLES ---
  if (roleSelector) {
    roleSelector.addEventListener('change', (e) => {
      const role = e.target.value;
      roleBadge.textContent = role === 'direction' ? 'Direction' : 'Professeur';
      
      // Filtrage du menu
      const profItems = document.querySelectorAll('.prof-only');
      const directionItems = Array.from(navItems).filter(item => 
        !item.classList.contains('prof-only') && item.getAttribute('href') !== '#admin-home'
      );

      if (role === 'prof') {
        profItems.forEach(el => el.style.display = 'flex');
        directionItems.forEach(el => el.style.display = 'none');
        // Aller à la vue par défaut prof
        document.querySelector('a[href="#prof-courses"]').click();
      } else {
        profItems.forEach(el => el.style.display = 'none');
        directionItems.forEach(el => el.style.display = 'flex');
        // Retourner à l'accueil admin
        document.querySelector('a[href="#admin-home"]').click();
      }
    });
  }

  // 1. Navigation entre les vues
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (!href || href === 'index.html') return;
      
      e.preventDefault();
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      views.forEach(view => {
        view.style.display = 'none';
        view.classList.remove('fade-in');
      });

      const targetId = href.substring(1);
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.style.display = 'block';
        setTimeout(() => targetView.classList.add('fade-in'), 10);
        if (pageTitle) pageTitle.textContent = item.querySelector('span').textContent;
      }
    });
  });

  // 2. Gestion des candidatures (Récupération du localStorage)
  function loadApplications() {
    const appsTableBody = document.getElementById('appsTableBody');
    const countApps = document.getElementById('count-apps');
    if (!appsTableBody) return;

    const storedApps = JSON.parse(localStorage.getItem('imsf_applications') || '[]');
    
    if (countApps) countApps.textContent = storedApps.length;

    if (storedApps.length === 0) {
      appsTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--muted);">Aucune candidature reçue pour le moment.</td></tr>';
      return;
    }

    appsTableBody.innerHTML = '';
    storedApps.reverse().forEach((app, index) => {
      const date = new Date(app.sentAt).toLocaleDateString('fr-FR');
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><div style="font-weight:700;">${app.name}</div></td>
        <td><span style="font-size:0.85rem; background:#f1f5f9; padding:0.2rem 0.5rem; border-radius:4px;">${app.jobTitle.split('—')[0]}</span></td>
        <td>
          <div style="font-size:0.85rem;">${app.email}</div>
          <div style="font-size:0.8rem; color:var(--muted);">${app.phone}</div>
        </td>
        <td style="font-size:0.85rem;">${date}</td>
        <td>
          <button class="btn outline" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="alert('Message: ${app.message.replace(/'/g, "\\'")}')">Voir Message</button>
        </td>
      `;
      appsTableBody.appendChild(tr);
    });
  }

  // Bouton pour effacer
  const clearBtn = document.getElementById('clearApps');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Voulez-vous vraiment effacer toutes les candidatures ?')) {
        localStorage.removeItem('imsf_applications');
        loadApplications();
      }
    });
  }

  // 3. Actions Direction : Envoi de messages
  const broadcastForm = document.getElementById('broadcastForm');
  if (broadcastForm) {
    broadcastForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newMsg = {
        title: document.getElementById('msgTitle').value,
        content: document.getElementById('msgContent').value,
        date: 'À l\'instant'
      };
      alert('Message diffusé avec succès aux élèves !');
      broadcastForm.reset();
    });
  }

  // 4. Actions Prof : Ajout de ressources
  const addCourseForm = document.getElementById('addCourseForm');
  if (addCourseForm) {
    addCourseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = document.getElementById('courseSubject').value;
      const title = document.getElementById('resourceTitle').value;
      alert(`Ressource "${title}" ajoutée avec succès au cours de ${subject} !`);
      addCourseForm.reset();
    });
  }

  // 5. Déconnexion
  const logoutBtn = document.getElementById('adminLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isAdminLoggedIn');
      window.location.href = 'admin-login.html';
    });
  }

  loadApplications();
});