window.onload = () => {
    // cherche toutes les étoiles
    const users = document.querySelectorAll(".la-user");

    // chercher l'input
    const influence = document.querySelector("#influence");

    // boucle sur les étoiles pour le ajouter
    for(user of users){
        // écoute le survol
        user.addEventListener("mouseover", function(){
            resetStars();
            this.style.color = "green";
            this.classList.add("las");
            this.classList.remove("lar");

            let previousStar = this.previousElementSibling;

            while(previousStar){
                // passe l'étoile qui précède en jaune
                previousStar.style.color = "green";
                previousStar.classList.add("las");
                previousStar.classList.remove("lar");
                // récupère l'étoile qui la précède
                previousStar = previousStar.previousElementSibling;
            }
        });

        //  on regarde si il y a un click
        user.addEventListener("click", function(){
            influence.value = this.dataset.value;
        });

        user.addEventListener("mouseout", function(){
            resetStars(influence.value);
        });
    }

    /**
     * Reset des étoiles en vérifiant la note dans l'input caché
     * @param {number} influence
     */
    function resetStars(influence = 0){
        for(user of users){
            if(user.dataset.value > influence){
                user.style.color = "black";
                user.classList.add("lar");
                user.classList.remove("las");
            }else{
                user.style.color = "green";
                user.classList.add("las");
                user.classList.remove("lar");
            }
        }
    }
}