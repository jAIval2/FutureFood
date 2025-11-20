// Import local assets
import francoMancaImg from 'figma:asset/dc5087394f592ed6a8afc758b67265889099a928.png';
import artigianoImg from 'figma:asset/f3caabef2ed9d346085068ba0a37413f984ee607.png';
import logoImg from 'figma:asset/4b01671c35e7c4ca9f0b40dd8bfd07e6535c8483.png';

export const assets = {
  logo: logoImg,
  restaurants: {
    francoManca: francoMancaImg,
    artigiano: artigianoImg,
  }
};

// Helper function to get about page image for a restaurant
export const getRestaurantAboutImage = (restaurantId: string): string | null => {
  if (restaurantId === '1') return francoMancaImg;
  if (restaurantId === '2') return artigianoImg;
  return null;
};