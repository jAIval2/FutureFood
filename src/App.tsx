import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { Homepage } from './pages/Homepage';
import { RestaurantMenu } from './pages/RestaurantMenu';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminOrders } from './pages/admin/Orders';
import { AdminDonations } from './pages/admin/Donations';
import { AdminRestaurants } from './pages/admin/Restaurants';
import { AdminEmails } from './pages/admin/Emails';

function App() {
  return (
    <Router>
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
          
          <Route path="/about" element={
            <div className="flex min-h-screen items-center justify-center p-8">
              <div className="max-w-2xl text-center">
                <h1 className="mb-4">About Future Feast</h1>
                <p className="text-muted-foreground">
                  We're building a regenerative food system that supports local businesses, 
                  nurtures our community, and protects the environment. Every meal ordered 
                  supports sustainable practices and community care.
                </p>
              </div>
            </div>
          } />
          
          {/* Catch-all route - redirects any unmatched paths to homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
