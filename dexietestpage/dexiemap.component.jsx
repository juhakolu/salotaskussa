import React, { useRef, useEffect, useState }  from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import './dexie.style.css';
import markeri from '../../assets/pictures/markers/selfmark.png';
import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";

const MapBox = () => {

//Tehdään/avataan tietokanta
const db = new Dexie('Dexietest');
db.version(1).stores(
  { items: "++id,lng,lat" }
);
db.open().catch(function(){
alert("Open failed: ");
});

//Päivitetään geojson aina kun tietokanta päivittyy
useLiveQuery(() => refreshGeojson(), []);

//Lisätään tietokantaan
const addItemToDb = async (lngg, latt) => {
    await db.items.add({
      lng: Number(lngg),
      lat: Number(latt)
    });
  }

//Poistetaan tietokannasta
const removeItemFromDb = async (id) => {
    await db.items.delete(id);
}

//Tehdään geojson mapboxille
var geojson = {
"type":"FeatureCollection",
"features":[]
};

//Päivitetään geojson
const refreshGeojson = () => {
  geojson.features.length = 0;
  db.items.each(function(item){
      geojson.features.push({ "type": "Feature","geometry": {"type": "Point","coordinates": [item.lng, item.lat]}, "properties": {"id":item.id}});
  });
}

//Mapbox juttui
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const defaultStyle = 'mapbox://styles/juhakolu/ckm7rb3ah55zk17lhx5czyer4';
const mapContainer = useRef();
const [lng, setLng] = useState(23.147442);
const [lat, setLat] = useState(60.388934);
const [zoom, setZoom] = useState(12);

useEffect(() => {
	var map = new mapboxgl.Map({
      container: mapContainer.current,
      style: defaultStyle,
      center: [lng, lat],
      zoom: zoom
		});

map.on('load', function () {
  //Poistetaan markkeri, jota klikataan
  map.on('click', "jutut", function (e) {
    removeItemFromDb(e.features[0].properties.id);
  });

  //Lisätään uusi markkeri kun klikataan jonnekkin
      map.on('click', function (e) {
        if (map.getCanvas().style.cursor != 'pointer')
        addItemToDb(e.lngLat.lng, e.lngLat.lat);
  });

//Päivitetään mapboxin geojson sekunnin välein
function setGeojson()
{
    map.getSource('points').setData(geojson);
}
setInterval(setGeojson, 100);


map.on('mouseenter', "jutut", function () {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', "jutut", function () {
  map.getCanvas().style.cursor = '';
});

//Lisätään mapboxiin layeri markkereille
map.loadImage(
markeri,
function (error, image) {
if (error) return;
  map.addImage("img", image);

  map.addSource('points', {
    'type': 'geojson',
    'data': geojson
  });
  map.addLayer({
    'id': "jutut",
    'type': 'symbol',
    'source': "points",
    'layout': {
      'visibility': 'visible',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'symbol-z-order': "viewport-y",
      'icon-image': "img",
      'icon-size': 0.08,
      'icon-offset': [0, -320]
    }
  });
});
});

    	map.addControl(
      	new mapboxgl.GeolocateControl({

      	positionOptions: {
      	enableHighAccuracy: true
      	},
      	trackUserLocation: true
      	}), 'bottom-right')

	return () => map.remove();
}, []);


  return (
    <>
      <div>
        <div className="map-container" ref={mapContainer}></div>
      </div>
    </>
  );
}

export default MapBox;
