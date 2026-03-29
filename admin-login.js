document.addEventListener('DOMContentLoaded', function() {
  const adminForm = document.getElementById('adminLoginForm');
  const errorMsg = document.getElementById('loginError');

  if (adminForm) {
    adminForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const user = adminForm.querySelector('input[name="adminUser"]').value;
      const pass = adminForm.querySelector('input[name="adminPass"]').value;
      const btn = adminForm.querySelector('button');

      btn.textContent = 'Vérification...';
      btn.disabled = true;

      // Connexion avec Supabase Auth
      window.supabaseClient.auth.signInWithPassword({
        email: user,
        password: pass,
      }).then(async ({ data, error }) => {
        if (error) throw error;

        // Récupérer le rôle dans la table profiles
        const { data: profile } = await window.supabaseClient
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profile && (profile.role === 'admin' || profile.role === 'prof')) {
          sessionStorage.setItem('isAdminLoggedIn', 'true');
          sessionStorage.setItem('userRole', profile.role);
          window.location.href = 'admin.html';
        } else {
          alert("Accès refusé : vous n'avez pas les droits administratifs.");
          window.supabaseClient.auth.signOut();
          location.reload();
        }
      }).catch(err => {
        errorMsg.style.display = 'block';
        btn.textContent = 'Se connecter à l\'administration';
        btn.disabled = false;
      });
    });
  }
});