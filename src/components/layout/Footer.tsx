import React from 'react';
import { Leaf, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-primary">Future Feast</span>
            </div>
            <p className="text-muted-foreground">
              Supporting local kitchens and nurturing our community, one meal at a time.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4">Our Commitment</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                Zero waste partnerships
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                Local, organic produce
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                Regenerative agriculture
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4">Sustainability Statement</h4>
            <p className="text-muted-foreground">
              We partner with restaurants committed to environmental stewardship, 
              community support, and regenerative food systems. Together, we're 
              building a more sustainable food future.
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Future Feast. Building community through food.</p>
        </div>
      </div>
    </footer>
  );
};
