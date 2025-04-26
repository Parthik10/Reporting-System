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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_APP_URI_API;

const AdminReports = () => {
  const { state } = useValue();
  const { auth } = state;
  const [reports, setReports] = useState([]);

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      const response = await fetch(`${API}/api/reportform/admin/reports`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,  
        },
      });
      
      // console.log(state.auth.token);  
      if (!response.ok) {
        throw new Error(`Failed to fetch reports: ${response.statusText}`);
      }
      const data = await response.json();
      setReports(data.reports);
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  // Trigger fetching when the component is mounted and auth changes
  useEffect(() => {
    if (auth.token && auth.user.role === "admin") {
      fetchReports();
    }
  }, [auth]);

  // Handle delete action
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
      fetchReports(); // Refresh the list after deletion
    } catch (error) {
      toast.error(error.message);
    }
  };

  // If the user is not an admin or not authenticated, show access denied message
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
        Admin Reports
      </Typography>
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
