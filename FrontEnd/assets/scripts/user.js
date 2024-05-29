function checkAuthentication() {
    const usertoken = localStorage.getItem('usertoken');
    const loginbutton = document.getElementById('login');
    const logoutbutton = document.getElementById('logout');
    // Si le token d'authentification existe, l'utilisateur est connecté
    if (usertoken) {
        // Cacher le bouton de connexion et afficher le bouton de déconnexion
        loginbutton.style.display = 'none';
        logoutbutton.style.display = 'block';
        // Rendre le bouton de déconnexion cliquable
        logoutbutton.addEventListener('click', function() {
            // Supprimer le token d'authentification
            localStorage.removeItem('usertoken');
            window.location.reload();
        });
    } else {
        // Si le token d'authentification n'existe pas, l'utilisateur n'est pas connecté
        // Cacher le bouton de déconnexion et afficher le bouton de connexion
        loginbutton.style.display = 'block';
        logoutbutton.style.display = 'none';
    }
}