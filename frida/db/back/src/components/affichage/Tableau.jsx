"use client";
import { useEffect, useState } from "react";
import "./tableau.css";
import Link from "next/link";
import { Delete } from "../supprimer/Delete";

const formatDateString = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}`;
};

const formatTimeString = (timeString) => {
    const [hour, minute] = timeString.split(":");
    return `${hour}:${minute}`;
};

export const Tableau = () => {
    const API = `https://iconicfridakahlo.fr/api/reservations.php`;
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const result = await fetch(API, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                if (result.ok) {
                    const data = await result.json();
                    data.forEach(reservation => {
                        reservation.date = formatDateString(reservation.date);
                        reservation.heure = formatTimeString(reservation.heure);
                    });
                    setReservations(data);
                } else {
                    setError('Vous devez vous connecter pour accéder aux données');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
                setError('Erreur lors de la récupération des données');
            }
        };
    
        fetchData();
    }, []); 

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <Link href="/">
                    <button>Se connecter</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th className="corner">ID</th>
                        <th>Nom prenom</th>
                        <th>E-mail</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Billet adulte</th>
                        <th>Billet enfant</th>
                        <th className="corner">Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <tr key={index}>
                            <td>{reservation.id}</td>
                            <td>{reservation.prenom} {reservation.nom}</td>
                            <td>{reservation.mail}</td>
                            <td>{reservation.date}</td>
                            <td>{reservation.heure}</td>
                            <td>{reservation.adulte}</td>
                            <td>{reservation.enfant}</td>
                            <td><Delete id={reservation.id}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
