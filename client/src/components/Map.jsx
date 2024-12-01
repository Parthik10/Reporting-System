import React, { useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import AddLocation from './AddLocation'; 

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map() {
  const [viewPort, setViewPort] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 4,
  });

  const [locations, setLocations] = useState([]);

  const handleMapClick = (event) => {
    // Ensure event.lngLat is an array
    if (event?.lngLat && Array.isArray(event.lngLat)) {
      const [longitude, latitude] = event.lngLat;
      setLocations([...locations, { longitude, latitude }]);
    } else {
      console.error("Invalid lngLat format:", event.lngLat);
    }
  };

  return (
    <div style={{marginTop:'1vh', width: '99vw', height: '70vh' }}>
      <ReactMapGl
        {...viewPort}
        mapboxAccessToken={TOKEN}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/parthik10/cm0h2vc9a003d01qog9cu5j26"
        onViewportChange={(newViewport) => setViewPort(newViewport)}
        onClick={handleMapClick} // Use the refactored click handler
      >
        {locations.map((location, index) => (
          <Marker key={index} longitude={location.longitude} latitude={location.latitude}>
            <div style={{ backgroundColor: 'red', height: '10px', width: '10px' }} />
          </Marker>
        ))}


        <AddLocation />
      </ReactMapGl>
    </div>
  );
}
