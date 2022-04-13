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





  /*  var map = L.map('map').setView([48.856614, 2.3522219], 8);

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    });
    osm.addTo(map);
  L.control.locate({
        position : 'topright' ,
        drawCircle : false,
        showCompass : true,
        strings : {
            title : "Montre-moi où je suis !"

        }}).addTo(map);*/

var map = L.map('map').setView([48.856614, 2.3522219], 8);

//osm layer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {});
osm.addTo(map);

function local() {


    if (!navigator.geolocation) {
        console.log("votre navigateur ne supporte pas notre systeme !")
    } else {


            navigator.geolocation.getCurrentPosition(getPosition)

    }
}
var marker, circle;
let test = true;

function getPosition(position) {

    if (test) {
        console.log("test XDD");
        test = false;

    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy


    if(marker) {
        map.removeLayer(marker)
    }

    marker = L.marker([lat, long])


    //var featureGroup = L.featureGroup([marker, ]).addTo(map)

  //  map.fitBounds(featureGroup.getBounds())

    console.log("mes coordonnées: Lat: "+ lat +" Long: "+ long)

        circle = L.circle([lat, long], {radius: accuracy})
         L.featureGroup([ circle]).addTo(map)

         var routing = L.Routing.control({
            waypoints: [
                L.latLng(lat , long),
                L.latLng(48.856614, 2.3522219)
            ],
             fitSelectedRoutes: true,
        }).addTo(map);

    }
   // routing.spliceWaypoints(0, 100);



}




