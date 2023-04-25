
//const formData = document.getElementById("contact_modal"); 
//const btnSubmit = document.querySelector('.displayModal');
const openModal = document.getElementById('contact_modal'); //le formulaire
const btnsendData = document.querySelector('.sendData'); //bouton de modale pour envoyer les données

//fonction d'ouverture de la modale

function displayModal(){
    openModal.style.display = "block";
}

//fonction de fermeture de la modale

function closeModal(){
    openModal.style.display = "none";
}

//Envoyer les données
btnsendData.addEventListener("click", sendData);

function sendData(){
    alert('Merci, le photographe reviendra vers vous dans les plus brefs délais');
    closeModal();
   
//    if (formData.firstName === ''||formData.lastName === '' || formData.email === '' || formData.message === '') {
//        alert('Il y a eu une erreur, veuillez réessayer');
//    } else{
//        alert('Merci, le photographe reviendra vers vous dans les plus brefs délais');
//        form.reset();
//        closeModal();
//    }
}
