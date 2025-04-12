import React, { useState } from 'react';
import "./connexion.css";

const Connexion = () => {
  const [login, setLogin] = useState('');
  const [mdp, setMdp] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('login', login);
    formData.append('mdp', mdp);

    fetch('https://iconicfridakahlo.fr/api/authorization.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          console.log(data.token)
          window.location.href = '/tableau';
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='connexion'>
      <h1>Connexion administrateur</h1>
      <label htmlFor="login">Login</label><br />
      <input type="text" name="login" id='login' value={login} onChange={(e) => setLogin(e.target.value)} /><br />
      <label htmlFor="mdp">Mot de passe</label><br />
      <input type="password" name="mdp" id='mdp' value={mdp} onChange={(e) => setMdp(e.target.value)} /><br />
      <button type="submit">Valider</button>
    </form>
  );
};

export default Connexion;
