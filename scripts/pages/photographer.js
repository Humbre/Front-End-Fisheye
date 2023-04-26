const info = document.getElementById('info');
const imgPhotographer = document.getElementById('imgPhotographer');
const photographerSection = document.querySelector('.photographer_section');
const portfolio = document.getElementById('portfolio');
 
function displayElement(dataPhotographer) {
    let selectedPhotographer = {}; // variable pour stocker le photographe sélectionné
  
    photographerSection.addEventListener('click', (event) => {
        const article = event.target.closest('article');
        if (article) {
            selectedPhotographer = dataPhotographer;
            info.textContent = `${selectedPhotographer.name}, ${selectedPhotographer.city}, ${selectedPhotographer.country}, ${selectedPhotographer.tagline}, ${selectedPhotographer.price}`;
            imgPhotographer.src = `assets/images/${selectedPhotographer.portrait}`;
            portfolio.innerHTML = '';
            selectedPhotographer.portfolio.forEach(picture => {
                const pictureElement = document.createElement('img');
                pictureElement.src = `assets/images/${picture}`;
                //pictureElement.alt = '';
                portfolio.appendChild(pictureElement);
            });
        } else {
            
        }
    });
    
    return selectedPhotographer; 
}