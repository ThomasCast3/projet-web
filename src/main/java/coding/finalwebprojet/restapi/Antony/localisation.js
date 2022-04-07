function maPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    if (lat == null || long == null ) {
        alert("Veuillez activer la géolocalisation");
        return false;
    } else {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", 'http://10.57.29.14:8080/geolocalisation', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(`latitude=${lat}&longitude=${long}`);


        const xhr1 = new XMLHttpRequest();
        xhr1.open("GET", "https://ressources.data.sncf.com/api/records/1.0/search/?dataset=liste-des-gares&q=&rows=20&refine.departemen=VAL-D%27OISE");
        xhr1.send();
        xhr1.onload = () => {
            const jsonGares = JSON.parse(xhr1.responseText);
            const nbGares = jsonGares["parameters"]["rows"];
            const gares = [];

            for (let i = 0; i < nbGares; i++) {
                const gareName = jsonGares["records"][i]["fields"]["commune"];
                const gareLatitude = jsonGares["records"][i]["fields"]["geo_point_2d"][0];
                const gareLongitude = jsonGares["records"][i]["fields"]["geo_point_2d"][1];
                gares[i] = {"gareName": gareName, "gareLatitude": gareLatitude, "gareLongitude": gareLongitude}
            }
            let minIndex;
            let minDistance = Number.MAX_SAFE_INTEGER;

            for (let i = 0; i < gares.length; i++) {
                const tmpDistance = distance(lat, long, gares[i]["gareLatitude"], gares[i]["gareLongitude"], "K");

                if (tmpDistance < minDistance) {
                    minDistance = tmpDistance;
                    minIndex = i;
                }
            }
            console.log(gares[minIndex]["gareName"]);
            console.log(gares[minIndex]["gareLatitude"]);
            console.log(gares[minIndex]["gareLongitude"]);
            console.log(minDistance);
            const xhr = new XMLHttpRequest();

            xhr.open("POST", 'http://10.57.29.14:8080/geolocalisation', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send('gareName=' + gares[minIndex]["gareName"]);

        }
    }
}

function getGeolocalisation() {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(maPosition);
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 === lat2) && (lon1 === lon2)) return null;

    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;

    return (unit === "K") ? dist * 1.609344 : dist * 0.8684;


}


