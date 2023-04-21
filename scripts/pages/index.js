
    async function getPhotographers(newPhotographer) {
        // 
         class photographers {
            constructor(name, id, city, country, tagline, price, portrait) {
                this._name = name
                this._id = id
                this._city = city
                this._country = country
                this._tagline = tagline
                this._price = price
                this._portrait = portrait
            }
        }
        // Méthode pour afficher les informations du photographe
        //console.log(`Name: ${this.name}, Age: ${this.age}, Photo URL: ${this.photoUrl}`);
    }
    
    // récupération du fichier json avec fetch
    async function getData(){
           
        // Récupération des données du fichier JSON local
        fetch('../../../data/photographers.json')
            
        .then(response => response.json())
        //affichage des données en {}
        .then(data => { 
            // et bien retourner le tableau photographers
            const newPhotographer = data.photographers
            photographers.forEach(photographer => photographer.push())
            displayData(photographers);
        })
        .catch(error => console.error(error));   
        //console.log(newPhotographer);
    }  
    
    // Affichage des informations de chaque p
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        //const { photographers } = await getPhotographers();
        //displayData(photographers);
        await getData();
        
    };
    
    init();
    
