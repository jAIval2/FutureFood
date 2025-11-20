import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  restaurants as defaultRestaurants, 
  menusByRestaurant as defaultMenus,
  donationMenuItems as defaultDonations,
  Restaurant,
  MenuItemData
} from '../lib/mock-data';

interface DataContextType {
  restaurants: Restaurant[];
  menusByRestaurant: Record<string, MenuItemData[]>;
  donationMenuItems: Record<string, MenuItemData[]>;
  updateRestaurant: (id: string, data: Partial<Restaurant>) => void;
  addRestaurant: (restaurant: Restaurant) => void;
  deleteRestaurant: (id: string) => void;
  updateMenu: (restaurantId: string, menuItems: MenuItemData[]) => void;
  updateDonationMenu: (restaurantId: string, donationItems: MenuItemData[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 'future_feast_data';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or use defaults
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.restaurants || defaultRestaurants;
      } catch {
        return defaultRestaurants;
      }
    }
    return defaultRestaurants;
  });

  const [menusByRestaurant, setMenusByRestaurant] = useState<Record<string, MenuItemData[]>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.menusByRestaurant || defaultMenus;
      } catch {
        return defaultMenus;
      }
    }
    return defaultMenus;
  });

  const [donationMenuItems, setDonationMenuItems] = useState<Record<string, MenuItemData[]>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.donationMenuItems || defaultDonations;
      } catch {
        return defaultDonations;
      }
    }
    return defaultDonations;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    const data = {
      restaurants,
      menusByRestaurant,
      donationMenuItems,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [restaurants, menusByRestaurant, donationMenuItems]);

  const updateRestaurant = (id: string, data: Partial<Restaurant>) => {
    setRestaurants(prev => 
      prev.map(r => r.id === id ? { ...r, ...data } : r)
    );
  };

  const addRestaurant = (restaurant: Restaurant) => {
    setRestaurants(prev => [...prev, restaurant]);
    // Initialize empty menus for new restaurant
    setMenusByRestaurant(prev => ({ ...prev, [restaurant.id]: [] }));
    setDonationMenuItems(prev => ({ ...prev, [restaurant.id]: [] }));
  };

  const deleteRestaurant = (id: string) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
    setMenusByRestaurant(prev => {
      const newMenus = { ...prev };
      delete newMenus[id];
      return newMenus;
    });
    setDonationMenuItems(prev => {
      const newDonations = { ...prev };
      delete newDonations[id];
      return newDonations;
    });
  };

  const updateMenu = (restaurantId: string, menuItems: MenuItemData[]) => {
    setMenusByRestaurant(prev => ({
      ...prev,
      [restaurantId]: menuItems,
    }));
  };

  const updateDonationMenu = (restaurantId: string, donationItems: MenuItemData[]) => {
    setDonationMenuItems(prev => ({
      ...prev,
      [restaurantId]: donationItems,
    }));
  };

  return (
    <DataContext.Provider
      value={{
        restaurants,
        menusByRestaurant,
        donationMenuItems,
        updateRestaurant,
        addRestaurant,
        deleteRestaurant,
        updateMenu,
        updateDonationMenu,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
