document.addEventListener('DOMContentLoaded', function() {
  const adminForm = document.getElementById('adminLoginForm');
  const errorMsg = document.getElementById('loginError');

  if (adminForm) {
    adminForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const user = adminForm.querySelector('input[name="adminUser"]').value;
      const pass = adminForm.querySelector('input[name="adminPass"]').value;
      const btn = adminForm.querySelector('button');

      // Identifiants de test : admin / admin
      if (user === 'admin' && pass === 'admin') {
        btn.textContent = 'Vérification...';
        localStorage.setItem('isAdminLoggedIn', 'true');
        setTimeout(() => window.location.href = 'admin.html', 1000);
      } else {
        errorMsg.style.display = 'block';
        adminForm.reset();
      }
    });
  }
});