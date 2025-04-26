import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import AddLocation from "./AddLocation"; // Make sure AddLocation works correctly

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const API = import.meta.env.VITE_APP_URI_API;

export default function Map() {
  const [viewPort, setViewPort] = useState({
    latitude: 30.2731798221902, // Start map closer to your emergency location
    longitude: 77.9996613565802,
    zoom: 8, // Zoom level to fit markers better
  });
  

  const [locations, setLocations] = useState([]); // Manual locations
  const [emergencyLocations, setEmergencyLocations] = useState([]); // Fetched from backend
  const [blink, setBlink] = useState(true); // For blinking effect

  // Fetch emergencies
  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await fetch(`${API}/api/emergency`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setEmergencyLocations(data);
      } catch (error) {
        console.error("Error fetching emergencies:", error);
      }
    };

    fetchEmergencies();
  }, []);

  // Blinking logic
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
        {/* Manual markers */}
        {locations.map((location, index) => (
          <Marker
            key={`manual-${index}`}
            longitude={location.longitude}
            latitude={location.latitude}
            anchor="bottom"
          >
            <div style={{ fontSize: "24px", color: "red" }}>📍</div>
          </Marker>
        ))}

        {/* Emergency markers from backend */}
        {emergencyLocations.map((emergency, index) => {
          return (
            <Marker
              key={`emergency-${index}`}
              longitude={emergency.longitude}
              latitude={emergency.latitude}
              anchor="bottom"
            >
              <div
                style={{
                  fontSize: "24px",
                  color: "green", 
                  // transition: "color 0.3s ease",
                }}
                title={`Emergency reported by ${emergency.name}`}
              >
                📍
               </div>
            </Marker>
          );
        })}

        <AddLocation />
      </ReactMapGl>
    </div>
  );
}
