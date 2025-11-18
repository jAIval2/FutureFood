import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useCart } from '../contexts/CartContext';
import { CheckCircle2, Heart } from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, donationItem, donationEmail, clearCart } = useCart();
  
  const hasDonation = donationItem !== null;
  
  // Store order details before clearing
  const orderDetails = {
    items: [...cartItems],
    donation: donationItem,
    email: donationEmail,
  };
  
  useEffect(() => {
    // Clear cart after a short delay to allow viewing
    const timer = setTimeout(() => {
      // In a real app, you'd save the order first
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleBackHome = () => {
    clearCart();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h1 className="mb-4">Your meal is on its way!</h1>
            
            {hasDonation && (
              <div className="mb-8 rounded-xl border border-accent bg-accent/10 p-6">
                <div className="mb-3 flex justify-center">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <p className="text-accent-foreground">
                  A local volunteer will deliver your donated meal. You'll receive a photo soon at {orderDetails.email}.
                </p>
              </div>
            )}
            
            <div className="mb-8 rounded-xl border bg-card p-6 text-left">
              <h2 className="mb-4">Order Details</h2>
              
              <div className="space-y-3">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-muted-foreground">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                {orderDetails.donation && (
                  <>
                    <div className="border-t pt-3"></div>
                    <div className="flex items-center justify-between text-accent-foreground">
                      <span className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Donation: {orderDetails.donation.name}
                      </span>
                      <span>${orderDetails.donation.price.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <p className="mb-6 text-muted-foreground">
              Thank you for supporting your local community and choosing sustainable food options. 
              Your order will arrive within 30-45 minutes.
            </p>
            
            <button
              onClick={handleBackHome}
              className="rounded-full bg-primary px-8 py-3 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
