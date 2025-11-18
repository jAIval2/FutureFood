import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Restaurant, MenuItemData } from '../../lib/mock-data';
import { Plus, Trash2, X } from 'lucide-react';

interface RestaurantEditorProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant | null;
  menuItems: MenuItemData[];
  donationItems: MenuItemData[];
  onSave: (restaurant: Restaurant, menuItems: MenuItemData[], donationItems: MenuItemData[]) => void;
}

export const RestaurantEditor: React.FC<RestaurantEditorProps> = ({
  isOpen,
  onClose,
  restaurant,
  menuItems: initialMenu,
  donationItems: initialDonation,
  onSave,
}) => {
  const [formData, setFormData] = useState<Restaurant>({
    id: '',
    name: '',
    image: '',
    description: '',
    tags: [],
  });
  
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [donationItems, setDonationItems] = useState<MenuItemData[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (restaurant) {
      setFormData(restaurant);
      setMenuItems(initialMenu);
      setDonationItems(initialDonation);
    } else {
      // New restaurant
      setFormData({
        id: `r-${Date.now()}`,
        name: '',
        image: '',
        description: '',
        tags: [],
      });
      setMenuItems([]);
      setDonationItems([]);
    }
  }, [restaurant, initialMenu, initialDonation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const handleAddMenuItem = () => {
    const newItem: MenuItemData = {
      id: `m-${formData.id}-${Date.now()}`,
      name: 'New Item',
      price: 0,
      description: '',
      category: 'Mains',
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const handleUpdateMenuItem = (index: number, field: keyof MenuItemData, value: string | number) => {
    setMenuItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleRemoveMenuItem = (index: number) => {
    setMenuItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddDonationItem = () => {
    const newItem: MenuItemData = {
      id: `d-${formData.id}-${Date.now()}`,
      name: 'New Donation Item',
      price: 10,
      description: '',
      category: 'Donation',
    };
    setDonationItems(prev => [...prev, newItem]);
  };

  const handleUpdateDonationItem = (index: number, field: keyof MenuItemData, value: string | number) => {
    setDonationItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleRemoveDonationItem = (index: number) => {
    setDonationItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, menuItems, donationItems);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}</DialogTitle>
          <DialogDescription>
            {restaurant ? 'Update restaurant details, menu items, and donation options.' : 'Create a new restaurant with menu items and donation options.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="border-b pb-2">Basic Information</h3>
            
            <div>
              <Label htmlFor="name">Restaurant Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="mt-1"
                placeholder="https://..."
              />
            </div>

            <div>
              <Label>Tags</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full bg-accent/50 px-3 py-1 text-accent-foreground"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag} variant="secondary">
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3>Menu Items</h3>
              <Button type="button" onClick={handleAddMenuItem} size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <div key={item.id} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => handleUpdateMenuItem(index, 'name', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Price</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => handleUpdateMenuItem(index, 'price', parseFloat(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Input
                          value={item.category}
                          onChange={(e) => handleUpdateMenuItem(index, 'category', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => handleUpdateMenuItem(index, 'description', e.target.value)}
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMenuItem(index)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donation Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3>Donation Menu Items</h3>
              <Button type="button" onClick={handleAddDonationItem} size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Donation Item
              </Button>
            </div>

            <div className="space-y-3">
              {donationItems.map((item, index) => (
                <div key={item.id} className="rounded-lg border border-accent/50 bg-accent/5 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => handleUpdateDonationItem(index, 'name', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Price</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => handleUpdateDonationItem(index, 'price', parseFloat(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => handleUpdateDonationItem(index, 'description', e.target.value)}
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveDonationItem(index)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {restaurant ? 'Save Changes' : 'Create Restaurant'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
