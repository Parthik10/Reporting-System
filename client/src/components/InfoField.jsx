import { Avatar, InputAdornment, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useValue } from '../context/ContextProvider';
import pendingIcon from './icons/progress1.svg';
import { Check } from '@mui/icons-material';

let timer;
const InfoField = ({ mainProps, optionalProps = {}, minLength, autofillTime, autofillLocation }) => {
  const { dispatch } = useValue();
  const [value, setValue] = useState(mainProps.value || '');
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Autofill current time
  useEffect(() => {
    if (autofillTime) {
      const time = new Date().toLocaleTimeString([], { hour12: false });
      setValue(time);
      dispatch({
        type: 'UPDATE_DETAILS',
        payload: { [mainProps.name]: time },
      });
    }
  }, [autofillTime, dispatch, mainProps.name]);

  // Autofill current location
  useEffect(() => {
    if (autofillLocation) {
      const getCurrentLocation = async () => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const response = await fetch(
                  `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
                );
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const placeName = data.features[0]?.place_name;
                if (placeName) {
                  setValue(placeName);
                  dispatch({
                    type: 'UPDATE_DETAILS',
                    payload: { [mainProps.name]: placeName },
                  });
                }
              } catch (error) {
                console.error('Error fetching location:', error);
              }
            },
            (error) => {
              console.error('Error getting geolocation:', error);
            }
          );
        }
      };

      getCurrentLocation();
    }
  }, [autofillLocation, dispatch, mainProps.name]);

  const handleChange = (e) => {
    const newValue =e.target.value;
    setValue(newValue);
    dispatch({
      type: 'UPDATE_DETAILS',
      payload: { [e.target.name]: newValue },
    });
    if (!editing) setEditing(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setEditing(false);
      if (e.target.value.length < minLength) {
        if (!error) setError(true);
        if (success) setSuccess(false);
      } else {
        if (error) setError(false);
        if (!success) setSuccess(true);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer); // Cleanup on unmount or before effect re-runs
    };
  }, []);

  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      value={value}
      error={error}
      helperText={error && `This field must be ${minLength} characters or more`}
      color={success ? 'success' : 'primary'}
      variant="outlined"
      onChange={handleChange}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {editing ? (
              <Avatar src={pendingIcon} sx={{ height: 100 }} />
            ) : (
              success && <Check color="success" />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InfoField;
