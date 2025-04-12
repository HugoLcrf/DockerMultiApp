"use client";
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Link from "next/link";
import "./stat.css";


const formatDateString = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}`;
};


export const Statistiques = () => {
  const API = `https://iconicfridakahlo.fr/api/reservations.php`;
  const [statistiques, setStatistiques] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez vous connecter pour accéder aux données');
      return;
    }

    fetch(API, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête.');
        }
        return response.json();
      })
      .then(data => {
        const groupedAdultes = {};
        const groupedEnfants = {};
        data.forEach(reservation => {
          const date = formatDateString(reservation.date);
          const adulte = parseInt(reservation.adulte);
          const enfant = parseInt(reservation.enfant);

          if (!groupedAdultes[date]) {
            groupedAdultes[date] = 0;
          }
          if (!groupedEnfants[date]) {
            groupedEnfants[date] = 0;
          }
          groupedAdultes[date] += adulte;
          groupedEnfants[date] += enfant;
        });
        setStatistiques({ adultes: groupedAdultes, enfants: groupedEnfants });
      })
      .catch(error => {
        console.error('Erreur lors de la requête:', error);
        setError('Erreur lors de la requête');
      });
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

  if (!statistiques) {
    return <p>Chargement des statistiques...</p>;
  }

  // Préparez les données pour le graphique à barres

  // Objetc keys permet de renvoyer un tableau contenant les noms des propriétés propres à un objet
  // j'ai trouvé ça efficace pour ce cas

  const dates = Object.keys(statistiques.adultes);
  const adultes = Object.values(statistiques.adultes);
  const enfants = Object.values(statistiques.enfants);

  //faire la moyenne entre les adultes et les enfant s
  const moyennes = dates.map(date => {
    const totalAdultes = statistiques.adultes[date];
    const totalEnfants = statistiques.enfants[date];
    return (totalAdultes + totalEnfants) ;
  });

  return (
    <Bar 
    className='style_chart'
      data={{
        labels: dates,
        datasets: [
          {
            label: "Adultes",
            data: adultes,
            backgroundColor: '#FFDD83',
            borderColor: '#FFDD83',
            borderRadius: 30
          },
          {
            label: "Enfants",
            data: enfants,
            backgroundColor: '#FFE7AE',
            borderColor: '#FFE7AE',
            borderRadius: 30
          },
          {
            label: "Total",
            data: moyennes,
            backgroundColor: '#FF9E58',
            borderColor: '#FF9E58',
            borderRadius: 30
          }
        ]
      }}

      options={{
        indexAxis: 'x',
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
          },
          title: {
            display: true,
            text: 'Nombre de fréquentations par jour',
            font: {
              family: "Road Rage",
              size: "40rem",
              weight: "400"
            },
            align: 'start',
            color: 'black', 
            backgroundColor: 'red', 
            padding: 10, 
            width: '100%',
          },
        },
        
      }}
      
      
      
    />
    
  );
};
