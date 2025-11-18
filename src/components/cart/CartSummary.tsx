import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface CartSummaryProps {
  onContinue: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ onContinue }) => {
  const { cartItems, getCartTotal } = useCart();
  
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  if (itemCount === 0) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
            <p className="text-primary">${total.toFixed(2)}</p>
          </div>
        </div>
        
        <button
          onClick={onContinue}
          className="rounded-full bg-primary px-8 py-3 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
