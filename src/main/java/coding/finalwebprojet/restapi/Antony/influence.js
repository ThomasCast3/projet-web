window.onload = () => {
    // cherche toutes les users
    const users = document.querySelectorAll(".la-user");

    // chercher l'input
    const influence = document.querySelector("#influence");

    // boucle sur les users pour le ajouter
    for(user of users){
        // écoute le survol
        user.addEventListener("mouseover", function(){
            resetStars();
            this.style.color = "green";
            this.classList.add("las");
            this.classList.remove("lar");

            let previousUser = this.previousElementSibling;

            while(previousUser){
                // passe l'user qui précède en vert
                previousUser.style.color = "green";
                previousUser.classList.add("las");
                previousUser.classList.remove("lar");
                // récupère l'user qui le précède
                previousUser = previousUser.previousElementSibling;
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
     * Reset des users en vérifiant la note dans l'input caché
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