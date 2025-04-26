import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import AddLocation from "./AddLocation"; // Make sure AddLocation works correctly

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const API = import.meta.env.VITE_APP_URI_API;

export default function Map() {
  const [viewPort, setViewPort] = useState({
    latitude: 30.3165, // Start map closer to your emergency location
    longitude:78.0322,
    zoom: 4, // Zoom level to fit markers better
  });




  // Handle clicking on the map
  const handleMapClick = (event) => {
    if (event?.lngLat && Array.isArray(event.lngLat)) {
      const [longitude, latitude] = event.lngLat;
      setLocations((prev) => [...prev, { longitude, latitude }]);
    } else {
      console.error("Invalid lngLat format:", event.lngLat);
    }
  };

  return (
    <div style={{ marginTop: "1vh", width: "99vw", height: "70vh" }}>
      <ReactMapGl
        {...viewPort}
        mapboxAccessToken={TOKEN}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/parthik10/cm0h2vc9a003d01qog9cu5j26"
        onMove={(evt) => setViewPort(evt.viewState)}
        onClick={handleMapClick}
      >
        <AddLocation />
      </ReactMapGl>
    </div>
  );
}
