gsap.registerPlugin(ScrollTrigger);

// ------------------------------QUAND ON CHANGE LA TAILLE DE LA FENTRE LA PAGE SE RECHARGE POUR PAS QUE LES ANIMATIONS BEUG
window.addEventListener('resize', function() {
    window.location.reload();
  });

// -----------------------------------------------------------DESERT
if (window.innerWidth < 767) {
    gsap.fromTo(".frida_dance", 
      { x: 100 },
      { x: 0, duration: 1,
        scrollTrigger : {
          trigger: ".desert",
          toggleActions : "restart none restart none",
          scrub : 3,
          start: "-20% center",
          end: "60% center",
        }
      }
    );
  } else {
    gsap.fromTo(".frida_dance", 
      { x: -200 },
      { x: 0, duration: 1,
        scrollTrigger : {
          trigger: ".desert",
          toggleActions : "restart none restart none",
          scrub : 3,
          start: "-10% center",
          end: "60% center",
        }
      }
    );
  }
    // -----------------------------------------------------------COMMUNISME

    if (window.innerWidth < 767) {
        gsap.fromTo(".faucille", { rotation: 0, transformOrigin: "50% 100%", x: -80},
    { rotation: 29, 
    scrollTrigger : {
        trigger: ".faucille",
        toggleActions : "restart none restart none",
        scrub : 3,
        start: "-80% center",
        end: "50% center"
    },});
      } else {
        gsap.fromTo(".faucille", { rotation: 40, transformOrigin: "bottom center"},
    { rotation: -10, 
    scrollTrigger : {
        trigger: ".faucille",
        toggleActions : "restart none restart none",
        scrub : 3,
        start: "-40% center",
        end: "40% center"
    },});
    }

    // -----------------------------------------------------------HERITAGE
gsap.fromTo(".frida_skeleton_desk", { x: -200 },
{ x: 0, duration: 1,
scrollTrigger : {
    trigger: ".heritage",
    toggleActions : "restart none restart none",
    scrub : 3,
    start: "-50% 80%",
    end: "70% center"
},});

gsap.fromTo(".confettis", 
{ x: 150, rotation: 100}, 
{ x: 0,  rotation: 0,
  scrollTrigger : {
    trigger: ".heritage",
    toggleActions : "restart none restart none",
    scrub : 2,
    start: "-50% 80%",
    end: "20% center"
  }
}
);

gsap.fromTo(".frida_skeleton", 
{ x: 100,  rotation: 30 }, 
{ x: -10,  rotation: -10,
  scrollTrigger : {
    trigger: ".heritage",
    toggleActions : "restart none restart none",
    scrub : 3,
    start: "-50% 80%",
    end: "40% center"
  }
}
);

    // -----------------------------------------------------------FEMINISME
    gsap.fromTo(".coeur_desk", { x: 200, rotation: 10},
    { x: 0, duration: 1, rotation: 0,
    scrollTrigger : {
        trigger: ".coeur_desk",
        toggleActions : "restart none restart none",
        scrub : 3,
        start: "-100% 80%",
        end: "1% center"
    },});

    gsap.fromTo(".coeur", {x: -20, rotation: 10},
    {x:0, rotation: 0, 
    scrollTrigger : {
        trigger: ".feminisme",
        toggleActions : "restart none restart none",
        scrub : 3,
        start: "-70% center",
        end: "20% center",
    },});

    //--------------------------------------------------------- TRANSITIONS

    gsap.to(".transition_sable", {
        marginTop: "-40vh",
        ease: "none",
        scrollTrigger: {
          trigger: "header",
          start: "top bottom",
          end: "bottom center",
          scrub: 2,
        }, 
      });

    gsap.to(".transition_rouge", {
        marginTop: "-40vh",
        ease: "none",
        scrollTrigger: {
          trigger: ".desert",
          start: "top bottom",
          end: "bottom center",
          scrub: 2,
        }, 
      });

      gsap.to(".transition_vert", {
        marginTop: "-40vh",
        ease: "none",
        scrollTrigger: {
          trigger: ".communisme",
          start: "top bottom",
          end: "bottom center",
          scrub: 2,
        }, 
      });

      gsap.to(".transition_vert_fonce", {
        marginTop: "-45vh",
        ease: "none",
        scrollTrigger: {
          trigger: ".heritage",
          start: "top bottom",
          end: "bottom center",
          scrub: 2,
        }, 
      });

      gsap.to(".transition_orange", {
        marginTop: "-55vh",
        ease: "none",
        scrollTrigger: {
          trigger: ".feminisme",
          start: "top bottom",
          end: "bottom center",
          scrub: 2,
        }, 
      });

      if (window.innerWidth < 767) {
        gsap.to(".transition_footer", {
            marginTop: "-100vh",
            ease: "none",
            scrollTrigger: {
              trigger: ".virtuelle",
              start: "top bottom",
              end: "bottom center",
              scrub: 2,
            }, 
          });
      } else {
        gsap.to(".transition_footer", {
            marginTop: "-50vh",
            ease: "none",
            scrollTrigger: {
              trigger: ".virtuelle",
              start: "top bottom",
              end: "bottom center",
              scrub: 2,
            }, 
          });
    }

    // ------------------------------------------------------------TEXTES

    document.querySelectorAll("h1:not(.footer h1, .virtuelle h1), h2:not(.footer h2, virtuelle h1), p:not(.footer p), .bouton:not(.virtuelle .bouton)").forEach((element) => {
      let delayValue = 0; // Delais par defaut
      if (element.tagName === 'P') {
        delayValue = 0.3; // Delais pour p
      } else if (element.tagName === 'H2') {
        delayValue = 0.5; // Délai pour les h2
      }else if (element.classList.contains('bouton')) {
        delayValue = 0.7; // Delais pour bouton
      }
      gsap.fromTo(
        element,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: delayValue, 
          scrollTrigger: {
            toggleActions: "restart reverse restart reverse",
            trigger: element.closest('section'), // Set trigger to the closest parent section
            start: `-15.5% center`,
            // markers: true 
          }
        }
      );
      // if (window.innerWidth < 767) {
      //   startPercentage -= 0.6;
      //   console.log(startPercentage)
      // } else {
      //   startPercentage -= 0.4;
      // }
    });