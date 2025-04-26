import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useValue } from "../context/ContextProvider";
import { TextField, Button, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

const isLocal = window.location.hostname === 'localhost';
const API= isLocal
  ? import.meta.env.VITE_APP_URI_API 
  : import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const { dispatch } = useValue();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      dispatch({ type: "LOGIN", payload: { user: data.user, token: data.token } });
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 , border: "1px solid #31572c", padding: "20px", borderRadius: "10px" ,boxShadow: "0px 0px 10px #31572c"}}>
      <Typography variant="h5" mb={3}>Login</Typography>
      <form  onSubmit={handleSubmit} >
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2,backgroundColor: "#31572c" }}>
          Login
        </Button>
      </form>
      <Typography mt={2}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Box>
  );
};

export default Login;
