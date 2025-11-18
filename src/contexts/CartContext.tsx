import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  restaurantId: string;
  restaurantName: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface DonationItem {
  id: string;
  name: string;
  price: number;
  restaurantName: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  donationItem: DonationItem | null;
  donationEmail: string;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  setDonation: (item: DonationItem | null) => void;
  setDonationEmail: (email: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [donationItem, setDonationItem] = useState<DonationItem | null>(null);
  const [donationEmail, setDonationEmailState] = useState<string>('');

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDonationItem(null);
    setDonationEmailState('');
  };

  const getCartTotal = () => {
    const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const donationTotal = donationItem ? donationItem.price * donationItem.quantity : 0;
    return itemsTotal + donationTotal;
  };

  const setDonation = (item: DonationItem | null) => {
    setDonationItem(item);
  };

  const setDonationEmail = (email: string) => {
    setDonationEmailState(email);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        donationItem,
        donationEmail,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        setDonation,
        setDonationEmail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
