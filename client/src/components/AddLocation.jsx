import { Box } from '@mui/material';
import ReactMapGL, {
  Marker,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl';
import { useEffect, useRef} from 'react';
import { useValue } from '../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocoder from './Geocoder';
import { FaMapMarkerAlt } from 'react-icons/fa';

const AddLocation = () => {
  const {
    state: {
      location: { lng = 0, lat = 0 },
      services,
    },
    dispatch,
  } = useValue();

  const mapRef = useRef();

  // Fetch and set initial location using IPAPI if not already set
  useEffect(() => {
    if (!lng && !lat) {
      fetch('https://ipapi.co/json')
        .then((response) => response.json())
        .then((data) => {
          mapRef.current?.flyTo({
            center: [data.longitude, data.latitude],
            zoom: 8,
          });
          dispatch({
            type: 'UPDATE_LOCATION',
            payload: { lng: data.longitude, lat: data.latitude },
          });
        })
        .catch((error) => console.error('Error fetching IP location:', error));
    }
  }, [lng, lat, dispatch]);

  return (
    <Box
      sx={{
        height: 700,
        position: 'relative',
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
        {/* Marker for the current location */}
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) =>
            dispatch({
              type: 'UPDATE_LOCATION',
              payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
            })
          }
        />
        
        {/* Render markers for backend services */}
        {services.map((service, index) => (
          <Marker
            key={index}
            latitude={service.coordinates?.lat}
            longitude={service.coordinates?.lng}
          >
            <FaMapMarkerAlt
              color="red" // Green for the service markers
              size={30} // Slightly smaller than the current location marker
              style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
              title={service.location || 'Unknown Location'}
            />
          </Marker>
        ))}

        {/* Map controls */}
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            dispatch({
              type: 'UPDATE_LOCATION',
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
