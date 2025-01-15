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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        console.log("Original File Size:", file.size / 1024, "KB");
  
        let compressedFile = file;
        const maxSizeInKB = 100; // Maximum size in KB (100 KB)
        const options = {
          maxSizeMB: 0.1, // Initial max size in MB (100 KB)
          maxWidthOrHeight: 1000, // Adjust width/height if needed
          useWebWorker: true, // Use web worker for better performance
        };
  
        // Compress the image iteratively until it's less than 100 KB
        do {
          compressedFile = await imageCompression(compressedFile, options);
          console.log("Compressed File Size:", compressedFile.size / 1024, "KB");
  
          // Adjust the options dynamically for further compression if needed
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
  
    // Create a new FormData object
    const formData = new FormData();
    
    // Append form data fields to the FormData object
    formData.append("disaster", details.disaster);
    formData.append("description", details.description);
    formData.append("location", details.location);
    formData.append("reportTime", details.reportTime);
    
    // Append the image if it exists
    if (image) {
      // Explicitly specify the filename for better clarity (optional)
      const imageFileName = image.name || "uploaded-image.png"; // Use the original name or fallback
      formData.append("image", image, imageFileName);
    }
  
    try {
      const response = await fetch(`${API}/api/reportform/report`, {
        method: "POST",
        body: formData, // Use FormData directly as body
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error submitting report");
      }
  
      toast.success("Report submitted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error(error.message || "Failed to submit the report");
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
        <Box sx={{ width: "100%", maxWidth: 500, mb: 1 ,mt:4 }}>
          <Typography variant="h5">Disaster Reporting Portal</Typography>
        </Box>

        <InfoField
          mainProps={{
            name: "disaster",
            label: "Disaster Name",
            value: details.disaster,
          }}
          minLength={3}
        />
        <InfoField
          mainProps={{
            name: "location",
            label: "Location",
            value: details.location,
          }}
          autofillLocation
        />
        <InfoField
          mainProps={{
            name: "reportTime",
            label: "Report Time",
            value: details.reportTime,
          }}
          autofillTime
        />
        <InfoField
          mainProps={{
            name: "description",
            label: "Description",
            value: details.description,
          }}
          optionalProps={{ multiline: true, rows: 4 }}
        />

          {/* Add Image Upload Button */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 , border:1 , borderColor: "grey.500", ml:0, }}>
          <input
            accept="image/*"
            type="file"
            id="upload-image"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <IconButton
              color="grey"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera /> <Typography color="grey" > Choose Image </Typography>         
              </IconButton>
          </label>
          {image && (
            <Typography sx={{ ml: 2 }}>{image.name}</Typography>
          )}
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
