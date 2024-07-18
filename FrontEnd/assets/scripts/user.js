function checkAuthentication() {
    const usertoken = localStorage.getItem('usertoken');
    const loginbutton = document.getElementById('login');
    const logoutbutton = document.getElementById('logout');
    const editModeBar = document.getElementById('editModeBar');
    const openModalBtn = document.getElementById('openModalBtn');
    const filterContainer = document.querySelector('.filters');
    // Si le token d'authentification existe, l'utilisateur est connecté
    if (usertoken) {
        // Cacher le bouton de connexion et afficher le bouton de déconnexion
        openModalBtn.style.display = 'block';
        editModeBar.style.display = 'flex';
        loginbutton.style.display = 'none';
        logoutbutton.style.display = 'block';
        filterContainer.classList.add('hidden');
        // Rendre le bouton de déconnexion cliquable
        logoutbutton.addEventListener('click', function() {
            // Supprimer le token d'authentification
            localStorage.removeItem('usertoken');
            window.location.reload();
        });
    } else {
        // Si le token d'authentification n'existe pas, l'utilisateur n'est pas connecté
        // Cacher le bouton de déconnexion et afficher le bouton de connexion
        openModalBtn.style.display = 'none';
        editModeBar.style.display = 'none';
        loginbutton.style.display = 'block';
        logoutbutton.style.display = 'none';
        filterContainer.classList.remove('hidden');
    }
}