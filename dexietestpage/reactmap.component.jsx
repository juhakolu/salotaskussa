import React, {useEffect, useState} from 'react';
import ReactMapGL, {Marker, Popup, Layer, Source, GeolocateControl, FlyToInterpolator} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import './dexie.style.css';

const MapBox = () => {
  const mapstyle = "mapbox://styles/juhakolu/ckm7rb3ah55zk17lhx5czyer4";
  const mapboxtoken = process.env.REACT_APP_MAPBOX_TOKEN;

  const [lng, setLng] = useState(23.154356399999944);
  const [lat, setLat] = useState(60.384657370165066);


  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 12,
    transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
    transitionDuration: 'auto'
  });


  return (
    <>
      <ReactMapGL
        {...viewport}
        mapStyle={mapstyle}
        doubleClickZoom={false}
        width='100vw'
        height='100vh'
        mapboxApiAccessToken={mapboxtoken}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
    </ReactMapGL>
    </>
  );
}

export default MapBox;
