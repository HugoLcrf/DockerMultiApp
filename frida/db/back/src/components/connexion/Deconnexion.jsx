"use client";
import React from 'react';

const Deconnexion = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default Deconnexion;
