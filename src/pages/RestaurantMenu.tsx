import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { MenuItem } from '../components/restaurant/MenuItem';
import { CartSummary } from '../components/cart/CartSummary';
import { DonationModal } from '../components/modals/DonationModal';
import { EmailModal } from '../components/modals/EmailModal';
import { Badge } from '../components/ui/badge';
import { useCart } from '../contexts/CartContext';
import { restaurants, menusByRestaurant, donationMenuItems } from '../lib/mock-data';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';

export const RestaurantMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setDonation, setDonationEmail } = useCart();
  
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  
  const restaurant = restaurants.find(r => r.id === id);
  const menuItems = id ? menusByRestaurant[id] || [] : [];
  const donationItems = id ? donationMenuItems[id] || [] : [];
  
  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }
  
  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
  };
  
  const handleContinue = () => {
    setShowDonationModal(true);
  };
  
  const handleAddDonation = (item: typeof donationItems[0], quantity: number) => {
    setShowDonationModal(false);
    setShowEmailModal(true);
    setDonation({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantName: restaurant.name,
      quantity: quantity,
    });
  };
  
  const handleSkipDonation = () => {
    setShowDonationModal(false);
    navigate('/checkout');
  };
  
  const handleEmailSubmit = (email: string) => {
    setDonationEmail(email);
    setShowEmailModal(false);
    navigate('/checkout');
  };
  
  const handleEmailBack = () => {
    setShowEmailModal(false);
    setShowDonationModal(true);
  };
  
  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <main>
        <div className="relative h-64 overflow-hidden">
          <ImageWithFallback
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <button
            onClick={() => navigate('/')}
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-colors hover:bg-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative -mt-12 mb-8 rounded-2xl bg-white p-6 shadow-xl">
            <h1 className="mb-2">{restaurant.name}</h1>
            <p className="mb-4 text-muted-foreground">{restaurant.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {restaurant.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="rounded-full bg-accent/50 text-accent-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="mb-6">Menu</h2>
            <div className="space-y-4">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAdd={() => handleAddToCart(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <CartSummary onContinue={handleContinue} />
      
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        onAddMeal={handleAddDonation}
        onSkip={handleSkipDonation}
        donationItems={donationItems}
        restaurantName={restaurant.name}
      />
      
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailSubmit}
        onBack={handleEmailBack}
      />
      
      <Footer />
    </div>
  );
};
