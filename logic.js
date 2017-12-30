// main map variable
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
  });
// API call to GeoJson
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// function to determine circle color
function chooseColor(magnitude){
    if (magnitude < 1.0){return "green"};
    if (magnitude >= 1.0 && magnitude < 2.5){ return "yellow"};
    if (magnitude >= 2.5 && magnitude < 4.5){ return "orange"};
    if (magnitude >= 4.5){ return "red"};
}

// fuction to create radius size for circles
function rad(radius){
    return (radius*2.5);
}

d3.json(link,function(data){

    L.geoJson(data, {
        style:function(features){
            return{
                radius: rad(features.properties.mag),
                fillColor: chooseColor(features.properties.mag),
                color: chooseColor(features.properties.mag),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            }
        },
        pointToLayer: function (features, latlng) {
            return L.circleMarker(latlng)
                    .bindPopup("<h3> Magnitude: " + features.properties.mag + "<h3><h3>Location: " + features.properties.place + "<h3>");
        }
    }).addTo(myMap);
})    
// satellite tile layer
// L.tileLayer(
//     "https://api.mapbox.com/styles/v1/harshilpatel753/cjbpv5utq6hev2sppjezfc8ws/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFyc2hpbHBhdGVsNzUzIiwiYSI6ImNqYWs5ejkwNjJobTMzM2xlemV4a3k2cWsifQ.wnbI078M_qEUjxt0u0VuDg"
// ).addTo(myMap);

L.tileLayer(
    "https://api.mapbox.com/styles/v1/harshilpatel753/cjbswxdka9dvd2rmla41otz4e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFyc2hpbHBhdGVsNzUzIiwiYSI6ImNqYWs5ejkwNjJobTMzM2xlemV4a3k2cWsifQ.wnbI078M_qEUjxt0u0VuDg"
).addTo(myMap);

