export interface Restaurant {
  id: string;
  name: string;
  image: string;
  aboutImage?: string; // Separate image for About page showcase
  description: string;
  tags: string[];
}

export interface MenuItemData {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  allergens?: string; // e.g., "V", "VG", "GF", "DF", etc.
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Franco Manca',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6ZXJpYXxlbnwwfHx8fDE3MzIxMjM0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    aboutImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6ZXJpYXxlbnwwfHx8fDE3MzIxMjM0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Authentic Neapolitan sourdough pizza made with slow-rise dough and the finest Italian ingredients',
    tags: ['Italian', 'Sourdough', 'Local Ingredients']
  },
  {
    id: '2',
    name: 'Artigiano',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudHxlbnwwfHx8fDE3MzIxMjM0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    aboutImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudHxlbnwwfHx8fDE3MzIxMjM0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Artisan Mediterranean cuisine with locally sourced ingredients and craft cocktails',
    tags: ['Mediterranean', 'Craft Cocktails', 'Community Partner']
  },
  {
    id: '3',
    name: 'Earthly Provisions',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYzNDA5Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    aboutImage: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYzNDA5Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Plant-based cuisine with zero waste commitment',
    tags: ['Zero-Waste Partner', 'Plant-Based', 'Compostable Packaging']
  },
];

export const menusByRestaurant: Record<string, MenuItemData[]> = {
  '1': [
    {
      id: 'm1-1',
      name: 'BUFALA',
      price: 13.50,
      description: "100% Italian tomato, buffalo mozzarella, red Piennolo tomato from Vesuvio D.O.P, extra virgin olive oil, basil",
      category: 'Pizza',
      allergens: 'V, GF'
    },
    {
      id: 'm1-2',
      name: 'PROSCIUTTO & FUNGHI',
      price: 12.75,
      description: 'Roasted cured ham, ricotta, 100% Italian tomato, mozzarella, wild mushrooms (white base)',
      category: 'Pizza',
      allergens: 'GF'
    },
    {
      id: 'm1-3',
      name: 'NAPOLI',
      price: 12.75,
      description: 'Cantabrian anchovies, 100% Italian tomato, mozzarella, Kalamata olives, capers, garlic, oregano',
      category: 'Pizza',
      allergens: 'GF'
    },
    {
      id: 'm1-4',
      name: 'CHORIZO',
      price: 12.75,
      description: 'Cured Iberico chorizo (dry & semi-dry), 100% Italian tomato, mozzarella',
      category: 'Pizza',
      allergens: 'GF'
    },
  ],
  '2': [
    {
      id: 'm2-1',
      name: 'ROSEMARY FOCACCIA',
      price: 5.50,
      description: 'Warm focaccia bread, virgin olive oil & balsamic glaze',
      category: 'Starters',
      allergens: 'VG, DF'
    },
    {
      id: 'm2-2',
      name: 'HUMMUS',
      price: 6.50,
      description: 'Homemade hummus topped with toasted pine nuts served with flatbread',
      category: 'Starters',
      allergens: 'VG, DF'
    },
    {
      id: 'm2-3',
      name: 'HALLOUMI',
      price: 7.00,
      description: 'Halloumi cheese served with sweet chilli dipping sauce',
      category: 'Starters',
      allergens: 'V, GF'
    },
    {
      id: 'm2-4',
      name: 'TRUFFLE ARANCINI',
      price: 7.50,
      description: 'Mushroom truffle arancini, truffle mayo & parmesan cheese',
      category: 'Starters',
      allergens: 'V'
    },
  ],
  '3': [
    {
      id: 'm3-1',
      name: 'Jackfruit Tacos',
      price: 12.50,
      description: 'Pulled jackfruit, cabbage slaw, avocado, cilantro lime',
      category: 'Tacos',
      allergens: 'VG'
    },
    {
      id: 'm3-2',
      name: 'Lentil Power Bowl',
      price: 13.00,
      description: 'Spiced lentils, kale, sweet potato, tahini',
      category: 'Bowls',
      allergens: 'VG'
    },
    {
      id: 'm3-3',
      name: 'Chickpea Curry',
      price: 14.00,
      description: 'Coconut curry, chickpeas, spinach, basmati rice',
      category: 'Mains',
      allergens: 'VG'
    },
    {
      id: 'm3-4',
      name: 'Veggie Spring Rolls',
      price: 8.50,
      description: 'Fresh vegetables, rice paper, peanut sauce',
      category: 'Appetizers',
      allergens: 'VG'
    },
  ],
};

export const donationMenuItems: Record<string, MenuItemData[]> = {
  '1': [
    {
      id: 'd1-1',
      name: 'Nourishing Bowl',
      price: 10.00,
      description: 'Wholesome plant-based meal for someone in need',
      category: 'Donation',
      allergens: 'VG'
    },
    {
      id: 'd1-2',
      name: 'Comfort Meal',
      price: 10.00,
      description: 'Hearty plant-based meal for someone in need (dairy-free)',
      category: 'Donation',
      allergens: 'VG, DF'
    },
  ],
  '2': [
    {
      id: 'd2-1',
      name: 'Nourishing Bowl',
      price: 10.00,
      description: 'Wholesome plant-based meal for someone in need',
      category: 'Donation',
      allergens: 'VG'
    },
    {
      id: 'd2-2',
      name: 'Comfort Meal',
      price: 10.00,
      description: 'Hearty plant-based meal for someone in need (dairy-free)',
      category: 'Donation',
      allergens: 'VG, DF'
    },
  ],
  '3': [
    {
      id: 'd3-1',
      name: 'Nourishing Bowl',
      price: 10.00,
      description: 'Wholesome plant-based meal for someone in need',
      category: 'Donation',
      allergens: 'VG'
    },
    {
      id: 'd3-2',
      name: 'Comfort Meal',
      price: 10.00,
      description: 'Hearty plant-based meal for someone in need (dairy-free)',
      category: 'Donation',
      allergens: 'VG, DF'
    },
  ],
};