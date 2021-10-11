import React, { useRef, useEffect, useState }  from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import './dexie.style.css';

const MapBox = () => {



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
