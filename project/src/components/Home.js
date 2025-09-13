import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const restaurants = [
  {
    id: 1,
    name: "Pizza Paradise",
    cuisine: "Italian",
    rating: 4.5,
    location: "123 Main St, Downtown",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800",
    menu: [
      {
        id: 1,
        name: "Margherita Pizza",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400",
        description: "Fresh tomatoes, mozzarella, basil"
      },
      {
        id: 2,
        name: "Pepperoni Pizza",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
        description: "Pepperoni, cheese, tomato sauce"
      }
    ]
  },
  {
    id: 2,
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.3,
    location: "456 Oak Ave, Chinatown",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    menu: [
      {
        id: 3,
        name: "Kung Pao Chicken",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400",
        description: "Spicy diced chicken with peanuts"
      },
      {
        id: 4,
        name: "Vegetable Fried Rice",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
        description: "Rice with mixed vegetables"
      }
    ]
  }
];

function Home() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: cart, 1: delivery, 2: payment, 3: confirmation
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    phone: '',
    instructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const applyCoupon = () => {
    if (couponCode === 'FIRST50') {
      setDiscount(50);
    } else if (couponCode === 'SAVE20') {
      setDiscount(20);
    }
  };

  const getTotalPrice = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    return subtotal - (subtotal * discount / 100);
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    setCheckoutStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    const newOrderId = Math.random().toString(36).substr(2, 9);
    setOrderId(newOrderId);
    setOrderPlaced(true);
    setCheckoutStep(3);
  };

  const resetOrder = () => {
    setCart([]);
    setCheckoutStep(0);
    setDeliveryDetails({
      address: '',
      phone: '',
      instructions: ''
    });
    setPaymentMethod('card');
    setOrderPlaced(false);
    setOrderId(null);
    setSelectedRestaurant(null);
  };

  const renderCheckoutStep = () => {
    switch (checkoutStep) {
      case 1: // Delivery Details
        return (
          <div className="checkout-step">
            <h3>Delivery Details</h3>
            <form onSubmit={handleDeliverySubmit} className="checkout-form">
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  value={deliveryDetails.address}
                  onChange={(e) => setDeliveryDetails({...deliveryDetails, address: e.target.value})}
                  required
                  placeholder="Enter your full delivery address"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={deliveryDetails.phone}
                  onChange={(e) => setDeliveryDetails({...deliveryDetails, phone: e.target.value})}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label>Delivery Instructions (Optional)</label>
                <textarea
                  value={deliveryDetails.instructions}
                  onChange={(e) => setDeliveryDetails({...deliveryDetails, instructions: e.target.value})}
                  placeholder="Any special instructions for delivery"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Proceed to Payment
              </button>
            </form>
          </div>
        );

      case 2: // Payment
        return (
          <div className="checkout-step">
            <h3>Payment</h3>
            <form onSubmit={handlePaymentSubmit} className="checkout-form">
              <div className="form-group">
                <label>Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-select"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>
              {paymentMethod === 'card' && (
                <>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              {paymentMethod === 'upi' && (
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    required
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                Place Order
              </button>
            </form>
          </div>
        );

      case 3: // Confirmation
        return (
          <div className="checkout-step confirmation">
            <div className="success-animation">✓</div>
            <h3>Order Confirmed!</h3>
            <p>Your order has been successfully placed.</p>
            <div className="order-details">
              <p><strong>Order ID:</strong> {orderId}</p>
              <p><strong>Delivery Address:</strong> {deliveryDetails.address}</p>
              <p><strong>Total Amount:</strong> ${getTotalPrice().toFixed(2)}</p>
              <p><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</p>
            </div>
            <p className="estimated-time">Estimated delivery time: 30-45 minutes</p>
            <button onClick={resetOrder} className="btn btn-primary">
              Place New Order
            </button>
          </div>
        );

      default: // Cart
        return (
          <div className="cart">
            <h3>Your Order</h3>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="btn btn-secondary" onClick={applyCoupon}>
                Apply Coupon
              </button>
            </div>
            {discount > 0 && (
              <p>Discount applied: {discount}% off</p>
            )}
            <div className="cart-total">
              <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setCheckoutStep(1)}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="hero">
        <div className="container">
          <h1>Discover the best food & drinks</h1>
          <p>Order food from favorite restaurants near you</p>
        </div>
      </div>
      
      <div className="container">
        {!selectedRestaurant ? (
          <div className="restaurant-list">
            {restaurants.map(restaurant => (
              <div key={restaurant.id} className="card restaurant-card" onClick={() => handleRestaurantClick(restaurant)}>
                <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                <h3>{restaurant.name}</h3>
                <p>Cuisine: {restaurant.cuisine}</p>
                <p>Rating: {restaurant.rating}⭐</p>
                <p>Location: {restaurant.location}</p>
                <button className="btn btn-primary">View Menu</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="restaurant-detail">
            <button className="btn btn-secondary" onClick={() => setSelectedRestaurant(null)}>
              Back to Restaurants
            </button>
            <h2>{selectedRestaurant.name}</h2>
            <p>Location: {selectedRestaurant.location}</p>
            <div className="menu-list">
              {selectedRestaurant.menu.map(item => (
                <div key={item.id} className="card menu-item">
                  <img src={item.image} alt={item.name} className="food-image" />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">${item.price}</p>
                  <button className="btn btn-primary" onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {cart.length > 0 && renderCheckoutStep()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;