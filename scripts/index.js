
//Coordinates for Singapore
let singapore = [1.3558681517963378, 103.81259782407385];
//Centre point on first load
let map = L.map('singapore-map', {
    zoomSnap: 0.25, minZoom: 12.75, maxBounds: [[1.4724179719905892, 104.00802298417915], [1.2113590252812299, 103.61150331088808]]
}).setView([1.3558681517963378, 103.81259782407385], 12.75);

//One MapSG Default
let OneMapSG = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    minZoom: 11,
    maxZoom: 18,
    bounds: [[1.56073, 104.11475], [1.16, 103.502]],
    attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
});

// Open Street Map 
let OSM = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
            'pk.eyJ1IjoiZGFyeWx3b29uZyIsImEiOiJja3I5cDcwMWI0YjE1MnBxaG04ZjQ2MGE4In0.vQSEV1EzN_aerLwJlfmswA'
    }
)

//One MapSG Dark Mode
let darkModeMap = L.tileLayer('https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png', {
    minZoom: 11,
    maxZoom: 18,
    bounds: [[1.56073, 104.11475], [1.16, 103.502]],
    attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
}).addTo(map)

// Toggling for map styles or theme 
//onemap
document.getElementById("OneMapLightRadio-btn").addEventListener("click", function (e) {
    map.removeLayer(OneMapSG);
    map.addLayer(OneMapSG)
})

//Default Open Street Map
document.getElementById("OSMRadio-btn").addEventListener("click", function (e) {
    map.removeLayer(OSM);
    map.addLayer(OSM)
})

//darkmode
document.getElementById("darkmodeRadio-btn").addEventListener("click", function (e) {
    map.removeLayer(darkModeMap);
    map.addLayer(darkModeMap)
})



