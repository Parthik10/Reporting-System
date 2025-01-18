import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Reports from './pages/Reports';
import AddReport from './pages/AddReport';
import Weater from './pages/Weater';
import Header from './components/Header';
import ContextProvider from './context/ContextProvider';


function App() {
  return (
    <ContextProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-report" element={<AddReport />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/weather" element={<Weater />} />
      </Routes>
    </Router>
    </ContextProvider>
  );
}

export default App;
