// let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson' 
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
let myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 3
  });

let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  basemap.addTo(myMap);


  // Get request to query url
  d3.json(url).then(function(data){
    console.log(data.features);

// let myMap = L.map("map", {
//     center: [45.52, -122.67],
//     zoom: 3
//   });

//   let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(myMap);

 createfeatures(data.features);
});
    function createfeatures(earthquakedata) {
        // define the function we want to use for each feature and
        // Do a pop up with the place and time of the earthquake
        function onEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
              "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
              "<hr> <p> Earthquake Magnitude: " + feature.properties.mag + "</p>")
          }
          L.geoJSON(earthquakedata, {
            onEachFeature: onEachFeature,
            // creata a GeoJSON layer with the features array on earthquakeData
            pointToLayer: function (feature, coordinates) {
                // create markers, size and colors
                var geoMarkers = {
                    radius: size(feature.properties.mag),
                    fillColor: colors(feature.properties.mag),
                    fillOpacity: 0.40,
                    color: "#000000",
                    stroke: true,
                    weight: 0.5
                }
                return L.circleMarker(coordinates, geoMarkers);
            },
        }).addTo(myMap);
    }
        
// basemap.addTo(map);

// Create a Legend for the Map 
var legend = L.control({
  position: 'bottomright'
});
legend.onAdd = function () {
  var div = L.DomUtil.create('div', 'info legend'),
  magnitude = [0, 1, 2, 3, 4, 5];
  for (var i = 0; i < magnitude.length; i++) {
    div.innerHTML += '<div><div class="keybox" style="background:' + colors(magnitude[i] + 1) + '"></div><div>' +
    magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '</div></div><br>' : '+');
  }
  return div;
};
  
// Determine sizes for each markers on the map
function size(magnitude) {
    return magnitude * 2;
  }
// Loop thru the features and create one marker for each place object
function colors(magnitude) {
    let color = "";
    if (magnitude <= 1) {
      return color = "#BED0F4";
    }
    else if (magnitude <= 2) {
      return color = "yellow";
    }
    else if (magnitude <= 3) {
      return color = "orange";
    }
    else if (magnitude <= 4) {
      return color = "#D7B7BC";
    }
    else if (magnitude <= 5) {
      return color = "pink";
    }
    else if (magnitude > 5) {
      return color = "green";
    }
    else {
      return color = "black";
    }
  }
// Add the info legend to the map.
  legend.addTo(myMap);
