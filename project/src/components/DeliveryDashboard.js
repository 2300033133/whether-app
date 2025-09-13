import React from 'react';

function DeliveryDashboard() {
  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>Delivery Partner Dashboard</h2>
          <p>Manage your deliveries</p>
        </div>
        
        <div className="order-list">
          <div className="card">
            <h3>Delivery #1234</h3>
            <p>Restaurant: Pizza Place</p>
            <p>Customer Location: 123 Main St</p>
            <p>Status: Ready for pickup</p>
            <button className="btn btn-primary">Accept Delivery</button>
          </div>
          
          <div className="card">
            <h3>Delivery #1235</h3>
            <p>Restaurant: Burger Joint</p>
            <p>Customer Location: 456 Oak Ave</p>
            <p>Status: In Transit</p>
            <button className="btn btn-primary">Mark as Delivered</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDashboard;