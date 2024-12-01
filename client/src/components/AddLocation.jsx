import { Box } from '@mui/material';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import { useValue } from '../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import Geocoder from './Geocoder';

const AddLocation = () => {
  const {
    state: {
      location: { lng=0, lat=0 },
    },
    dispatch,
  } = useValue();
  const mapRef = useRef();

  useEffect(() => {
    if (!lng && !lat) {
      fetch('https://ipapi.co/json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          dispatch({
            type: 'UPDATE_LOCATION',
            payload: { lng: data.longitude, lat: data.latitude },
          });
        });
    }
  }, []);
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
        <NavigationControl position="bottom-right" 
         style={{ backgroundColor: 'white', border: '1px solid black' }}/>

        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            dispatch({
              type: 'UPDATE_LOCATION',
              payload: { lng:e.coords.longitude, lat:e.coords.latitude },
            })
          }
        />
        <Geocoder />
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;