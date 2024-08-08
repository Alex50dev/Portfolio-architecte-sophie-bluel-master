const form = document.querySelector('.loginform');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.querySelector('.message-error');

form.addEventListener('submit', function(event) { // submit qui permet de soumettre
    event.preventDefault(); // empêche l'action par default du formulaire 
    
    // Récupérer les valeurs dans email et password
    const email = emailInput.value.trim(); //.trim qui permet d'éffacer les espaces
    const password = passwordInput.value;

    // Vérifier si les champs sont vides
    if (email === '' || password === '') {
        errorMessage.textContent = 'Veuillez remplir tous les champs.';
        return;
    }

    login(email, password);

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
            if (response.ok) {
                return response.json();
            }
            else {
                throw 'E-mail ou mot de passe incorrect.'
            }
            
        })
        .then(data => {
            localStorage.setItem('usertoken', data.token);
            window.location.href = '../index.html';
        })
        .catch(error => { 
             // Connexion échouée
            errorMessage.textContent = error;
        });
}
