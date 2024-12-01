import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  details: {
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
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};  const getServices = async () => {
  try {
    const response = await fetch(`${API}/api/data/service`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.msg);
      setServices(data.msg);
    }
  } catch (error) {
    console.log(`services frontend error: ${error}`);
  }
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

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
