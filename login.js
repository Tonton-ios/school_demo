document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const usernameInput = loginForm.querySelector('input[name="username"]');
      const passwordInput = loginForm.querySelector('input[name="password"]');
      const btn = loginForm.querySelector('button[type="submit"]');
      
      if (usernameInput.value && passwordInput.value) {
        // Simulation de chargement
        const originalText = btn.textContent;
        btn.textContent = 'Connexion en cours...';
        btn.style.opacity = '0.8';
        btn.disabled = true;

        // Sauvegarde du nom pour l'affichage sur le dashboard (Demo)
        localStorage.setItem('studentName', usernameInput.value);

        setTimeout(function() {
          window.location.href = 'dashboard.html';
        }, 1500);
      }
    });
  }
});