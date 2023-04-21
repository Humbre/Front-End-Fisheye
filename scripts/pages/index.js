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

async function getData() {
    try {
        // Récupération des données du fichier JSON local
        const response = await fetch('../../../data/photographers.json');
        const data = await response.json();
        // et bien retourner le tableau photographers
        displayData(data.photographers);
        console.log(data.photographers);
    } catch (error) {
        console.error(error);
    }
}

// Affichage des informations de chaque photographe
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
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
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    await getData();
}

init();
