import React from "react";
import { Stack, DialogActions, Button } from "@mui/material";
import InfoField from "./InfoField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Send } from '@mui/icons-material';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useValue } from "../context/ContextProvider";

const ReportingForm = () => {
  const { state, dispatch } = useValue();
  const { details } = state;
  const navigate = useNavigate();

  const API = import.meta.env.VITE_APP_URI_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting reportDetails:", details); // Using details from context

    try {
      const response = await fetch(`${API}/api/reportform/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      const res_data = await response.json();
      
      if (response.ok) {
        toast.success("Report submitted successfully");
        navigate("/");
      } else {
        toast.error(res_data.errors ? res_data.errors[0].msg : res_data.message);
      }
    } catch (error) {
      console.error("Reporting form submit error:", error); 
      toast.error("An error occurred while submitting the report");
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
        <Box sx={{ width: "100%", maxWidth: 500, marginBottom: 1 }}>
          <Typography variant="h5" gutterBottom>
            Disaster Reporting Portal
          </Typography>
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
          autofillLocation={true}
          minLength={5}
        />

        <InfoField
          mainProps={{
            name: "reportTime",
            label: "Report Time",
            value: details.reportTime,
          }}
          autofillTime={true}
          minLength={6}
        />

        <InfoField
          mainProps={{
            name: "description",
            label: "Description",
            value: details.description,
          }}
          minLength={0}
          optionalProps={{ multiline: true, rows: 4 }}
        />

        <DialogActions sx={{ px: "19px" }}>
          <Button
            sx={{ backgroundColor: "#31572c" }}
            type="submit"
            variant="contained"
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
