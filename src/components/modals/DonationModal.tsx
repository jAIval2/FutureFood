import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MenuItemData } from '../../lib/mock-data';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (item: MenuItemData, quantity: number) => void;
  onSkip: () => void;
  donationItems: MenuItemData[];
  restaurantName: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  onAddMeal,
  onSkip,
  donationItems,
  restaurantName,
}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleSelectItem = (item: MenuItemData) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddMeal = () => {
    if (selectedItem) {
      onAddMeal(selectedItem, quantity);
    } else if (donationItems[0]) {
      onAddMeal(donationItems[0], 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add a Free Meal</DialogTitle>
          <DialogDescription>
            Your order can include a free meal for someone in need. We'll send you a photo of the donation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760137721475-26feb21451b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMHNoYXJpbmclMjBmb29kfGVufDF8fHx8MTc2MzQ3NjYxMHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Hands sharing food"
                className="h-48 w-full object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3>Choose a meal to donate:</h3>
            {donationItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-xl border p-4 transition-all ${
                  selectedItem?.id === item.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'bg-card hover:border-primary/50'
                }`}
              >
                <button
                  onClick={() => handleSelectItem(item)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <div className="flex-1">
                    <h4 className="mb-1">{item.name}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="shrink-0 text-primary">${item.price.toFixed(2)}</span>
                </button>
                
                {selectedItem?.id === item.id && (
                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <span className="text-muted-foreground">Quantity:</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleDecrement}
                        className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:bg-secondary"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button
                        onClick={handleIncrement}
                        className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:bg-secondary"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onSkip}
              className="flex-1 rounded-full border border-border px-6 py-3 transition-colors hover:bg-secondary"
            >
              Skip
            </button>
            <button
              onClick={handleAddMeal}
              className="flex-1 rounded-full bg-primary px-6 py-3 text-white shadow-lg shadow-primary/30 transition-all hover:scale-105"
            >
              Add {selectedItem ? `${quantity} Meal${quantity > 1 ? 's' : ''}` : 'a Meal'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
