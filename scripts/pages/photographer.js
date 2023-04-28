// Affichage de la page photographers.html
//displayData(photographers);

// récupère les ID de tous les photographes
const photographerIds = photographers.map(photographer => photographer.id);

// enregistre l'ID du photographe sélectionné dans l'URL
const urlParams = new URLSearchParams(window.location.search);
urlParams.set('id', selectedPhotographerId);
window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);

// récupère les paramètres de l'URL dans une constante
const params = new URLSearchParams(window.location.search);
const photographerId = parseInt(params.get('id'));

// vérifie que l'ID du photographe est valide
if (!photographerIds.includes(photographerId)) {
  console.error('Invalid photographer ID');
}

// Affichage de toutes les photos de chaque photographe grace à l'ID qui est dans l'URL
function displayElement(photographerId) {
    const portfolio = document.querySelector('#portfolio');
    const photographer = photographers.find(p => p.id === photographerId);
    photographer.portfolio.forEach(picture => {
      const pictureElement = document.createElement('img');
      pictureElement.src = `assets/images/${photographerId}`;
      pictureElement.alt = '';
      portfolio.appendChild(pictureElement);
    });
  }

  displayElement();

  //Affichage photo actuelle
  const displayCurrentPicture = () => {
    const currentPicture = pictures[currentPictureIndex]; // récupère la photo courante
    picture.src = currentPicture; // affiche la photo courante
  };
  

  // Droite gauche avec le clavier
  displayCurrentPicture();
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'ArrowLeft') {
        currentPictureIndex = (currentPictureIndex - 1 + pictures.length) % pictures.length; // calcule l'index de la photo précédente
        displayCurrentPicture(); // affiche la photo précédente
    } else if (key === 'ArrowRight') {
        currentPictureIndex = (currentPictureIndex + 1) % pictures.length; // calcule l'index de la photo suivante
        displayCurrentPicture(); // affiche la photo suivante
    }
  });
  
  displayCurrentPicture();