import React, { useEffect, useState } from "react";
import { useValue } from "../context/ContextProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_APP_URI_API;
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const AdminReports = () => {
  const { state } = useValue();
  const { auth } = state;

  const [reports, setReports] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [blink, setBlink] = useState(true);

  const fetchReports = async () => {
    try {
      const response = await fetch(`${API}/api/reportform/admin/reports`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch reports: ${response.statusText}`);
      }
      const data = await response.json();
      setReports(data.reports);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteEmergency = async (id) => {
    if (!window.confirm("Delete this emergency?")) return;
    try {
      const res = await fetch(`${API}/api/emergency/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete emergency");
      toast.success("Emergency deleted");
      fetchEmergencies(); // Refresh list
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchEmergencies = async () => {
    try {
      const response = await fetch(`${API}/api/emergency`);
      const data = await response.json();
      const emergenciesWithLocation = await Promise.all(
        data.map(async (item) => {
          const locationName = await getLocationName(
            item.latitude,
            item.longitude
          );
          return { ...item, locationName };
        })
      );
      setEmergencies(emergenciesWithLocation);
    } catch (error) {
      console.error("Error fetching emergencies:", error);
    }
  };

  const getLocationName = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await res.json();
      return data.features[0]?.place_name || "Unknown location";
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return "Unknown location";
    }
  };

  useEffect(() => {
    if (auth.token && auth.user.role === "admin") {
      fetchReports();
      fetchEmergencies();
    }
  }, [auth]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      const response = await fetch(`${API}/api/reportform/admin/report/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete report");
      }
      toast.success("Report deleted successfully");
      fetchReports(); // Refresh after delete
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!auth.token || auth.user.role !== "admin") {
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6">Access denied. Admins only.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 5, mx: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Emergency Alerts */}
      <Box sx={{ my: 3 }}>
  <Typography variant="h5" gutterBottom>
    Live Emergencies
  </Typography>
  <Grid container spacing={2}>
    {emergencies.map((emergency) => (
      <Grid item xs={12} sm={6} md={4} key={emergency._id}>
        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            backgroundColor: blink ? "red" : "yellow",
            color: "white",
            minHeight: 120,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative", // ✨ Important for absolute positioning
          }}
        >
          {/* Delete Button */}
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white", // ✨ White delete icon
            }}
            size="small"
            onClick={() => handleDeleteEmergency(emergency._id)}
          >
            <Delete fontSize="small" />
          </IconButton>

          {/* Emergency Info */}
          <Typography variant="h6">{emergency.name}</Typography>
          <Typography variant="body2">{emergency.email}</Typography>
          <Typography variant="body2">
            {emergency.latitude.toFixed(4)}, {emergency.longitude.toFixed(4)}
          </Typography>
          <Typography variant="body2">
            {emergency.locationName}
          </Typography>
        </Box>
      </Grid>
    ))}
    {emergencies.length === 0 && (
      <Typography>No emergencies reported.</Typography>
    )}
  </Grid>
</Box>


      {/* Reports Table */}
      <TableContainer component={Paper}>
        <Table aria-label="reports table">
          <TableHead>
            <TableRow>
              <TableCell>Disaster</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Report Time</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report._id}>
                <TableCell>{report.disaster}</TableCell>
                <TableCell>{report.location}</TableCell>
                <TableCell>{report.reportTime}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>{report.user?.username || "Unknown"}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(report._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {reports.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminReports;
