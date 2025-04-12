import "./delete.css";
export const Delete = ({ id }) => {
    const API = `https://iconicfridakahlo.fr/api/reservations.php` + '?id=' + id;
    
    const supprimerReservation = async (e) => { // async function declaration to use await
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            console.log('Token:', token);
            
            const result = await fetch(API, {
                method: 'DELETE', // Specify the DELETE method
                headers: {
                    'Authorization': `${token}` // Include token in the request headers with Bearer scheme
                }
            });
    
            if (!result.ok) { // Check if the request was successful
                throw new Error('Erreur lors de la requête.'); // Throw an error if the request was not successful
            }
    
            window.location.reload(); // Reload the page if the request was successful
        } catch (error) {
            console.error('Erreur lors de la requête:', error); // Log any errors that occur
        }
    }    

    return <button onClick={supprimerReservation} className="delete"><img src="Delete.svg" alt="supprimer" /></button>;
}

export default Delete;
