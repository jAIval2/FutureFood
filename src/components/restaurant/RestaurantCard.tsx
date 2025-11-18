import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Restaurant } from '../../lib/mock-data';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link 
      to={`/restaurant/${restaurant.id}`}
      className="group block overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      
      <div className="p-5">
        <h3 className="mb-2">{restaurant.name}</h3>
        <p className="mb-4 text-muted-foreground">{restaurant.description}</p>
        
        <div className="flex flex-wrap gap-2">
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
      </div>
    </Link>
  );
};