//Importing of data
window.addEventListener('DOMContentLoaded', async function () {

    //Gym Clubs
    //Layer group for Anytime Fitness Club
    let allClubs = L.layerGroup();

    let clubIcons = L.icon({
        iconUrl: "./images/clubpin.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -30]
    })
    //Clustering for for Anytime Fitness Club Locations
    let clubCluster = L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
    });
    clubCluster.addTo(map)

    //Loading geoJson data for gym clubs
    let response = await axios.get('data/CLUBS.geojson');
    let clubCoords = response.data.features;
    let clubs = L.geoJson(response.data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<h5>' + '<b>' + feature.properties.Club + '<b>' + '</h5>' + '<br>' + '<h6>' + '<b>Address: </b>' + '</h6>' +
                feature.properties.Address + '<br>' + '<br>' + '<h6>' + '<b>Contact: </b>' + '</h6>' + feature.properties.Contact + '<br>').addTo(clubCluster);
            layer.setIcon(clubIcons).addTo(clubCluster);
        }
    })



    //Bus Stops
    let busIcons = L.icon({
        iconUrl: "./images/buslogo.png",
        iconSize: [15, 20],
        iconAnchor: [10, 15],
        popupAnchor: [0, -30]
    })
    //Loading geoJson data for bus stop loc and info
    let response2 = await axios.get('data/BUS.geojson');
    let busLayer = L.geoJson(response2.data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<b>Bus Stop Name: </b>' + '<br>' + feature.properties.busStopName + '<br>' + '<br>' + '<b>Bus Stop Number: </b>' + '<br>' + feature.properties.stopID);
            layer.setIcon(busIcons);
        }
    })


    //WEATHER   
    //Weather Icons
    let partlyCloudyNight = L.icon({
        iconUrl: "./images/weatherIcons/cloudMoon.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [-3, -40],
    })

    let partlyCloudyDay = L.icon({
        iconUrl: "./images/weatherIcons/partlyCloudyDay.png",
        iconSize: [75, 75],
        iconAnchor: [30, 60],
        popupAnchor: [-3, -40],
    })

    let fairNight = L.icon({
        iconUrl: "./images/weatherIcons/moon.png",
        iconSize: [75, 75],
        iconAnchor: [30, 60],
        popupAnchor: [10, -40],
    })

    let fairDay = L.icon({
        iconUrl: "./images/weatherIcons/fairDay.png",
        iconSize: [75, 75],
        iconAnchor: [30, 60],
        popupAnchor: [10, -40],
    })

    let lightRain = L.icon({
        iconUrl: "./images/weatherIcons/lightRain.png",
        iconSize: [75, 75],
        iconAnchor: [30, 60],
        popupAnchor: [10, -40],
    })
    let moderateRain = L.icon({
        iconUrl: "./images/weatherIcons/moderateRain.png",
        iconSize: [75, 75],
        iconAnchor: [30, 60],
        popupAnchor: [10, -40],
    })
    let heavyThunderyShowers = L.icon({
        iconUrl: "./images/weatherIcons/heavyThunderyShowers.png",
        iconSize: [75, 75],
        iconAnchor: [30, 60],
        popupAnchor: [10, -40],
    })


    //Loading geoJson data for weather

    let weatherLayer = L.layerGroup()
    let response3 = await axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast');
    let weather = response3.data
    for (let w = 0; w < weather.area_metadata.length; w++) { //to loop through 47 pieces of information
        let weatherPoint = (weather.area_metadata[w]); //weatherPoint houses the name of the area and latlong 

        let weatherStatus = (weather.items[0].forecasts[w].forecast) //weatherStatus houses 47 instances of a weather status


        // To create markers that will display the location of the areas, name of areas and the weather
        if (weatherStatus === "Partly Cloudy (Night)") {
            L.marker([weatherPoint.label_location.latitude, weatherPoint.label_location.longitude], { icon: partlyCloudyNight }).bindPopup(weatherPoint.name + '<br>' + weatherStatus).addTo(weatherLayer)
        }
        else if (weatherStatus === "Partly Cloudy (Day)" || weatherStatus === "Cloudy") {
            L.marker([weatherPoint.label_location.latitude, weatherPoint.label_location.longitude], { icon: partlyCloudyDay }).bindPopup(weatherPoint.name + '<br>' + weatherStatus).addTo(weatherLayer)
        }
        else if (weatherStatus === "Fair (Night)") {
            L.marker([weatherPoint.label_location.latitude, weatherPoint.label_location.longitude], { icon: fairNight }).bindPopup(weatherPoint.name + '<br>' + weatherStatus).addTo(weatherLayer)
        }
        else if (weatherStatus === "Fair (Day)" || weatherStatus === "Fair" || weatherStatus === "Fair & Warm") {
            L.marker([weatherPoint.label_location.latitude, weatherPoint.label_location.longitude], { icon: fairDay }).bindPopup(weatherPoint.name + '<br>' + weatherStatus).addTo(weatherLayer)
        }
        else if (weatherStatus === "Light Showers" || weatherStatus === "Light Rain" || weatherStatus === "Light Showers") {
            L.marker([weatherPoint.label_location.latitude, weatherPoint.label_location.longitude], { icon: lightRain }).bindPopup(weatherPoint.name + '<br>' + weatherStatus).addTo(weatherLayer)
        }
        else if (weatherStatus === "Showers" || weatherStatus === "Moderate Rain" || weatherStatus === "Moderate Showers") {
            L.marker([weatherPoint.label_location.latitude, weatherPoint.label_location.longitude], { icon: moderateRain }).bindPopup(weatherPoint.name + '<br>' + weatherStatus).addTo(weatherLayer)
        }
        else if (weatherStatus === "Heavy Showers" || weatherStatus === "Heavy Rain" || weatherStatus === "Thundery Showers" || weatherStatus === "Heavy Thundery Showers") {
            L.marker([weatherPoint.label_location.latitude, weatherPoint.label_location.longitude], { icon: heavyThunderyShowers }).bindPopup(weatherPoint.name + '<br>' + weatherStatus).addTo(weatherLayer)
        }


        //end of weather function
    }



    //Toggle for Clubs
    document.getElementById("ShowClub-Checkbox").addEventListener("click", function (e) {
        if (this.checked) map.addLayer(clubCluster)
        else map.removeLayer(clubCluster)
    })
    //Toggle for Bus Stops
    document.getElementById("ShowBusStops-Checkbox").addEventListener("click", function (e) {
        if (this.checked) map.addLayer(busLayer)
        else map.removeLayer(busLayer)
    })

    //Toggle for Weather
    document.getElementById("ShowWeather-Checkbox").addEventListener("click", function (e) {
        if (this.checked) map.addLayer(weatherLayer)
        else map.removeLayer(weatherLayer)
    })






















    //end of async function
})


