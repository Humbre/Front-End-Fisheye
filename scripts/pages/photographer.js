// Récupération des éléments du DOM
const photographerNameElement = document.getElementById('info');
const profilePictureElement = document.getElementById('imgPhotographer');
const portfolioElement = document.querySelector('#portfolio');

// Récupère les paramètres de l'URL dans une constante
const params = new URLSearchParams(window.location.search);
const photographerId = parseInt(params.get('id'));

// Récupération des données du photographe via Fetch
fetch('../../../data/photographers.json')
  .then(response => response.json())
  .then(data => {
    // Récupération des données du photographe
    const photographer = data.photographers.find(p => p.id === photographerId);
    
    // Récupérer les médias du photographe depuis les données JSON
    const media = data.media.filter(m => m.photographerId === photographerId);


    // Mise à jour du contenu du DOM
    const h1 = document.createElement('h1');
    h1.textContent = photographer.name;
    const h2 = document.createElement('h2');
    h2.textContent = ` ${photographer.city}, ${photographer.country}`;
    const p = document.createElement('p');
    p.textContent = `${photographer.tagline}`;
    const photographerNameContainer = document.createElement('div');
    photographerNameContainer.appendChild(h1);
    photographerNameContainer.appendChild(h2);
    photographerNameContainer.appendChild(p);
    
    photographerNameElement.appendChild(photographerNameContainer);
    
    profilePictureElement.src = `assets/images/Photographers ID Photos/${photographer.portrait}`;
    profilePictureElement.alt = photographer.alt;
    const titlelikes = document.createElement('p');
    titlelikes.textContent = `${media.title}, ${media.likes}`;
    const legende = document.createElement('div');
    legende.appendChild(titlelikes);

    // Afficher les médias dans la div class "portfolio" dans le HTML
    media.forEach(m => {
        const container = document.createElement('div');
        const mediaElement = m.image ? document.createElement('img') : document.createElement('video');
  
        mediaElement.src = `assets/images/${photographerId}/${m.image || m.video}`;
        mediaElement.alt = m.title;
        mediaElement.controls = true;
  
        container.appendChild(mediaElement);
        portfolioElement.appendChild(container);
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
