

const map = L.map('map').setView([48.856614, 2.3522219], 8);

//osm layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {});
osm.addTo(map);

function local() {


    if (!navigator.geolocation) {
        console.log("votre navigateur ne supporte pas notre systeme !")
    } else {

setInterval(function () {
            navigator.geolocation.getCurrentPosition(getPosition)
console.log("affiche");
    }
    , 6000);

    }
}

let marker, circle;
let test = true;


function getPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const accuracy = position.coords.accuracy;

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
       var garlat = gares[minIndex]["gareLatitude"];
        var garlong = gares[minIndex]["gareLongitude"];





            if (marker) {
                map.removeLayer(marker)
            }

            marker = L.marker([lat, long]);

          //  var featureGroup = L.featureGroup([marker, ]).addTo(map)

            //  map.fitBounds(featureGroup.getBounds())

            console.log("mes coordonnées: Lat: " + lat + " Long: " + long)

           // circle = L.circle([lat, long], {radius: accuracy})
           // L.featureGroup([circle]).addTo(map)

            var routing = L.Routing.control({
                waypoints: [
                    L.latLng(lat, long),
                    L.latLng(garlat, garlong)
                ],

                fitSelectedRoutes: true,
            }).addTo(map);

            //location.reload();

            //Traitement
        console.log("enleve")
            setTimeout(fonctionAExecuter, 6000); //On attend 5 secondes avant d'exécuter la fonction

            function fonctionAExecuter() {
                routing.spliceWaypoints(0, 10)
                //Le code écrit dans cette fonction ne sera exécuté qu'au bout de 5 secondes
            }

    /*    affichVille(value) {
            const datalist = document.getElementById(datalist);
            datalist.innerHTML="";
            fetch(
                https://geo.api.gouv.fr/communes?nom=${value}&fields=code,nom,centre
        ).then((response) =>
                response.json().then((data) => {
                    for (let ville of data) {
                        var optionBlock =document.createElement("option")
                        datalist.appendChild(optionBlock);
                        optionBlock.setAttribute("key",${ville.nom})
                        optionBlock.setAttribute("value",${ville.nom})
                    }
                })
            );
        }*/
    }

}