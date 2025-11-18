export interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  tags: string[];
}

export interface MenuItemData {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Green Bowl Kitchen',
    image: 'https://images.unsplash.com/photo-1640516050694-590a128e69f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaGVhbHRoeSUyMGZvb2R8ZW58MXx8fHwxNzYzNDc2NjA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Farm-to-table organic meals made with love and local ingredients',
    tags: ['Zero-Waste Partner', 'Uses Local Produce', 'Organic Certified']
  },
  {
    id: '2',
    name: 'Harvest Moon Café',
    image: 'https://images.unsplash.com/photo-1602061257507-e0150debda3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYzNDc2NjEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Seasonal comfort food supporting regenerative agriculture',
    tags: ['Supports Regeneration', 'Uses Local Produce', 'Community Partner']
  },
  {
    id: '3',
    name: 'Earthly Provisions',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYzNDA5Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Plant-based cuisine with zero waste commitment',
    tags: ['Zero-Waste Partner', 'Plant-Based', 'Compostable Packaging']
  },
];

export const menusByRestaurant: Record<string, MenuItemData[]> = {
  '1': [
    {
      id: 'm1-1',
      name: 'Rainbow Buddha Bowl',
      price: 14.50,
      description: 'Quinoa, roasted vegetables, tahini dressing, sprouts',
      category: 'Bowls'
    },
    {
      id: 'm1-2',
      name: 'Green Goddess Salad',
      price: 12.00,
      description: 'Mixed greens, avocado, cucumber, hemp seeds, goddess dressing',
      category: 'Salads'
    },
    {
      id: 'm1-3',
      name: 'Healing Turmeric Soup',
      price: 9.50,
      description: 'Coconut-based soup with turmeric, ginger, vegetables',
      category: 'Soups'
    },
    {
      id: 'm1-4',
      name: 'Organic Smoothie Bowl',
      price: 11.00,
      description: 'Açai, banana, berries, granola, coconut',
      category: 'Bowls'
    },
  ],
  '2': [
    {
      id: 'm2-1',
      name: 'Rustic Vegetable Tart',
      price: 13.50,
      description: 'Seasonal vegetables, flaky crust, herb cream',
      category: 'Mains'
    },
    {
      id: 'm2-2',
      name: 'Wild Mushroom Risotto',
      price: 16.00,
      description: 'Arborio rice, foraged mushrooms, parmesan, truffle oil',
      category: 'Mains'
    },
    {
      id: 'm2-3',
      name: 'Garden Fresh Pasta',
      price: 15.50,
      description: 'Handmade pasta, cherry tomatoes, basil, olive oil',
      category: 'Mains'
    },
    {
      id: 'm2-4',
      name: 'Root Vegetable Medley',
      price: 10.50,
      description: 'Roasted carrots, beets, parsnips, herb butter',
      category: 'Sides'
    },
  ],
  '3': [
    {
      id: 'm3-1',
      name: 'Jackfruit Tacos',
      price: 12.50,
      description: 'Pulled jackfruit, cabbage slaw, avocado, cilantro lime',
      category: 'Tacos'
    },
    {
      id: 'm3-2',
      name: 'Lentil Power Bowl',
      price: 13.00,
      description: 'Spiced lentils, kale, sweet potato, tahini',
      category: 'Bowls'
    },
    {
      id: 'm3-3',
      name: 'Chickpea Curry',
      price: 14.00,
      description: 'Coconut curry, chickpeas, spinach, basmati rice',
      category: 'Mains'
    },
    {
      id: 'm3-4',
      name: 'Veggie Spring Rolls',
      price: 8.50,
      description: 'Fresh vegetables, rice paper, peanut sauce',
      category: 'Appetizers'
    },
  ],
};

export const donationMenuItems: Record<string, MenuItemData[]> = {
  '1': [
    {
      id: 'd1-1',
      name: 'Nourishing Bowl',
      price: 10.00,
      description: 'Wholesome meal for someone in need',
      category: 'Donation'
    },
  ],
  '2': [
    {
      id: 'd2-1',
      name: 'Comfort Meal',
      price: 12.00,
      description: 'Hearty meal for someone in need',
      category: 'Donation'
    },
  ],
  '3': [
    {
      id: 'd3-1',
      name: 'Plant Power Meal',
      price: 11.00,
      description: 'Nutritious plant-based meal for someone in need',
      category: 'Donation'
    },
  ],
};
