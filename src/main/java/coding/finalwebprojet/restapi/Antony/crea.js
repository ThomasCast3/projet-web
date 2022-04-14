const speed = document.getElementById("speed");
let tmpCoords = {latitude: 0, longitude: 0};
let id = localStorage.getItem("id");
let first_time = true;





function login()
{
    const email = document.getElementById("email_login").value;
    const password = document.getElementById("password_login").value;

    if (!email || !password){
        alert("Identifiants incorrects.");
        return;
    }

    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", `http://10.57.29.14:8080/login`, true);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpRequest.send(`email=${email}&password=${password}`);

    xmlHttpRequest.onload = () => {
        if (!JSON.parse(xmlHttpRequest.responseText)["id"]) {
            alert("Identifiants incorrects.");
            return;
        }
        localStorage.setItem("id", JSON.parse(xmlHttpRequest.responseText)["id"]);
        id = localStorage.getItem("id");

        alert("Vous êtes connecté.");
    }
}

function register()
{
    const email = document.getElementById("email_register").value;
    const password = document.getElementById("password_register").value;

    if (!email || !password) return;

    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", 'http://10.57.29.14:8080/register', true);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpRequest.send(`email=${email}&password=${password}`);
}

function getNearestStation()
{
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(geolocalisationStation);
    else (console.log("Geolocalisation non activée"));
}

function geolocalisationStation(position)
{
    if (!id) {
        alert("Veuillez vous connecter");
        return null;
    }
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    if (lat == null || long == null ) {
        alert("Veuillez activer la géolocalisation");
        return null;
    } else {
        let xmlHttpRequest = new XMLHttpRequest();

        xmlHttpRequest.open("GET", "https://ressources.data.sncf.com/api/records/1.0/search/?dataset=liste-des-gares&q=&rows=20&refine.departemen=VAL-D%27OISE");
        xmlHttpRequest.send();
        xmlHttpRequest.onload = () => {
            const jsonGares = JSON.parse(xmlHttpRequest.responseText);
            const gares = [];

            for (let i = 0; i < jsonGares["parameters"]["rows"]; i++) {
                const gareName = jsonGares["records"][i]["fields"]["commune"];
                const gareLatitude = jsonGares["records"][i]["fields"]["geo_point_2d"][0];
                const gareLongitude = jsonGares["records"][i]["fields"]["geo_point_2d"][1];
                gares[i] = {"gareName": gareName, "gareLatitude": gareLatitude, "gareLongitude": gareLongitude}
            }
            let minIndex;
            let minDistance = Number.MAX_SAFE_INTEGER;

            for (let i = 0; i < gares.length; i++) {
                const tmpDistance = getDistanceBetween(lat, long, gares[i]["gareLatitude"], gares[i]["gareLongitude"]);

                if (tmpDistance < minDistance) {
                    minDistance = tmpDistance;
                    minIndex = i;
                }
            }

            console.log(gares[minIndex]["gareName"]);
            console.log(gares[minIndex]["gareLatitude"]);
            console.log(gares[minIndex]["gareLongitude"]);
            console.log(minDistance);

            xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open("POST", 'http://10.57.29.14:8080/geolocalisation', true);
            xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xmlHttpRequest.send(`id=${id}&latitude=${lat}&longitude=${long}`);


        }
    }
}



function getDistanceBetween(latitude1, longitude1, latitude2, longitude2)
{
    const radianLatitude1 = Math.PI * latitude1 / 180;
    const radianLatitude2 = Math.PI * latitude2 / 180;
    let distance = Math.sin(radianLatitude1) * Math.sin(radianLatitude2) + Math.cos(radianLatitude1) * Math.cos(radianLatitude2) * Math.cos(Math.PI * (longitude1 - longitude2) / 180);

    return (distance > 1) ? 1 : Math.acos(distance) * 180 / Math.PI * 60 * 1.1515 * 1.609344;
}

