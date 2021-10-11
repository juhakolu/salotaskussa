//Kartta komponentti, jolle syötetään karttatyyli

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import "./newmap.style.css";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapBox = ({ defaultStyle }) => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(23.147442);
  const [lat, setLat] = useState(60.388934);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: defaultStyle,
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      "top-left"
    );

    return () => map.remove();
  }, []);

  return (
    <>
      <div>
        <div className="map-container" ref={mapContainer}></div>
      </div>
    </>
  );
};

export default MapBox;
