 // ------------------------------------------BOUTONS AJOUTER ENLEVER BILLETS
 ajoutAdulte = document.getElementById('addAdulte');
 substractAdulte = document.getElementById('substractAdulte');

 ajoutAdulte.addEventListener('click', function() {
        var inputElement = document.querySelector('.billet_adulte');
        var currentValue = parseInt(inputElement.value);
        inputElement.value = currentValue + 1;
        console.log(inputElement.value)
    });

    substractAdulte.addEventListener('click', function() {
        var inputElement = document.querySelector('.billet_adulte');
        var currentValue = parseInt(inputElement.value);
        if (currentValue > 0) {
            inputElement.value = currentValue - 1;
        }
    });

    ajoutEnfant = document.getElementById('addEnfant');
    substractEnfant = document.getElementById('substractEnfant');

    ajoutEnfant.addEventListener('click', function() {
      var inputElement = document.querySelector('.billet_enfant');
      var currentValue = parseInt(inputElement.value);
      inputElement.value = currentValue + 1;
      console.log(inputElement.value)
  });

  substractEnfant.addEventListener('click', function() {
      var inputElement = document.querySelector('.billet_enfant');
      var currentValue = parseInt(inputElement.value);
      if (currentValue > 0) {
          inputElement.value = currentValue - 1;
      }
  });

//----------VERIFIER SI LES CHAMPS SONT BIEN ENTRES AVANT DE FAIRE SUIVANT
var dateInput = document.getElementById('date_calendrier');
var heureInputs = document.querySelectorAll('input[name="heure"]');
var suivantButtonOne = document.querySelector('.suivant1');

// fonction qui vérifie si les input sont bien entrés
function checkInputs() {
    var dateFilled = dateInput.value.trim() !== '';
    var heureFilled = Array.from(heureInputs).some(input => input.checked);
    suivantButtonOne.disabled = !(dateFilled && heureFilled);
}

// verification
dateInput.addEventListener('input', checkInputs);
heureInputs.forEach(input => input.addEventListener('change', checkInputs));

// -----------------------------------------------------------------------PARTIE 2

var adulte = document.querySelector('.billet_adulte');
var enfant = document.querySelector('.billet_enfant');
var suivantButtonTwo = document.querySelector('.suivant2');

// fonction qui vérifie si les input sont bien entrés
function checkInputsTwo() {
    var adulteFilled = adulte.value.trim() !== '' && parseInt(adulte.value.trim()) >= 1;
    var enfantFilled = enfant.value.trim() !== '';
    var totalTickets = parseInt(adulte.value.trim()) + parseInt(enfant.value.trim()); //vérifier si il n'y a pas plus de 10 visiteurs au total
    suivantButtonTwo.disabled = !(adulteFilled && enfantFilled) || totalTickets > 10;
}

// verification
adulte.addEventListener('input', checkInputsTwo);
enfant.addEventListener('input', checkInputsTwo);
ajoutAdulte.addEventListener('click', checkInputsTwo);
substractAdulte.addEventListener('click', checkInputsTwo);
ajoutEnfant.addEventListener('click', checkInputsTwo);
substractEnfant.addEventListener('click', checkInputsTwo);

// -----------------------------------------------------------------------PARTIE 3

var prenom = document.getElementById('prenom');
var nom = document.getElementById('nom');
var mail = document.getElementById('mail');
var valider = document.getElementById('valider');

// fonction qui vérifie si les input sont bien entrés
function checkInputsThree() {
    var prenomFilled = prenom.value.trim() !== '';
    var nomFilled = nom.value.trim() !== '';
    var mailFilled = mail.value.trim() !== '';
    valider.disabled = !(prenomFilled && nomFilled && mailFilled);
}

// verification
prenom.addEventListener('input', checkInputsThree);
nom.addEventListener('input', checkInputsThree);
mail.addEventListener('input', checkInputsThree);


  //---------------------------------------------------------------------------- SLIDER AVC GSAP
    suivantButtonOne.addEventListener('click', function() {
        gsap.to("form", {
          x: "-100%",
          ease: "circ"
        });
        document.getElementById('etape2').classList.add('etape_active');        
      });

      suivantButtonTwo.addEventListener('click', function() {
        gsap.to("form", {
          x: "-200%",
          ease: "circ"
        });
        document.getElementById('etape3').classList.add('etape_active');
      });

      document.getElementById('etape1').addEventListener('click', function() {
        gsap.to("form", {
          x: "0%",
          ease: "circ"
        });
        document.getElementById('etape2').classList.remove('etape_active');
        document.getElementById('etape3').classList.remove('etape_active');
      });

      document.getElementById('etape2').addEventListener('click', function() {
        if (this.classList.contains('etape_active')) {
        gsap.to("form", {
          x: "-100%",
          ease: "circ"
        });
        document.getElementById('etape2').classList.add('etape_active');
        document.getElementById('etape3').classList.remove('etape_active');
        }
      });

//--------------------------------CALENDRIER
      // Pour la partie interactif du calendrier:

// Obtention de la date d'aujourd'hui
var today = new Date();

// Obtention du jour, du mois et de l'année
var day = today.getDate(); 
var month = today.getMonth() + 1; // Janvier est 0, donc +1
var year = today.getFullYear(); 

if (day < 10) {
    day = '0' + day; //ajout un zéro devant
}
if (month < 10) {
    month = '0' + month; //  ajoute un zéro devant
}

// Selection de la date minimale dans le champ
document.getElementById("date_calendrier").setAttribute("min", year + '-' + month + '-' + day);