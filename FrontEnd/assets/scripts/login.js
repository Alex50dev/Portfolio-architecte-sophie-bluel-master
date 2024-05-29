const form = document.querySelector('.loginform');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.querySelector('.message-error');

form.addEventListener('submit', function(event) { // submit qui permet de soumettre
    event.preventDefault(); // empêche d'envoyer la demande par défaut 
    
    // Récupérer les valeurs dans email et password
    const email = emailInput.value.trim(); //.trim qui permet d'éffacer les espaces
    const password = passwordInput.value;

    // Vérifier si les champs sont vides
    if (email === '' || password === '') {
        errorMessage.textContent = 'Veuillez remplir tous les champs.';
        return;
    }

    login(email, password);

    /*if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
        // Connexion réussie
        errorMessage.textContent = ''; // Effacer le message d'erreur s'il y en avait un
        alert('Connexion réussie !');
        // Rediriger vers la page d'accueil après une connexion réussie
        window.location.href = '../index.html';
    }
    else {
        // Connexion échouée
        errorMessage.textContent = 'E-mail ou mot de passe incorrect.';
    }*/
});

async function login(email, password) {
    const apiUrl = 'http://localhost:5678/api/users/login';

    const body = {
        email: email,
        password: password,
    };

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }

    await fetch(apiUrl, params)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.token);
            localStorage.setItem('usertoken', data.token);
            window.location.href = '../index.html';
        })
        .catch(error => { 
             // Connexion échouée
            errorMessage.textContent = 'E-mail ou mot de passe incorrect.';
        });
}

/*// Stockage des informations de session dans localStorage après une connexion réussie
localStorage.setItem('userToken', '');

// Récupération des informations de session depuis localStorage
const userToken = localStorage.getItem('userToken');

// Suppression des informations de session de localStorage après la déconnexion
localStorage.removeItem('userToken');*/


/*// Fonction pour déconnecter l'utilisateur
function logout() {
    // Supprimer les données de session (par exemple, un jeton d'authentification)
    localStorage.removeItem('usertoken'); // Supprimer le jeton d'authentification stocké dans localStorage
    
    window.location.href = ''; 
}*/