import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, Divider } from "@mui/material";


export default function RecipeReviewCard() {
  
  const [services, setServices] = useState([]); // State to hold the services data
  const isLocal = window.location.hostname === 'localhost';
  const API= isLocal
    ? import.meta.env.VITE_APP_URI_API 
    : import.meta.env.VITE_BACKEND_URL;

  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/data/service`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.msg); // Store the services data in state
      }
    } catch (error) {
      console.log(`Services frontend error: ${error}`);
    }
  };

  useEffect(() => {
    getServices(); // Fetch the services when the component mounts
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around', // Space between the cards
        gap: 2, // Gap between the cards
        marginTop: 2,
      }}
    >
      {services.map((service) => (
        <Card
          key={service._id} // Unique key for each card
          sx={{
            width: '30%', // Each card takes 30% of the container width on larger screens
            backgroundColor: "#31572c",
            color: "white",
            '@media (max-width: 600px)': { // For screens smaller than 600px (mobile view)
              width: '100%', // Card takes full width on mobile view
            },
          }}
        >
          <CardMedia
            component="img"
            height="195"
            image={`http://localhost:5000/uploads/${service.img}`}
            alt="Profile Image"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {service.disaster}
            </Typography>

            <Typography variant="body1">
              {service.reportTime}
            </Typography>

            <Typography variant="body2">
              {service.location}
            </Typography>

            <Divider sx={{ borderBottomWidth: 2, backgroundColor: 'white', my: 1 }} />

            <Typography variant="caption">
              {service.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
