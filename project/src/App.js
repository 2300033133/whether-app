import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RestaurantDashboard from './components/RestaurantDashboard';
import DeliveryDashboard from './components/DeliveryDashboard';
import Auth from './components/Auth';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant" element={<RestaurantDashboard />} />
          <Route path="/delivery" element={<DeliveryDashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;