import React, { useState } from 'react';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { RestaurantEditor } from '../../components/admin/RestaurantEditor';
import { Badge } from '../../components/ui/badge';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useData } from '../../contexts/DataContext';
import { Restaurant, MenuItemData } from '../../lib/mock-data';

export const AdminRestaurants: React.FC = () => {
  const { restaurants, menusByRestaurant, donationMenuItems, updateRestaurant, addRestaurant, deleteRestaurant, updateMenu, updateDonationMenu } = useData();
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handleEditRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setEditorOpen(true);
  };

  const handleAddRestaurant = () => {
    setSelectedRestaurant(null);
    setEditorOpen(true);
  };

  const handleSaveRestaurant = (restaurant: Restaurant, menuItems: MenuItemData[], donationItems: MenuItemData[]) => {
    if (selectedRestaurant) {
      // Update existing restaurant
      updateRestaurant(restaurant.id, restaurant);
    } else {
      // Add new restaurant
      addRestaurant(restaurant);
    }
    
    // Update menus
    updateMenu(restaurant.id, menuItems);
    
    // Update donation items
    updateDonationMenu(restaurant.id, donationItems);
  };

  const handleDeleteRestaurant = (restaurantId: string) => {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      deleteRestaurant(restaurantId);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2">Restaurants</h1>
            <p className="text-muted-foreground">Manage restaurant partners</p>
          </div>
          
          <button 
            onClick={handleAddRestaurant}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            <Plus className="h-5 w-5" />
            Add New Restaurant
          </button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <div 
              key={restaurant.id}
              className="overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="p-5">
                <h3 className="mb-2">{restaurant.name}</h3>
                <p className="mb-4 text-muted-foreground">{restaurant.description}</p>
                
                <div className="mb-4 flex flex-wrap gap-2">
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
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditRestaurant(restaurant)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 transition-colors hover:bg-secondary"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteRestaurant(restaurant.id)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-destructive/20 px-4 py-2 text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <RestaurantEditor
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        restaurant={selectedRestaurant}
        menuItems={selectedRestaurant ? (menusByRestaurant[selectedRestaurant.id] || []) : []}
        donationItems={selectedRestaurant ? (donationMenuItems[selectedRestaurant.id] || []) : []}
        onSave={handleSaveRestaurant}
      />
    </div>
  );
};