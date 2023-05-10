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
    photographerNameElement.textContent = photographer.name + `, ${photographer.city}, ${photographer.country}`;
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

    // Afficher les médias dans la div class "portfolio" dans le HTML
    media.forEach((m, index) => {
      const container = document.createElement('div');
      const mediaElement = m.image ? document.createElement('img') : document.createElement('video');

      mediaElement.src = `assets/images/${photographerId}/${m.image || m.video}`;
      mediaElement.alt = m.title;
      mediaElement.controls = true;
      function showLightbox(media) {
    
    // Créer la lightbox
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);
      
        const lightboxContent = media.image ? document.createElement('img') : document.createElement('video');
        lightboxContent.src = `assets/images/${photographerId}/${media.image || media.video}`;
        lightboxContent.alt = media.title;
        lightboxContent.controls = true;
      
        // Afficher la lightbox avec le contenu média
        lightbox.innerHTML = '';
        lightbox.appendChild(lightboxContent);
        lightbox.classList.add('active');
      
        // Mettre à jour la légende
        lightboxCaption.textContent = media.title;
      
        // Ajouter un événement pour fermer la lightbox lorsque l'utilisateur clique dessus
        lightbox.addEventListener('click', () => {
          lightbox.classList.remove('active');
        });
      }
         
      // Ajouter un événement de clic pour ouvrir la lightbox sur l'image actuelle
      mediaElement.addEventListener('click', () => {
        currentMediaIndex = index;
        showLightbox();
      });

      container.appendChild(mediaElement);
      portfolioElement.appendChild(container);
    });

    // Fermer la lightbox lorsque l'utilisateur clique dessus ou sur le bouton de fermeture
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.id === 'closeButton') {
        hideLightbox();
      }
    });

        // Met à jour la légende de la lightbox
        lightboxCaption.textContent = media[0].title;

        function updateCaption(media) {
            var caption = document.getElementById("caption");
            caption.innerHTML = media.alt;
          }
          
        // Met à jour l'affichage de la lightbox en fonction de l'index du media courant
        function updateLightbox(index) {
          lightboxContent.src = `assets/images/${photographerId}/${media[index].image || media[index].video}`;
          lightboxContent.alt = media[index].title;
          lightboxContent.controls = true;
          updateCaption(index);
        }
    
        // Affiche la lightbox avec le media correspondant lorsqu'on clique sur une image
        media.forEach((m, index) => {
          const container = document.createElement('div');
          const mediaElement = m.image ? document.createElement('img') : document.createElement('video');
    
          mediaElement.src = `assets/images/${photographerId}/${m.image || m.video}`;
          mediaElement.alt = m.title;
          mediaElement.controls = true;
        
        
          // Ajoute un événement de clic pour ouvrir la lightbox
          mediaElement.addEventListener('click', () => {
            const lightboxContent = m.image ? document.createElement('img') : document.createElement('video');
            lightboxContent.src = `assets/images/${photographerId}/${m.image || m.video}`;
            lightboxContent.alt = m.title;
            lightboxContent.controls = true;
          
            lightbox.innerHTML = '';
            lightbox.appendChild(lightboxContent);
            
            // Ajouter la classe active à la lightbox
            lightbox.classList.add('active');
          });
    
          container.appendChild(mediaElement);
          portfolioElement.appendChild(container);
        });
    
        // Ferme la lightbox lorsque l'utilisateur clique sur le bouton de fermeture ou en dehors de la lightbox
        lightbox.addEventListener('click', event => {
          if (event.target === lightbox || event.target.id === 'close-button') {
            lightbox.classList.remove('active');
          }
        });
    
        // Passe au media précédent lorsqu'on clique sur le bouton "précédent"
        prevButton.addEventListener('click', () => {
          currentMediaIndex = (currentMediaIndex + media.length - 1) % media.length;
          updateLightbox(currentMediaIndex);
        });
    
        // Passe au media suivant lorsqu'on clique sur le bouton "suivant"
        nextButton.addEventListener('click', () => {
          currentMediaIndex = (currentMediaIndex + 1) % media.length;
          updateLightbox(currentMediaIndex);
        });
    
        // Passe au media précédent ou suivant lorsqu'on appuie sur les touches gauche et droite du clavier
        document.addEventListener('keydown', event => {
          if (event.key === 'ArrowLeft') {
            currentMediaIndex = (currentMediaIndex + media.length - 1) % media.length;
            updateLightbox(currentMediaIndex);
          } else if (event.key === 'ArrowRight') {
            currentMediaIndex = (currentMediaIndex + 1) % media.length;
            updateLightbox(currentMediaIndex);
          }
        });
    })
    .catch(error => console.error(error));
    
