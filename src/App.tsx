import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { DataProvider } from './contexts/DataContext';
import { Homepage } from './pages/Homepage';
import { RestaurantMenu } from './pages/RestaurantMenu';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { About } from './pages/About';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminOrders } from './pages/admin/Orders';
import { AdminDonations } from './pages/admin/Donations';
import { AdminRestaurants } from './pages/admin/Restaurants';
import { AdminEmails } from './pages/admin/Emails';

function App() {
  return (
    <Router>
      <DataProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<OrderConfirmation />} />
            
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/donations" element={<AdminDonations />} />
            <Route path="/admin/restaurants" element={<AdminRestaurants />} />
            <Route path="/admin/emails" element={<AdminEmails />} />
            
            <Route path="/about" element={<About />} />
            
            {/* Catch-all route - redirects any unmatched paths to homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </DataProvider>
    </Router>
  );
}

export default App;