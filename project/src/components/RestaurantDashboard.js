import React from 'react';

function RestaurantDashboard() {
  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>Restaurant Dashboard</h2>
          <p>Manage your restaurant orders and menu</p>
        </div>
        
        <div className="order-list">
          <div className="card">
            <h3>Order #1234</h3>
            <p>Customer: John Doe</p>
            <p>Items: 2x Pizza, 1x Pasta</p>
            <p>Status: Pending</p>
            <button className="btn btn-primary">Accept Order</button>
          </div>
          
          <div className="card">
            <h3>Order #1235</h3>
            <p>Customer: Jane Smith</p>
            <p>Items: 1x Burger, 1x Fries</p>
            <p>Status: Preparing</p>
            <button className="btn btn-primary">Mark as Ready</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDashboard;