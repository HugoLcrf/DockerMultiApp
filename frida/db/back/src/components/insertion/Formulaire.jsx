"use client";
import { useEffect, useState } from "react";

export const Formulaire = () => {
    const API = `https://iconicfridakahlo.fr/api/reservations.php`;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            date: e.target.date.value,
            heure: e.target.heure.value,
            billet_adulte: e.target.billet_adulte.value,
            billet_enfant: e.target.billet_enfant.value,
            nom: e.target.nom.value,
            prenom: e.target.prenom.value,
            mail: e.target.mail.value
        };
        console.log(data)

        fetch(API, {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) { 
                throw new Error('Erreur lors de la requête.');
            }
            return response.text(); // Récupérer le corps complet de la réponse
        }).then(text => {
            // Afficher le contenu complet de la réponse dans la console
            console.log('Réponse du serveur:', text);
        }).catch(error => {
            // Gestion des erreurs lors de l'envoi de la requête ou de la réception de la réponse
            console.error('Erreur lors de la requête:', error);
        });
        
    }

    return <form onSubmit={handleSubmit}>
        date
        <input type="date" name="date" />
        time
        <input type="time" name="heure"/>
        adulte
        <input type="number"  name="billet_adulte"/>
        enfant
        <input type="number" name="billet_enfant"/>
        nom
        <input type="text" name="nom"/>
        prenom
        <input type="text" name="prenom"/>
        email
        <input type="mail" name="mail"/>
        <input type="submit" />
    </form>

}
