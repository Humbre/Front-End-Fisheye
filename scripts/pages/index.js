class Photographer {
    constructor(name, id, city, country, tagline, price, portrait) {
      this._name = name;
      this._id = id;
      this._city = city;
      this._country = country;
      this._tagline = tagline;
      this._price = price;
      this._portrait = portrait;
    }
  
    // Méthode pour afficher les informations du photographe
    displayInfo() {
      console.log(`Name: ${this._name}, City: ${this._city}, Country: ${this._country}, Tagline: ${this._tagline}, Price: ${this._price}, Portrait: ${this._portrait}`);
    }
  }
  

  function getData() {
    return fetch('../../../data/photographers.json')
      .then(response => response.json())
      .then(data => {
        // et bien retourner le tableau photographers
        return data.photographers;
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  // Affichage des informations de chaque photographe
  function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');
    photographers.forEach(photographer => {
      const photographerModel = new Photographer(
        photographer.name,
        photographer.id,
        photographer.city,
        photographer.country,
        photographer.tagline,
        photographer.price,
        photographer.portrait
      );
      photographerModel.displayInfo();
      const userCard = photographerFactory(photographer);
      const userCardDOM = userCard.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }
  
  function init() {
    getData().then(photographers => {
      displayData(photographers);
      console.log(photographers);
    });
  }
  
  init();
  