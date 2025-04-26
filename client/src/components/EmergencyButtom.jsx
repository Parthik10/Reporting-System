import React, { useEffect, useState } from 'react';
import { useValue } from '../context/ContextProvider';  // Import the context hook

export default function EmergencyButton({ api }) {
  const { state } = useValue();  // Access the global state from context
  const [user, setUser] = useState(null);

  const API = import.meta.env.VITE_APP_URI_API;

  // Check if user is logged in
  useEffect(() => {
    
    if (state.auth && state.auth.user) {
      setUser(state.auth.user);  
    }
  }, [state.auth]);  

  const handleEmergencyClick = async () => {
 
    console.log('User:', user);


    if (!user || !user.username || !user.email) {
      // console.log('User info is missing:', user);
      alert('User information is missing!');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const finalURL = `${API}/api/emergency`;

          const response = await fetch(finalURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: user.username, // use `username` from user object
              email: user.email,
              latitude,
              longitude,
            }),
          });

          // Check if the response is empty or not
          const resultText = await response.text();  // Get the response as text first

          if (!resultText) {
            // If response is empty
            console.error('Empty response from the server');
            alert('Failed to report emergency.');
            return;
          }

          // Try to parse JSON if it's valid
          let result = {};
          try {
            result = JSON.parse(resultText);
          } catch (jsonError) {
            // If it's not valid JSON, log and handle gracefully
            console.error('Failed to parse JSON:', jsonError);
            console.error('Raw response:', resultText);
            alert('Failed to report emergency.');
            return;
          }

          if (response.ok) {
            alert('🚨 Emergency reported successfully!');
          } else {
            console.error('Error from server:', result.message || 'Unknown error');
            alert('Failed to report emergency.');
          }
        } catch (error) {
          console.error('Error reporting emergency:', error);
          alert('Failed to report emergency.');
        }
      }, (error) => {
        console.error('Error getting location:', error);
        alert('Could not access location.');
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Render a loading message if the user data is not yet available
  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <button 
      onClick={handleEmergencyClick}
      style={{
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        fontSize: '18px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        animation: 'blinker 1s linear infinite',
        margin: '20px',
      }}
    >
      🚨 EMERGENCY
    </button>
  );
}
