import React, { createContext, useContext, useReducer, useEffect } from 'react';
const API = import.meta.env.VITE_APP_URI_API;

const initialState = {
  details: {
    img : '',
    disaster: '',
    description: '',
    location: '',
  },
  location: {
    lng: 0,
    lat: 0,
  },
  alert: null,
  profile: null,
  services: [],
  auth: {
    user: null,
    token: null,
  },
};

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };
    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };
    case 'UPDATE_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } };
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'LOGIN':
      return { ...state, auth: { user: action.payload.user, token: action.payload.token } };
    case 'LOGOUT':
      return { ...state, auth: { user: null, token: null } };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};  

//fetch geocoder services
const getServices = async (dispatch) => {
  try {
    const response = await fetch(`${API}/api/data/service`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      const servicesWithCoordinates = await geocodeServices(data.msg);
      dispatch({ type: 'SET_SERVICES', payload: servicesWithCoordinates });
    }
  } catch (error) {
    console.error(`Services fetch error: ${error}`);
  }
};

// Geocode Function
const geocodeServices = async (services) => {
  const geocodedServices = [];
  for (const service of services) {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          service.location
        )}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        geocodedServices.push({ ...service, coordinates: { lng, lat } });
      } else {
        console.error(`Geocoding failed for location: ${service.location}`);
      }
    } catch (error) {
      console.error(`Error geocoding location "${service.location}": ${error}`);
    }
  }
  return geocodedServices;
};


// Create context
const Context = createContext();

// Custom Hook
export const useValue = () => {
  return useContext(Context);
};

// Context Provider Component
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getServices(dispatch);
    // Load auth from localStorage
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);
      dispatch({ type: "LOGIN", payload: auth });
    }
  }, []);

  useEffect(() => {
    // Persist auth to localStorage
    if (state.auth.token) {
      localStorage.setItem("auth", JSON.stringify(state.auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [state.auth]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
