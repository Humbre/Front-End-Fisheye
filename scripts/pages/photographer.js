const info = document.getElementById('info');
const imgPhotographer = document.getElementById('imgPhotographer');
const photographerSection = document.querySelector('.photographer_section');
const portfolio = document.getElementById('portfolio');

function displayElement(dataPhotographer) {
  photographerSection.addEventListener('click', (event) => {
    const article = event.target.closest('article');
    if (article) {
      info.textContent = `${photographer.name}, ${photographer.city}, ${photographer.country}, ${photographer.tagline}, ${photographer.price}`;
      imgPhotographer.src = `assets/images/${photographer.portrait}`;
      portfolio.innerHTML = '';
      photographer.portfolio.forEach(picture => {
        const pictureElement = document.createElement('img');
        pictureElement.src = `assets/images/${picture}`;
        pictureElement.alt = '';
        portfolio.appendChild(pictureElement);
      });
    }
  });
}
