document.addEventListener('DOMContentLoaded', () => {
    const API = 'http://iconicfridakahlo.fr/api/reservations.php';

    const reservationForm = document.getElementById('billeterie-formulaire');
    reservationForm.addEventListener('submit', handleSubmit);

    function formatDate(dateString) {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    }
    

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log(data)


        fetch(API, {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête.');
            }
            return response.text(); // Récupérer le corps complet de la réponse
        })
        .then(text => {
            // Afficher le contenu complet de la réponse dans la console
            console.log('Réponse du serveur:', text);
            const billeterieFormulaire = document.querySelector('.billeterie-formulaire');
            billeterieFormulaire.innerHTML = `
                <h1>Billetrie</h1>
                <h2>Votre réservation a été confirmée avec succès.</h2>
                <h3>Un e-mail de confirmation vous a été envoyé.</h3>
                <p><strong>Réservation au nom de:</strong> ${data.prenom} ${data.nom}</p>
                <p><strong>Pour le:</strong> ${formatDate(data.date)} à ${data.heure}</p>
                <p><strong>Nombre de billets:</strong></p>
                <p>Adultes: ${data.billet_adulte}</p>
                <p>Enfants: ${data.billet_enfant}</p>
                <p><strong>Adresse mail:</strong> ${data.mail}</p>
                <a href='index.html'><button class='bouton_basique retour'>Accueil</button></a>`;
        })
        .catch(error => {
            // Gestion des erreurs lors de l'envoi de la requête ou de la réception de la réponse
            console.error('Erreur lors de la requête:', error);
        });
    }
});
