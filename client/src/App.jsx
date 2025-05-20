import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Reports from './pages/Reports';
import AddReport from './pages/AddReport';
import Header from './components/Header';
import ContextProvider, { useValue } from './context/ContextProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminReports from './pages/AdminReports';
import Chatbot from './components/Chatbot';
import About from './pages/About';
import Footer from './components/Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PrivateRoute({ children }) {
  const { state } = useValue();
  const { auth } = state;
  return auth.token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { state } = useValue();
  const { auth } = state;
  return auth.token && auth.user.role === 'admin' ? children : <Navigate to="/" />;
}

function App() {
  return (
    <ContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/add-report"
            element={
              <PrivateRoute>
                <AddReport />
              </PrivateRoute>
            }
          />
          <Route path="/reports" element={<Reports />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin-reports"
            element={
              <AdminRoute>
                <AdminReports />
              </AdminRoute>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
        <Footer />
      </Router>
      <Chatbot />
    </ContextProvider>
  );
}

export default App;
