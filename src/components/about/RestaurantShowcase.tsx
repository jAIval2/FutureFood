import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import { Restaurant } from '../../lib/mock-data';
import { getRestaurantAboutImage } from '../../lib/assets';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RestaurantShowcaseProps {
  restaurants: Restaurant[];
}

export const RestaurantShowcase: React.FC<RestaurantShowcaseProps> = ({ restaurants }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.abs(rect.top) / (rect.height - window.innerHeight);
      const newSlide = Math.min(
        restaurants.length - 1,
        Math.floor(scrollProgress * restaurants.length)
      );
      
      setActiveSlide(newSlide);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [restaurants.length]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (index < restaurants.length - 1) {
        const nextSlide = document.getElementById(`restaurant-slide-${index + 1}`);
        nextSlide?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (index > 0) {
        const prevSlide = document.getElementById(`restaurant-slide-${index - 1}`);
        prevSlide?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Partner restaurants showcase"
    >
      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground vertical-text mb-4" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            Scroll to explore our partner kitchens
          </p>
          <div className="flex flex-col gap-3">
            {restaurants.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const slide = document.getElementById(`restaurant-slide-${index}`);
                  slide?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`h-3 w-3 rounded-full transition-all ${
                  activeSlide === index
                    ? 'bg-primary scale-125'
                    : 'bg-border hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slides */}
      {restaurants.slice(0, 3).map((restaurant, index) => (
        <RestaurantSlide
          key={restaurant.id}
          restaurant={restaurant}
          index={index}
          isActive={activeSlide === index}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

interface RestaurantSlideProps {
  restaurant: Restaurant;
  index: number;
  isActive: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const RestaurantSlide: React.FC<RestaurantSlideProps> = ({
  restaurant,
  index,
  isActive,
  onKeyDown,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isImageLeft = index % 2 === 0;

  return (
    <motion.div
      id={`restaurant-slide-${index}`}
      ref={ref}
      className="relative min-h-screen flex items-center"
      style={{ opacity }}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`grid gap-8 lg:grid-cols-2 lg:gap-12 items-center ${
          isImageLeft ? '' : 'lg:grid-flow-dense'
        }`}>
          {/* Image */}
          <motion.div
            className={`relative overflow-hidden rounded-3xl shadow-2xl ${
              isImageLeft ? '' : 'lg:col-start-2'
            }`}
            style={{ y: imageY }}
          >
            <div className="aspect-[4/3] relative">
              <ImageWithFallback
                src={getRestaurantAboutImage(restaurant.id) || restaurant.image}
                alt={`${restaurant.name} - sustainable restaurant interior`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Donation Badge */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-accent text-accent-foreground flex items-center gap-2 px-4 py-2 shadow-lg">
                  <Heart className="h-4 w-4 fill-current" />
                  Supports Share-a-Meal
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className={`space-y-6 ${isImageLeft ? '' : 'lg:col-start-1 lg:row-start-1'}`}
            initial={{ opacity: 0, x: isImageLeft ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h2 className="mb-2">{restaurant.name}</h2>
              <p className="text-muted-foreground italic mb-4">
                {restaurant.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {restaurant.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full bg-sage/20 text-primary border border-primary/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Additional Description */}
            <p className="text-foreground/80 leading-relaxed">
              Experience locally sourced, sustainably prepared meals that support both our community 
              and the environment. Every order helps create positive change.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to={`/restaurant/${restaurant.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                Order from {restaurant.name}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 transition-colors hover:bg-secondary">
                Learn more
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};