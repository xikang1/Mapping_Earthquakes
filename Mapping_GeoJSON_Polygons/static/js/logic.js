// Add console.log to check to see if our code is working.
console.log("working");

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};
// Then we add our 'graymap' tile layer to the map.
let map =L.map("mapid",{
    center:[43.7,-79.3],
    zoom:11,
    layers:[satelliteStreets]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
//let airportData = "https://raw.githubusercontent.com/xikang1/Mapping_Earthquakes/main/majorAirports.json";
// Accessing the Toronto airline routes GeoJSON URL.
//let torontoData = "https://raw.githubusercontent.com/xikang1/Mapping_Earthquakes/main/torontoRoutes.json";
// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/xikang1/Mapping_Earthquakes/main/torontoNeighborhoods.json";
// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 1
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data){
    console.log(data);
    L.geoJSON(data,{
        style:myStyle,
        onEachFeature:function(feature,layers){
            layers.bindPopup("<h2>Neighborhood:"+feature.properties.AREA_NAME+"</h3>");
        }

    }).addTo(map);
})



// d3.json(torontoData).then(function(data) {
//     console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data,{
//       style:myStyle,
//       onEachFeature:function(feature,layer){
//           layer.bindPopup("<h3> Airline:"+feature.properties.airline+"</h3> <hr><h3> Destination:" + feature.properties.dst + "</h3>")
//       }
//   })
//   .addTo(map);
// });
