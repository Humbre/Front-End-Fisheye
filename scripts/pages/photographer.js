// Fonction pour créer un élément HTML avec des attributs et des classes
function createElement(tag, attributes = {}, classes = []) {
  const element = document.createElement(tag);
  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  element.classList.add(...classes);
  return element;
}

// Classe représentant le modèle de médias
class MediaModel {
  constructor(photographerId, data) {
    this.photographerId = photographerId;
    this.media = data.media.filter(m => m.photographerId === photographerId);
    this.currentMediaIndex = 0;
    this.lightbox = createElement('div', { id: 'lightbox' }, ['lightbox']);
    document.body.appendChild(this.lightbox);
    this.lightboxContent = createElement('div', { id: 'lightboxContent' });
    this.lightboxCaption = createElement('div', { id: 'lightboxCaption' });
    this.prevButton = createElement('i', { id: 'prevButton' }, ['lightbox-prev']);
    this.prevButton.classList.add = ('fas', 'fa-chevron-left');
    this.nextButton = createElement('i', { id: 'nextButton' }, ['lightbox-next']);
    this.prevButton.classList.add = ('fas', 'fa-chevron-right');
    this.lightbox.appendChild(this.lightboxContent);
    this.lightboxContent.appendChild(this.lightboxCaption);
    this.lightboxContent.appendChild(this.prevButton);
    this.lightboxContent.appendChild(this.nextButton);
    this.closeButton = createElement('span', {}, ['close-btn']);
    this.closeButton.innerHTML = '&times;';
    this.lightbox.appendChild(this.closeButton);
    this.closeButton.addEventListener('click', this.hideLightbox.bind(this));
    this.prevButton.addEventListener('click', this.previousImage.bind(this));
    this.nextButton.addEventListener('click', this.nextImage.bind(this));

    document.addEventListener('keydown', this.handleKeyboardEvents.bind(this));
  }

  // Getter pour récupérer le média actuel
  get currentMedia() {
    return this.media[this.currentMediaIndex];
  }

  // Fonction pour afficher la lightbox avec le média actuel
  showLightbox() {
    const currentMedia = this.currentMedia;
    const lightboxContent = currentMedia.image ? createElement('img') : createElement('video');
    lightboxContent.src = `assets/images/${this.photographerId}/${currentMedia.image || currentMedia.video}`;
    lightboxContent.alt = currentMedia.title;
    lightboxContent.controls = true;
    this.lightboxCaption.innerHTML = '';
    this.lightboxCaption.appendChild(createElement('div', {}, [], currentMedia.title));
    this.lightboxCaption.appendChild(createElement('div', {}, ['heart-icon'], '&#x2764;'));
    this.lightboxContent.innerHTML = '';
    this.lightboxContent.appendChild(lightboxContent);
    this.lightbox.style.display = 'flex';
  }

  // Fonction pour passer à l'image précédente
  previousImage() {
    this.currentMediaIndex = (this.currentMediaIndex + this.media.length - 1) % this.media.length;
    this.showLightbox();
  }

  // Fonction pour passer à l'image suivante
  nextImage() {
    this.currentMediaIndex = (this.currentMediaIndex + 1) % this.media.length;
    this.showLightbox();
  }

  // Fonction pour fermer la lightbox
  hideLightbox() {
    this.lightbox.style.display = 'none';
  }

  // Gestion des événements du clavier
  handleKeyboardEvents(event) {
    switch (event.key) {
      case 'Escape': // Touche "Escape" pour fermer la lightbox
        this.hideLightbox();
        break;
      case 'ArrowLeft': // Touche "Flèche gauche" pour passer à l'image précédente
      this.previousImage();
      break;
  case 'ArrowRight': // Touche "Flèche droite" pour passer à l'image suivante
      this.nextImage();
      break;
      }
  }
}
// Récupération des paramètres de l'URL
const params = new URLSearchParams(window.location.search);
const photographerId = parseInt(params.get('id'));

// Fonction pour créer un élément "like" avec un comportement cliquable
function createLikeElement(media) {
  const likeElement = createElement('span', {
  'data-like-id': media.id,
  'data-like': media.likes,
  'data-liked': 'false'
  }, ['like']);
  

  return likeElement;
  }
  
  // Récupération des données du photographe via Fetch
  fetch('../../../data/photographers.json')
  .then(response => response.json())
  .then(data => {
  const photographer = data.photographers.find(p => p.id === photographerId);
  const mediaModel = new MediaModel(photographerId, data);
  const portfolioElement = document.querySelector('#portfolio');

// Mise à jour des informations du photographe
const titleElement = document.querySelector('title');
const photographerNameElement = document.getElementById('info');
const profilePictureElement = document.getElementById('imgPhotographer');
titleElement.textContent = photographer.name;
photographerNameElement.textContent = `${photographer.name}, ${photographer.city}, ${photographer.country}`;
profilePictureElement.src = `assets/images/Photographers ID Photos/${photographer.portrait}`;
profilePictureElement.alt = photographer.alt;

// Création du sélecteur de tri
const sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', function () {
const selectedIndex = parseInt(this.value);
// Effectuer le tri en fonction de l'option sélectionnée
if (selectedIndex === 0) {
  mediaModel.media.sort((a, b) => b.likes - a.likes);
} else if (selectedIndex === 1) {
  mediaModel.media.sort((a, b) => new Date(b.date) - new Date(a.date));
} else if (selectedIndex === 2) {
  mediaModel.media.sort((a, b) => a.title.localeCompare(b.title));
}
// Mettre à jour les médias dans la galerie
updateMediaGallery();
});


// Fonction pour mettre à jour les médias dans la galerie
function updateMediaGallery() {
portfolioElement.innerHTML = ''; // Vider la galerie actuelle
mediaModel.media.forEach((media, index) => {
  const container = createElement('div');
  const mediaElement = media.image ? createElement('img') : createElement('video');
  mediaElement.src = `assets/images/${photographerId}/${media.image || media.video}`;
  mediaElement.alt = media.title;
  mediaElement.controls = true;
  mediaElement.addEventListener('click', () => {
    mediaModel.currentMediaIndex = index;
    mediaModel.showLightbox();
  });

  const caption = createElement('div', {}, ['caption']);
  const title = createElement('div');
  title.textContent = media.title;
  const likes = createElement('div');
  const heartIcon = createElement('i', {}, ['heart-icon']);
  heartIcon.classList.add("fa-solid","fa-heart");//id pecifique avec nombre en légende

  heartIcon.addEventListener('click', function () {
    if (mediaElement.dataset.liked === 'false') {
      media.likes++;
      mediaElement.dataset.liked = 'true';
      heartIcon.classList.replace('fa-solid', 'fa-regular');
    } else {
      media.likes--;
      mediaElement.dataset.liked = 'false';
      heartIcon.classList.replace('fa-regular', 'fa-solid');
    }
  });
  
  

  let likeElement = createLikeElement(media);
  likes.appendChild(heartIcon);
  caption.appendChild(title); //sur le child
  caption.appendChild(likes);
  container.appendChild(mediaElement);
  container.appendChild(caption);
  container.appendChild(likeElement); 

  portfolioElement.appendChild
  (container);
      });
  }
  updateMediaGallery();
})
.catch(error => console.error(error));