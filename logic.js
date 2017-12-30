// main map variable
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2.8
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

var circleOptions = {
    radius: 8,
    fillColor: function(features){
        return chooseColor(features.properties.mag)
    },
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

d3.json(link,function(data){
    //create GeoJson Layer of Earthquakes
    L.geoJson(data, {
        style:function(features){
            return{
                radius: rad(features.properties.mag),
                fillColor: chooseColor(features.properties.mag),
                color: chooseColor(features.properties.mag),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }
        },
        pointToLayer: function (features, latlng) {
            return L.circleMarker(latlng, circleOptions);
        }
    }).addTo(myMap);
})    
// satellite tile layer
L.tileLayer(
    "https://api.mapbox.com/styles/v1/harshilpatel753/cjbpv5utq6hev2sppjezfc8ws/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFyc2hpbHBhdGVsNzUzIiwiYSI6ImNqYWs5ejkwNjJobTMzM2xlemV4a3k2cWsifQ.wnbI078M_qEUjxt0u0VuDg"
).addTo(myMap);
