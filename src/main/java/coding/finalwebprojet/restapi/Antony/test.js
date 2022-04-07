


function valide() {
    var mail = document.getElementById("email").value;
    var mdtp = document.getElementById("Mdtp").value;

    if (!mail || !mdtp) return;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://10.57.29.14:8080/login', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(`email=${mail}&password=${mdtp}`);

    alert("Votre message a bien été envoyé");
}


let nIntervId;

function infini() {

    if (!nIntervId) {
        nIntervId = setInterval(bijour, 5000);
    }
}

function bijour() {


console.log("salut")

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://10.57.29.14:8080/train', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(`email=${mail}&password=${mdtp}`);


}
