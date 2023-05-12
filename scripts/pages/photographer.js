 // Récupération des éléments du DOM
const titleElement = document.querySelector('title');
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
    titleElement.textContent = photographer.name;
    photographerNameElement.textContent = `${photographer.name}, ${photographer.city}, ${photographer.country}`;
    profilePictureElement.src = `assets/images/Photographers ID Photos/${photographer.portrait}`;
    profilePictureElement.alt = photographer.alt;

    // Créer la lightbox
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    // Créer la légende de la lightbox
    const lightboxCaption = document.createElement('div');
    lightboxCaption.id = 'lightboxCaption';
    lightbox.appendChild(lightboxCaption);

    // Créer les boutons pour naviguer entre les médias
    const prevButton = document.createElement('button');
    prevButton.id = 'prevButton';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    const nextButton = document.createElement('button');
    nextButton.id = 'nextButton';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);

    let currentMediaIndex = 0;

    // Fonction pour afficher la lightbox avec le média actuel
    function showLightbox() {
    const currentMedia = media[currentMediaIndex];
    const lightboxContent = currentMedia.image ? document.createElement('img') : document.createElement('video');
    lightboxContent.src = `assets/images/${photographerId}/${currentMedia.image || currentMedia.video}`;
    lightboxContent.alt = currentMedia.title;
    lightboxContent.controls = true;
  
    // Créer le bouton de fermeture
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '&times;';

    // Créer les flèches de navigation
    const prevButton = document.createElement('div');
    prevButton.classList.add('lightbox-prev');
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';

    const nextButton = document.createElement('div');
    nextButton.classList.add('lightbox-next');
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    function showPreviousMedia() {
        currentMediaIndex = (currentMediaIndex - 1 + media.length) % media.length;
        updateLightbox(currentMediaIndex);
    }
      
    function showNextMedia() {
        currentMediaIndex = (currentMediaIndex + 1) % media.length;
        updateLightbox(currentMediaIndex);
    }
    
    // Ajouter les événements de clic pour naviguer entre les photos
    prevButton.addEventListener('click', showPreviousMedia);
    nextButton.addEventListener('click', showNextMedia);

    // Ajouter les événements de clic pour naviguer entre les photos
    prevButton.addEventListener('click', showPreviousMedia);
    nextButton.addEventListener('click', showNextMedia);

    // Afficher la lightbox avec le contenu média, la légende et les flèches de navigation
    lightbox.innerHTML = '';
    lightbox.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);
    lightbox.classList.add('active');
        
    // Fonction pour fermer la lightbox
    function hideLightbox() {
        lightbox.style.display = 'none';
    }
    // Ajouter l'événement onclick pour fermer la lightbox
    closeButton.onclick = hideLightbox;
    
    // Mettre à jour la légende
    lightboxCaption.textContent = currentMedia.title;
    
    // Supprimer la propriété display:none de la lightbox
    lightbox.style.display = 'block';
    }
  
    // Afficher les médias dans la div class "portfolio" dans le HTML
    media.forEach((m, index) => {
    const container = document.createElement('div');
    const mediaElement = m.image ? document.createElement('img') : document.createElement('video');
      
    mediaElement.src = `assets/images/${photographerId}/${m.image || m.video}`;
    mediaElement.alt = m.title;
    mediaElement.controls = true;
      
    // Créer un élément de légende pour le nom et les likes
    const caption = document.createElement('div');
    caption.classList.add('caption');
    caption.innerHTML = '<div>' + m.title + '</div>' + '<div>' + m.likes + ' likes</div>';

      
    // Ajouter un événement de clic pour ouvrir la lightbox
    mediaElement.addEventListener('click', () => {
      currentMediaIndex = index;
      showLightbox();
    });
      
    container.appendChild(mediaElement);
    container.appendChild(caption);
    portfolioElement.appendChild(container);
    });
      
    // Fermer la lightbox lorsque l'utilisateur clique dessus ou sur le bouton de fermeture
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.id === 'closeButton') {
        hideLightbox();
      }
    });

    // Passe au média précédent lorsqu'on clique sur le bouton "précédent"
    prevButton.addEventListener('click', () => {
      currentMediaIndex = (currentMediaIndex + media.length - 1) % media.length;
      showLightbox();
    });

    // Passe au média suivant lorsqu'on clique sur le bouton "suivant"
    nextButton.addEventListener('click', () => {
      currentMediaIndex = (currentMediaIndex + 1) % media.length;
      showLightbox();
    });

    // Passe au média précédent ou suivant lorsqu'on appuie sur les touches gauche et droite du clavier
    document.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        currentMediaIndex = (currentMediaIndex + media.length - 1) % media.length;
        showLightbox();
      } else if (event.key === 'ArrowRight') {
        currentMediaIndex = (currentMediaIndex + 1) % media.length;
        showLightbox();
      }
    });
  })
  .catch(error => console.error(error));

       
