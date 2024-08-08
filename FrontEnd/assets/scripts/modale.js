// Sélectionner les éléments
const modal = document.getElementById('myModal');
const btn = document.getElementById('openModalBtn');
const token = localStorage.getItem('usertoken');
const modalCloserBtns = document.getElementsByClassName('close');
const addPhotoSection = document.getElementById("addPhotoSection");
const backBtn = document.querySelector('#modal-content2 .back');
const modalContent1 = document.getElementById('modal-content1');
const modalContent2 = document.getElementById('modal-content2');
const addPhotoBtn = document.getElementById("addPhotoBtn");
const modalTitle = document.getElementById("modalTitle");
const addPhotoForm = document.getElementById("addPhotoForm");
const btnValider = document.getElementById("btnValider");
const categorySelect = document.getElementById('category');
const fileInput = document.getElementById('fileInput');
const titleInput = document.getElementById('title');
const previewImage = document.getElementById('preview');
const previewButton = document.getElementById('previewButton');
const previewText = document.getElementById('previewText');

function displayProjects() {
    const projectsContainer = document.getElementById("projects");
    projectsContainer.innerHTML = ''; // Effacer les projets existants
    allWorks.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.dataset.id = project.id;

        const img = document.createElement('img');
        img.src = project.imageUrl;
        img.alt = project.title;
        projectDiv.appendChild(img);

        const trashIcon = document.createElement('img');
        trashIcon.src = './assets/icons/trash.png';
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
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.ok) {
            // Supprimer le projet du DOM
            document.querySelector(`.project[data-id='${projectId}']`).remove();
            document.querySelector(`figure[data-work-id='${projectId}']`).remove();
        } else {
            console.error('Erreur lors de la suppression du projet:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error);
    }
};

function generateCategoriesSelect() {
    categorySelect.innerHTML = '<option value="">--Sélectionner une catégorie--</option>'
    allCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

function checkFormValidity() {
    if (fileInput.files.length > 0 && titleInput.value.trim() !== '' && categorySelect.value !== '') {
        btnValider.disabled = false;
        btnValider.classList.add('enabled');
    } else {
        btnValider.disabled = true;
        btnValider.classList.remove('enabled');
    }
}

// Ouvrir la modale lorsque l'utilisateur clique sur le bouton
btn.onclick = function () {
    modal.style.display = 'block';
    modalContent1.style.display = 'block';
    modalContent2.style.display = 'none';
    displayProjects();
}

// Fermer la modale lorsque l'utilisateur clique sur le <span> (x)
for (let modalCloserBtn of modalCloserBtns) {
    modalCloserBtn.onclick = function () {
        modal.style.display = 'none';
    }
}

// Changement de la modale vers ajout de photo
addPhotoBtn.onclick = function () {
    modalContent1.style.display = 'none';
    modalContent2.style.display = 'block';
    generateCategoriesSelect();
};

// Bouton précedent sur la modale
backBtn.onclick = function () {
    modalContent1.style.display = 'block';
    modalContent2.style.display = 'none';
};

fileInput.addEventListener('change', () => {
    checkFormValidity();
    const file = fileInput.files[0];
    
    if (file) {
        const validTypes = ['image/png', 'image/jpeg'];
        
        // Vérifier si le type du fichier est PNG ou JPG
        if (validTypes.includes(file.type)) {
            const srcDeLaPhoto = URL.createObjectURL(file);
            previewImage.src = srcDeLaPhoto;
            previewImage.classList.remove('hidden');
            previewButton.classList.add('hidden');
            previewText.classList.add('hidden');
        } else {
            // Si le type de fichier n'est pas valide, réinitialiser l'input file
            alert('Veuillez sélectionner un fichier au format PNG ou JPG.');
            fileInput.value = ''; // Réinitialise l'input file
            previewImage.src = ''; // Masque l'image précédente si elle existe
            previewImage.classList.add('hidden');
            previewButton.classList.remove('hidden');
            previewText.classList.remove('hidden');
        }
    } else {
        // Si aucun fichier n'est sélectionné, masquer l'image de prévisualisation
        previewImage.src = '';
        previewImage.classList.add('hidden');
        previewButton.classList.remove('hidden');
        previewText.classList.remove('hidden');
    }
});

titleInput.addEventListener('input', checkFormValidity);
categorySelect.addEventListener('change', checkFormValidity);


addPhotoForm.onsubmit = async function (event) {
    event.preventDefault();

    const formData = new FormData(addPhotoForm);
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.ok) {
            // reinitialise le formulaire
            addPhotoForm.reset();
            // Actualiser la liste des projets
            fetchWorks();
            modal.style.display = 'none';
            checkFormValidity();
            previewImage.src = '';
        } else {
            console.error('Erreur lors de l\'ajout de la photo:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la photo:', error);
    }
};
