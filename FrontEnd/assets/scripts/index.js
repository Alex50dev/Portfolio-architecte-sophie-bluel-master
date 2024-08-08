let allWorks;
let allCategories;
const filterContainer = document.querySelector('.filters');
const galleryContainer = document.querySelector('.gallery');
function fetchWorks() {
    const apiUrl = 'http://localhost:5678/api/works';
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des travaux');
            }
            return response.json();
        })
        .then(response => {
            galleryContainer.innerHTML = '';
            allWorks = response;
            allWorks.forEach(work => {
                const figureElement = document.createElement('figure');
                figureElement.dataset.workId = work.id;
                figureElement.setAttribute('data-category', work.categoryId);
                const imgElement = document.createElement('img');
                imgElement.setAttribute('src', work.imageUrl);
                imgElement.setAttribute('alt', work.title);
                figureElement.appendChild(imgElement);
                const figcaptionElement = document.createElement('figcaption');
                figcaptionElement.textContent = work.title;
                figureElement.appendChild(figcaptionElement);
                galleryContainer.appendChild(figureElement);
            });
        })
        .catch(error => {
            console.error('Erreur de récupération des travaux:', error);
        });
}
// Fonction pour récupérer les filtres depuis l'API
function fetchFilters() {
    const apiUrl = 'http://localhost:5678/api/categories';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des filtres');
            }
            return response.json();
        })
        .then(response => {
            allCategories = response;

            const defaultFilter = document.getElementById("filtreTous");
            defaultFilter.classList.add('active');
            
            // Ajouter les filtres dynamiquement à partir de la réponse de l'API
            allCategories.forEach(filter => {
                const filterElement = document.createElement('div');
                filterElement.classList.add('filter');
                filterElement.textContent = filter.name;
                filterContainer.appendChild(filterElement);

                const defaultFilter = document.getElementById("filtreTous");
                defaultFilter.addEventListener('click', () => {
                    applyFilter(0);
                    updateFilterClasses(0);  
                });

                filterElement.addEventListener('click', () => {
                    applyFilter(filter.id);
                    updateFilterClasses(filter.id);
                });

            });
        })
        .catch(error => {
            console.error('Erreur de récupération des filtres:', error);
        });
}

// Fonction pour filtrer les photos en fonction du filtre sélectionné
function applyFilter(filterId) {
    // Récupérer toutes les images de la galerie
    const images = galleryContainer.children;

    // Afficher ou masquer les images en fonction du filtre sélectionné
    for (const image of images) {
        if (filterId === 0) {
            // Afficher toutes les images si le filtre sélectionné est "Tous" (id=0)
            image.style.display = 'block';

        } else {
            // Sinon, afficher uniquement les images correspondant au filtre sélectionné
            if (Number(image.dataset.category) === filterId) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        }
    }

}

// Fonction pour mettre à jour la classe active des filtres
function updateFilterClasses(selectedFilterId) {
    const allFilters = document.querySelectorAll('.filter');
    allFilters.forEach(filter => {
        if (filter.textContent === getFilterNameById(selectedFilterId)) {
            filter.classList.add('active'); // Ajouter la classe 'active' au filtre sélectionné
        } else {
            filter.classList.remove('active'); // Retirer la classe 'active' des autres filtres
        }
    });

    // Gestion de la classe 'active' pour le filtre "Tous"
    const defaultFilter = document.getElementById("filtreTous");
    if (selectedFilterId === 0) {
        defaultFilter.classList.add('active');
    } else {
        defaultFilter.classList.remove('active');
    }
}

// Fonction pour obtenir le nom du filtre en fonction de son ID
function getFilterNameById(filterId) {
    const filter = allCategories.find(cat => cat.id === filterId);
    return filter ? filter.name : '';
}


document.addEventListener('DOMContentLoaded', function () {


    checkAuthentication();
    // Appeler la fonction pour récupérer les filtres au chargement de la page
    fetchFilters();

    // Appeler la fonction pour récupérer les travaux au chargement de la page
    fetchWorks();

});