function deconnection()
{
    if (id != null) {
        id = null;
        localStorage.removeItem("id");
        alert("Vous avez été déconnecté.");
    }
    else alert("Vous n'êtes pas connecté.");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//La Vitesse
/*
setInterval(function () {
    navigator.geolocation.getCurrentPosition(velocitySpeed);
}, 2000);


function velocitySpeed(position)
{



    if (first_time) {
        first_time = false;
        return;
    }

    console.log("vous allez à : " + (getDistanceBetween(tmpCoords["latitude"], tmpCoords["longitude"],
        position.coords.latitude, position.coords.longitude) / 1.6).toString() + " m/s")

    speed.innerHTML = "vous allez à : " + (getDistanceBetween(tmpCoords["latitude"], tmpCoords["longitude"],
    position.coords.latitude, position.coords.longitude) / 1.6).toString() + " m/s";

    tmpCoords["latitude"] = position.coords.latitude;
    tmpCoords["longitude"] = position.coords.longitude;

    console.log(tmpCoords["latitude"]);
    console.log(tmpCoords["longitude"]);
}*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Test carte

// affichage de la carte
const map = L.map('map').setView([48.856614, 2.3522219], 8);

//osm layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {});
osm.addTo(map);

function local() {

// si l'utilisateur n'active pas ou ne peut pas activer sa position alors il affiche un message d'erreur
    if (!navigator.geolocation) {
       alert("vous n'avez pas ou ne pouvez pas activé la géolocalisation");
    } else {
//on repete le fait de recupéré la geocalisation toutes les 5 secondes
setInterval(function () {
            navigator.geolocation.getCurrentPosition(getPosition)
console.log("affiche");
    }
    , 5000);

    }
}




// fonction qui recupère la position de l'utilisateur et affiche l'itinéraire de la gare la plus proche
function getPosition(position) {
    //on recupere la latitude et la longitude de l'utilisateur
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

// on demance a l'api de nous doné les informations des gares
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", "https://ressources.data.sncf.com/api/records/1.0/search/?dataset=liste-des-gares&q=&rows=20&refine.departemen=VAL-D%27OISE");
    xmlHttpRequest.send();
    xmlHttpRequest.onload = () => {
        const jsonGares = JSON.parse(xmlHttpRequest.responseText);
        const gares = [];

//on récupere la latitude et la longitude de chaque gare
        for (let i = 0; i < jsonGares["parameters"]["rows"]; i++) {
            const gareLatitude = jsonGares["records"][i]["fields"]["geo_point_2d"][0];
            const gareLongitude = jsonGares["records"][i]["fields"]["geo_point_2d"][1];
            gares[i] = {"gareLatitude": gareLatitude, "gareLongitude": gareLongitude}
        }

        //on compare la distance entre la gare la plus proche et l'utilisateur
            let minIndex;
            let minDistance = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < gares.length; i++) {
            const tmpDistance = getDistanceBetween(lat, long, gares[i]["gareLatitude"], gares[i]["gareLongitude"]);

            if (tmpDistance < minDistance) {
                minDistance = tmpDistance;
                minIndex = i;
            }
        }
            var garlat = gares[minIndex]["gareLatitude"];
            var garlong = gares[minIndex]["gareLongitude"];


          //  var featureGroup = L.featureGroup([marker, ]).addTo(map)

            //  map.fitBounds(featureGroup.getBounds())

            console.log("mes coordonnées: Lat: " + lat + " Long: " + long);

            //affichage de l'itinéraire en tre notre position et la gare la plus proche
            var routing = L.Routing.control({
                waypoints: [
                    L.latLng(lat, long),
                    L.latLng(garlat, garlong)
                ],

                fitSelectedRoutes: true,
            }).addTo(map);

            //delais d'attente avant de supprimer l'itinéraire
        console.log("enleve")
            setTimeout(fonctionAExecuter, 5000); //On attend 5 secondes avant d'exécuter la fonction

            function fonctionAExecuter() {
                routing.spliceWaypoints(0, 10)
            }


    }
}



