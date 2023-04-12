    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
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
         
            fetch(../../../data/photographers.json)
                .then(function getPhotographers()) {
                // et bien retourner le tableau photographers seulement une fois récupéré
                return ({photographers:[]});    
                }.catch() {
                    return ();    
                }

            }
        }


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
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
