import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { RestaurantCard } from '../components/restaurant/RestaurantCard';
import { useData } from '../contexts/DataContext';
import { Sprout } from 'lucide-react';

export const Homepage: React.FC = () => {
  const { restaurants } = useData();
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-secondary/40 via-white to-accent/20 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
                  <Sprout className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="mb-4">Support Local Kitchens. Nurture Your Community.</h1>
              <p className="text-muted-foreground">
                Order delicious meals from eco-conscious restaurants committed to sustainability, 
                regenerative practices, and community support. Every order makes a difference.
              </p>
            </div>
          </div>
          
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl"></div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12">
              <h2 className="mb-2">Local Restaurants</h2>
              <p className="text-muted-foreground">
                Discover restaurants making a positive impact on our community and environment
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};