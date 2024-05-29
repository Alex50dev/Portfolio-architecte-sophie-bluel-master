// Sélectionner les éléments
const modal = document.getElementById('myModal');
const btn = document.getElementById('openModalBtn');
const span = document.getElementsByClassName('close')[0];
const addPhotoSection = document.getElementById("addPhotoSection");
const addPhotoBtn = document.getElementById("addPhotoBtn");
const modalTitle = document.getElementById("modalTitle");

// Ouvrir la modale lorsque l'utilisateur clique sur le bouton
btn.onclick = function () {
    modal.style.display = 'block';
    displayProjects();
}

// Fermer la modale lorsque l'utilisateur clique sur le <span> (x)
span.onclick = function () {
    modal.style.display = 'none';
}

// Fermer la modale lorsque l'utilisateur clique en dehors de la modale
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

function displayProjects() {
    const projectsContainer = document.getElementById("projects");
    projectsContainer.innerHTML = ''; // Clear existing projects
    allWorks.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.dataset.id = project.id;

        const img = document.createElement('img');
        img.src = project.imageUrl;
        img.alt = project.title;
        projectDiv.appendChild(img);

        const trashIcon = document.createElement('img');
        trashIcon.src = './assets/icons/trash.png'; // Assurez-vous que le chemin de l'icône est correct
        trashIcon.alt = 'Supprimer';
        trashIcon.classList.add('trash-icon');
        trashIcon.addEventListener('click', () => deleteProject(project.id));
        projectDiv.appendChild(trashIcon);

        projectsContainer.appendChild(projectDiv);
    });
}

async function deleteProject(projectId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            // Remove project from DOM
            document.querySelector(`.project[data-id='${projectId}']`).remove();
        } else {
            console.error('Erreur lors de la suppression du projet:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error);
    }
}

// Show add photo section
addPhotoBtn.onclick = function () {
    modalTitle.textContent = 'Ajout Photo';
    projectsContainer.style.display = 'none';
    addPhotoSection.style.display = 'block';
};

// Handle file input
const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
const photoInput = document.getElementById('photoInput');

uploadPhotoBtn.onclick = function () {
    photoInput.click();
};

photoInput.onchange = function (event) {
    // Handle the file input change
    const file = event.target.files[0];
    if (file) {
        console.log('Selected file:', file);
    }
};
