import { Box } from "@mui/material";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import { useEffect, useRef, useState } from "react";
import { useValue } from "../context/ContextProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "./Geocoder";
import { FaMapMarkerAlt } from "react-icons/fa";

const API = import.meta.env.VITE_APP_URI_API;

const AddLocation = () => {
  const {
    state: {
      location: { lng = 0, lat = 0 },
      services,
    },
    dispatch,
  } = useValue();

  const mapRef = useRef();
  const [emergencyLocations, setEmergencyLocations] = useState([]);
  const [blink, setBlink] = useState(true);

  // Fetch and set initial location using IPAPI if not already set
  useEffect(() => {
    if (!lng && !lat) {
      fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => {
          mapRef.current?.flyTo({
            center: [data.longitude, data.latitude],
            zoom: 8,
          });
          dispatch({
            type: "UPDATE_LOCATION",
            payload: { lng: data.longitude, lat: data.latitude },
          });
        })
        .catch((error) => console.error("Error fetching IP location:", error));
    }
  }, [lng, lat, dispatch]);

  // Fetch emergencies from backend
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

  // Blinking logic for emergency markers
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 100); // Blinks every half second
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: 700,
        position: "relative",
      }}
    >
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/parthik10/cm0h2vc9a003d01qog9cu5j26"
      >
        {/* Marker for the current user location */}
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
            })
          }
        />

        {/* Render markers for backend services */}
        {services.map((service, index) => (
          <Marker
            key={`service-${index}`}
            latitude={service.coordinates?.lat}
            longitude={service.coordinates?.lng}
          >
            <FaMapMarkerAlt
              color="red"
              size={30}
              style={{ transform: "translate(-50%, -100%)", cursor: "pointer" }}
              title={service.location || "Unknown Location"}
            />
          </Marker>
        ))}

        {/* Emergency Markers */}
        {emergencyLocations.map((emergency, index) => (
          <Marker
            key={`emergency-${index}`}
            latitude={emergency.latitude}
            longitude={emergency.longitude}
          >
            <div
              title={`Emergency reported by ${emergency.name || "Anonymous"}`}
              style={{
                transform: "translate(-50%, -100%)",
                cursor: "pointer",
              }}
            >
              <FaMapMarkerAlt color={blink ? "red" : "yellow"} size={30} />
            </div>
          </Marker>
        ))}

        {/* Map controls */}
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: e.coords.longitude, lat: e.coords.latitude },
            })
          }
        />
        <Geocoder />
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;
