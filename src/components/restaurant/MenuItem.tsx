import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItemData } from '../../lib/mock-data';
import { Badge } from '../ui/badge';

interface MenuItemProps {
  item: MenuItemData;
  onAdd: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd }) => {
  // Split allergens by comma and filter out empty strings
  const allergenList = item.allergens 
    ? item.allergens.split(',').map(a => a.trim()).filter(a => a.length > 0)
    : [];

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-md">
      <div className="flex-1">
        <div className="flex items-start gap-2 mb-1 flex-wrap">
          <h4 className="flex-1">{item.name}</h4>
          {allergenList.length > 0 && (
            <div className="flex gap-1 shrink-0">
              {allergenList.map((allergen, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {allergen}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <p className="mb-2 text-muted-foreground">{item.description}</p>
        <span className="text-primary">£{item.price.toFixed(2)}</span>
      </div>
      
      <button
        onClick={onAdd}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
        aria-label={`Add ${item.name} to cart`}
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
};