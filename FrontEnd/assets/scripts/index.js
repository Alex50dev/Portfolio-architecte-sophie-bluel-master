let allWorks;
document.addEventListener('DOMContentLoaded', function () {
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
                allWorks = response;
                allWorks.forEach(work => {
                    const figureElement = document.createElement('figure');
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
            .then(filters => {
                // Ajouter les filtres dynamiquement à partir de la réponse de l'API
                filters.forEach(filter => {
                    const filterElement = document.createElement('div');
                    filterElement.classList.add('filter');
                    filterElement.setAttribute('id', filter.id);
                    filterElement.textContent = filter.name;
                    filterContainer.appendChild(filterElement);

                    // Ajouter un événement de clic pour filtrer les photos
                    filterElement.addEventListener('click', () => {
                        applyFilter(filter.id);
                    });
                });
                document.getElementById("0").addEventListener('click', () => {
                    applyFilter(0);
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

    checkAuthentication();
    // Appeler la fonction pour récupérer les filtres au chargement de la page
    fetchFilters();

    // Appeler la fonction pour récupérer les travaux au chargement de la page
    fetchWorks();


});