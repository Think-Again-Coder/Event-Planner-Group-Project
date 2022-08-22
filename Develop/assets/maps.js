/*
==========================================
HEAD

index.html headers for maps:
    <!-- For general openmaps and ArcGIS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/css/ol.css" type="text/css" />
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/build/ol.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/ol-mapbox-style@6.1.4/dist/olms.js" type="text/javascript"></script>

    <!-- For searching addresses with openmaps -->
    <script src="https://unpkg.com/@esri/arcgis-rest-request@4.0.0/dist/bundled/request.umd.js"></script>
    <script src="https://unpkg.com/@esri/arcgis-rest-geocoding@4.0.0/dist/bundled/geocoding.umd.js"></script>

    <!-- For getting routes and directions with openmaps -->
    <script src="https://unpkg.com/@esri/arcgis-rest-request@4.0.0/dist/bundled/request.umd.js"></script>
    <script src="https://unpkg.com/@esri/arcgis-rest-routing@4.0.0/dist/bundled/routing.umd.js"></script>

    <script src="https://unpkg.com/ol-popup@4.0.0"></script>
    <link rel="stylesheet" href="https://unpkg.com/ol-popup@4.0.0/src/ol-popup.css" />
    <link rel="stylesheet" href="./assets/css/map.css">

==========================================
BODY

index.html body div for maps:

  <div id="map"></div> <!-- This will take up the whole screen you can put it in another div and control the outer divs size -->
  <div id="directions"></div>

index.html body script tag for maps :

  <script src="./Develop/assets/maps.js"></script>

==========================================
*/

const apiKey = "AAPK12422d1791b94a438e41c1657159c7f6mfWjO2hJolUDB-rypqwWguRR3bZDMQjqUeJUC8Y0Bz-P9kPxraFEzourT3pFHsyP";
let directions;
let mapElement;
let map;
let mapIframe = document.getElementById("mapIframe");
let mapTags;
mapIframe.addEventListener("load", function() {
    directions = mapIframe.contentWindow.document.getElementById("directions");
    mapElement = mapIframe.contentWindow.document.getElementById("map")
    map = new ol.Map({ target: mapElement });
    mapTags = mapIframe.contentWindow.document;
});

// const mapElement = document.getElementById("mapIframe").contentWindow.document.getElementById("map");


// Takes two arrays of coordinates (start[longitude, latitude], end[longitude, latitude])
function getDirections(startCoords, endCoords) {
    map.getOverlays().clear();
    map.setLayerGroup(new ol.layer.Group());

    let centerCoords = [(startCoords[0] + endCoords[0]) / 2, (startCoords[1] + endCoords[1]) / 2];

    const view = new ol.View({

        center: ol.proj.fromLonLat(centerCoords),

        zoom: 12
    });
    map.setView(view);

    let startLayer, endLayer, routeLayer;

    function addCircleLayers() {

        startLayer = new ol.layer.Vector({
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({ color: "white" }),
                    stroke: new ol.style.Stroke({ color: "black", width: 2 })
                })
            })
        });
        map.addLayer(startLayer);
        endLayer = new ol.layer.Vector({
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({ color: "black" }),
                    stroke: new ol.style.Stroke({ color: "white", width: 2 })
                })
            })
        });

        map.addLayer(endLayer);
    }

    const geojson = new ol.format.GeoJSON({
        defaultDataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857"
    });

    updateRoute(startCoords, endCoords);

    function addRouteLayer() {
        routeLayer = new ol.layer.Vector({
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({ color: "hsl(205, 100%, 50%)", width: 4, opacity: 0.6 })
            })
        });
        map.addLayer(routeLayer);
    }

    function updateRoute() {

        const authentication = arcgisRest.ApiKeyManager.fromKey(apiKey);

        arcgisRest
            .solveRoute({
                stops: [startCoords, endCoords],
                authentication
            })

        .then((response) => {

            routeLayer.setSource(
                new ol.source.Vector({
                    features: geojson.readFeatures(response.routes.geoJson)
                })
            );

            const directionsHTML = response.directions[0].features.map((f) => f.attributes.text).join("<br/>");
            let direactionsBox = document.getElementById("directions")
            direactionsBox.style.opacity = 100;
            direactionsBox.innerHTML = directionsHTML;
            direactionsBox.style.display = "block";
        })

        .catch((error) => {
            alert("There was a problem using the geocoder. See the console for details.");
            console.error(error);
        });

    }

    const basemapId = "ArcGIS:Navigation";
    const basemapURL = "https://basemaps-api.arcgis.com/arcgis/rest/services/styles/" + basemapId + "?type=style&token=" + apiKey;

    olms(map, basemapURL)
        .then(function(map) {

            addCircleLayers();
            addRouteLayer();
        });
}
// Takes a string as the address
function getLocation(address) {
    mapTags.getElementById("directions").style.opacity = 0;
    map.setLayerGroup(new ol.layer.Group());
    map.setView(
        new ol.View({
            center: ol.proj.fromLonLat([151.2093, -33.8688]),
            zoom: 15
        })
    );

    const basemapId = "ArcGIS:Navigation";
    const basemapURL = "https://basemaps-api.arcgis.com/arcgis/rest/services/styles/" + basemapId + "?type=style&token=" + apiKey;

    olms(map, basemapURL);

    const popup = new Popup();
    map.addOverlay(popup);

    const query = address;
    const authentication = arcgisRest.ApiKeyManager.fromKey(apiKey);
    const center = ol.proj.transform(map.getView().getCenter(), "EPSG:3857", "EPSG:4326");

    arcgisRest
        .geocode({
            singleLine: query,
            authentication,

            params: {
                outFields: "*",
                location: center.join(","),
                outSR: 3857
            }
        })

    .then((response) => {
        const result = response.candidates[0];
        if (!result === 0) {
            alert("That query didn't match any geocoding results.");
            return;
        }

        const coords = [result.location.x, result.location.y];

        popup.show(coords, result.attributes.LongLabel);
        map.getView().setCenter(coords);
    })

    .catch((error) => {
        alert("There was a problem using the geocoder. See the console for details.");
        console.error(error);
    });
}