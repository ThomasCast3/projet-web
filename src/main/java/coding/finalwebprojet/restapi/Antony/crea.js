const speed = document.getElementById("speed");
let tmpCoords = {latitude: 0, longitude: 0};
let id;
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
    xmlHttpRequest.open("GET", `http://10.57.29.14:8080/login?email=${email}&password=${password}`, true);
    xmlHttpRequest.send();

    xmlHttpRequest.onload = () => {
        id = JSON.parse(xmlHttpRequest.responseText)["id"];

        if (id) alert("Vous êtes connecté.");
        else alert("Identifiants incorrects.");
    }
}

function register()
{
    const email = document.getElementById("email_register").value;
    const password = document.getElementById("password_register").value;

    if (!email || !password) return;

    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", 'http://10.57.29.14:8080/register', false);
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
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

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
        alert("Vous avez été déconnecté.");
    }
    else alert("Vous n'êtes pas connecté.");
}

setInterval(function () {
    navigator.geolocation.getCurrentPosition(velocitySpeed);
}, 1000);

function velocitySpeed(position)
{
    if (first_time) {
        first_time = true;
        return;
    }
    speed.innerHTML = "vous allez à : " + (getDistanceBetween(tmpCoords["latitude"], tmpCoords["longitude"],
    position.coords.latitude, position.coords.longitude) / 1.6).toString() + " m/s";

    tmpCoords["latitude"] = position.coords.latitude;
    tmpCoords["longitude"] = position.coords.longitude;
}
