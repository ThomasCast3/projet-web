
    // cherche toutes les users
    const users = document.querySelectorAll(".fa-user");

    // chercher l'input
    const influence = document.querySelector("#influence");



    // boucle sur les users pour le ajouter
    for (user of users) {
        user.style.color = "green";
        // écoute le survol
        user.addEventListener("mouseover", function () {
            resetStars();
            this.style.color = "green";
            this.classList.add("fa-solid");
            this.classList.remove("fa-regular");

            let previousUser = this.previousElementSibling;

            while (previousUser) {
                // passe l'user qui précède en vert
                previousUser.style.color = "green";
                previousUser.classList.add("fa-solid");
                previousUser.classList.remove("fa-regular");
                // récupère l'user qui le précède
                previousUser = previousUser.previousElementSibling;
            }
        });

        //  on regarde si il y a un click
        user.addEventListener("click", function () {
            influence.value = this.dataset.value;
        });

        user.addEventListener("mouseout", function () {
            resetStars(influence.value);
        });
    }

    /**
     * Reset des users en vérifiant la note dans l'input caché
     * @param {number} influence
     */

    function resetStars(influence = 0) {
        for (user of users) {
            if (user.dataset.value > influence) {
                user.style.color = "green";
                user.classList.add("fa-regular");
                user.classList.remove("fa-solid");
            } else {
                user.style.color = "green";
                user.classList.add("fa-solid");
                user.classList.remove("fa-regular");
            }
        }

    }



function yolo(influence = user.dataset.value) {



    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", 'http://10.57.29.14:8080/influence', false);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpRequest.send(`influence=${influence.value}`);
}