// Add console.log to check to see if our code is working.
console.log("working");

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
};
// Then we add our 'graymap' tile layer to the map.
let map =L.map("mapid",{
    center:[30,30],
    zoom:2,
    layers:[dark]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
//let airportData = "https://raw.githubusercontent.com/xikang1/Mapping_Earthquakes/main/majorAirports.json";
// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/xikang1/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
      style:myStyle,
      onEachFeature:function(feature,layer){
          layer.bindPopup("<h3> Airline:"+feature.properties.airline+"</h3> <hr><h3> Destination:" + feature.properties.dst + "</h3>")
      }
  })
  .addTo(map);
});
// Grabbing our GeoJSON data using OnEachFeature.
// L.geoJson(sanFranAirport,{
//     onEachFeature:function(feature,layer){
//         console.log(layer);
//         layer.bindPopup("<h2> Airport Code:"+feature.properties.faa+"</h2><hr><h2> Aiport Name:" + feature.properties.name + "</h2>");
//     }
// }).addTo(map);