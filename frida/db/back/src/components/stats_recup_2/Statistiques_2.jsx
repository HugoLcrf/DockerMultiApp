"use client";
import React, { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import "./stat_2.css";

const formatDateString = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}`;
};

const formatTimeString = (timeString) => {
  const [hour, minute] = timeString.split(":");
  return `${hour}:${minute}`;
};

export const Statistiques_2 = () => {
  // api
    const API = 'https://iconicfridakahlo.fr/api/reservations.php';
  
    // stokage les données des statistiques, la date sélectionnée et les données du graphique
    const [statistiques, setStatistiques] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);
  
    // recupere les données des statistiques une fois que le composant est monté
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vous devez vous connecter pour accéder aux données');
        return;
      }
  
      fetch(API, {
        headers: {
          'Authorization': `${token}` // Utilisation du token dans l'en-tête de la requête
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then(data => {
          // Formater les données des statistiques
          const formattedData = data.map(reservation => ({
            ...reservation,
            date: formatDateString(reservation.date),
            heure: formatTimeString(reservation.heure)
          }));
          // Mettre à jour l'état des statistiques avec les données formatées
          setStatistiques(formattedData);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Une erreur s\'est produite lors du chargement des données');
        });
    }, []);
  
    // Effet pour mettre à jour les données du graphique lorsque les statistiques ou la date sélectionnée changent
    useEffect(() => {
      if (statistiques && selectedDate) {
        const chartData = prepareChartData(selectedDate);
        setChartData(chartData);
      } else {
        // Si aucune date n'est sélectionnée ou si les statistiques ne sont pas encore chargées,
        // initialiser le graphique avec des données vides
        setChartData({
          labels: [],
          datasets: [{
            label: 'Nombre de visiteurs',
            backgroundColor: '#FF9E58',
            borderColor: '#FF9E58',
            borderWidth: 1,
            borderRadius: 30,
            data: [],
          }],
        });
      }
    }, [statistiques, selectedDate]);
  
    // Gérer le changement de la date sélectionnée
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    // Fonction pour préparer les données du graphique en fonction de la date sélectionnée
    const prepareChartData = (date) => {
      if (!statistiques || !date) return null;
  
      const filteredData = statistiques.filter(reservation => reservation.date === date);
      const visitorCounts = new Array(9).fill(0);
  
      filteredData.forEach(reservation => {
        const hour = parseInt(reservation.heure.split(":")[0]);
        if (hour >= 10 && hour < 19) {
          visitorCounts[hour - 10]++;
        }
      });
  
      return {
        labels: Array.from({ length: 9 }, (_, i) => `${i + 10}:00`),
        datasets: [
          {
            label: 'Nombre de visiteurs',
            backgroundColor: '#FF9E58',
            borderColor: '#FF9E58',
            borderWidth: 1,
            borderRadius: 30,
            data: visitorCounts,
          },
        ],
      };
    };
  
    // Fonction pour rendre les boutons de date
    const renderDateButtons = () => {
      if (!statistiques) return null;
  
      const uniqueDates = [...new Set(statistiques.map(reservation => reservation.date))];
      return uniqueDates.map(date => (
        <button key={date} onClick={() => handleDateChange(date)}>{date}</button>
      ));
    };

    if (error) {
      return (
        <p></p>
      );
  }
  
    // Rendu du composant
    return (
      <div>
        {/* les boutons de date */}
        <div>
          {renderDateButtons()}
        </div>
        {/* Afficher le graphique */}
        <div className="chart-container">
          {chartData && (
            <Bar
              className='chart_2'
              data={chartData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                      position: 'top',
                      align: 'end',
                    },
                  title: {
                    display: true,
                    text: 'Horaires d’affluence',
                    font: {
                      family: "Road Rage",
                      size: "40rem",
                      weight: "400"
                    },
                    align: 'start',
                    color: "black",
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    );
  };
  