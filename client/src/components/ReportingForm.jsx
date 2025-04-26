import React, { useState } from "react";
import { Stack, DialogActions, Button, IconButton } from "@mui/material";
import InfoField from "./InfoField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Send, PhotoCamera } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useValue } from "../context/ContextProvider";
import imageCompression from "browser-image-compression";

const ReportingForm = () => {
  const { state } = useValue();
  const { details } = state;
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_APP_URI_API;


  //for time and date
  const getFormattedDateTime = () => {
    const now = new Date();
    const day = now.getDate(); // no need to pad
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  };
  


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
  
        let compressedFile = file;
        const maxSizeInKB = 100; 
        const options = {
          maxSizeMB: 0.1, 
          maxWidthOrHeight: 1000, 
          useWebWorker: true, 
        };
  
      
        do {
          compressedFile = await imageCompression(compressedFile, options);
         

          options.maxSizeMB *= 0.8; // Reduce max size by 20% on each iteration
          options.maxWidthOrHeight *= 0.9; // Reduce dimensions slightly
        } while (compressedFile.size / 1024 > maxSizeInKB);
  
        setImage(compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("disaster", details.disaster);
    formData.append("description", details.description);
    formData.append("location", details.location);
    formData.append("reportTime", getFormattedDateTime());
  
    if (image) {
      // Explicitly specify the filename for better clarity (optional)
      const imageFileName = image.name || "uploaded-image.png"; // Use the original name or fallback
      formData.append("image", image, imageFileName);
    }
  
  
    try {
      // Confirm API URL
      const finalURL = `${API}/api/reportform/report`;  // <<<<<< correct route
  
  
      const response = await fetch(finalURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          // ⚠️ DO NOT manually set 'Content-Type' for FormData — browser will handle it including boundary.
        },
        body: formData,
      });
  

  
      let responseData;
      try {
        responseData = await response.json();
       
      } catch (jsonError) {
        console.error("⚠️ Response not JSON:", jsonError);
      }
  
      if (!response.ok) {
        throw new Error(responseData?.message || "Failed to submit report");
      }
  
      toast.success("Report submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("❗ Error during submission:", error);
      toast.error(error.message || "Error submitting report");
    }
  };
  
  
  

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        sx={{
          alignItems: "center",
          "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 500, mb: 1, mt: 4 }}>
          <Typography variant="h5">Disaster Reporting Portal</Typography>
        </Box>

        <InfoField mainProps={{ name: "disaster", label: "Disaster Name", value: details.disaster }} minLength={3} />
        <InfoField mainProps={{ name: "location", label: "Location", value: details.location }} autofillLocation />
        <InfoField mainProps={{ name: "reportTime", label: "Report Time", value: details.reportTime }} autofillTime />
        <InfoField
          mainProps={{ name: "description", label: "Description", value: details.description }}
          optionalProps={{ multiline: true, rows: 4 }}
        />

        {/* Upload Image */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            border: 1,
            borderColor: "grey.500",
            p: 1,
          }}
        >
          <input
            accept="image/*"
            type="file"
            id="upload-image"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
              <Typography sx={{ ml: 1 }}>Choose Image</Typography>
            </IconButton>
          </label>
          {image && <Typography sx={{ ml: 2 }}>{image.name}</Typography>}
        </Box>

        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#31572c" }}
            endIcon={<Send />}
          >
            Submit
          </Button>
        </DialogActions>
      </Stack>
    </form>
  );
};

export default ReportingForm;
