import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-primary">Future Feast</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
          <Link 
            to="/admin" 
            className="flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <User className="h-4 w-4" />
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
};
