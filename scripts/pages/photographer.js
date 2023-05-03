// Récupération des éléments du DOM
const titleElement = document.querySelector('title');
const photographerNameElement = document.getElementById('info');
const profilePictureElement = document.getElementById('imgPhotographer');
const portfolioElement = document.querySelector('#portfolio');

// Récupération des données du photographe via Fetch
fetch('../../../data/photographers.json')
  .then(response => response.json())
  .then(data => {
    // Récupération des données du photographe
    const photographer = data.photographers.find(p => p.id === photographerId);

    // Mise à jour du contenu du DOM
    titleElement.textContent = photographer.name;
    photographerNameElement.textContent = photographer.name + `, ${photographer.city}, ${photographer.country}`;
    profilePictureElement.src = `assets/images/photographers/${photographer.portrait}`;
    profilePictureElement.alt = photographer.alt;

    // Affichage des images du portfolio du photographe
    photographer.portfolio.forEach(picture => {
      const pictureElement = document.createElement('img');
      pictureElement.src = `assets/images/${photographerId}/${picture.image}`;
      pictureElement.alt = picture.alt;
      portfolioElement.appendChild(pictureElement);
    });
  })
  .catch(error => console.error(error));

//Affichage photo actuelle
let currentPictureIndex = 0;
const pictures = ["picture1.jpg", "picture2.jpg", "picture3.jpg"];


const displayCurrentPicture = () => {
  const currentPicture = pictures[currentPictureIndex]; // récupère la photo courante
  portfolioElement.src = currentPicture; // affiche la photo courante
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
