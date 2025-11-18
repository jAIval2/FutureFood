import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItemData } from '../../lib/mock-data';

interface MenuItemProps {
  item: MenuItemData;
  onAdd: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd }) => {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-md">
      <div className="flex-1">
        <h4 className="mb-1">{item.name}</h4>
        <p className="mb-2 text-muted-foreground">{item.description}</p>
        <span className="text-primary">${item.price.toFixed(2)}</span>
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
