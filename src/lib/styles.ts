import { HaircutStyle, BeardStyle } from '../types';

export const haircuts: HaircutStyle[] = [
  {
    id: 'h1',
    name: 'Classic Side Part',
    description: 'A timeless look with a clean part and faded sides.',
    suitableFaceShapes: ['Oval', 'Square', 'Diamond'],
    details: {
      fadeLength: '3mm to 6mm',
      topTexture: 'Medium length, combed side',
      lineUp: 'Sharp at temples'
    },
    productRecommendations: ['Styling Pomade', 'Hair Spray']
  },
  {
    id: 'h2',
    name: 'Textured Crop',
    description: 'Modern messy look with a high fade.',
    suitableFaceShapes: ['Oval', 'Round', 'Heart'],
    details: {
      fadeLength: 'Skin fade to 2mm',
      topTexture: 'Short, messy with clay',
      lineUp: 'Natural fringe'
    },
    productRecommendations: ['Matte Clay', 'Texture Powder']
  },
  {
    id: 'h3',
    name: 'Pompadour Fade',
    description: 'High volume top with tightly tapered sides.',
    suitableFaceShapes: ['Round', 'Square'],
    details: {
      fadeLength: 'Drop fade 1.5mm',
      topTexture: 'High volume, slicked back',
      lineUp: 'Hard part option'
    },
    productRecommendations: ['High-shine Pomade']
  },
  {
    id: 'h4',
    name: 'Buzz Cut with Line-up',
    description: 'Short all over with precision edges.',
    suitableFaceShapes: ['Oval', 'Square', 'Diamond'],
    details: {
      fadeLength: '3mm all over',
      topTexture: 'Even length',
      lineUp: 'Crisp rectangular finish'
    },
    productRecommendations: ['Scalp Moisturizer']
  }
];

export const beards: BeardStyle[] = [
  {
    id: 'b1',
    name: 'Short Boxed Beard',
    suitableFaceShapes: ['Oval', 'Round', 'Heart'],
    details: {
      lengthMm: 5,
      guide: 'Follow natural jawline, trim neck at 2 finger widths above Adam\'s apple'
    }
  },
  {
    id: 'b2',
    name: 'Stubble Look',
    suitableFaceShapes: ['Oval', 'Square', 'Diamond', 'Round', 'Heart'],
    details: {
      lengthMm: 2,
      guide: 'Clean up cheeks and neck for a sharp finish'
    }
  },
  {
    id: 'b3',
    name: 'Full Beard (Tapered)',
    suitableFaceShapes: ['Square', 'Diamond'],
    details: {
      lengthMm: 15,
      guide: 'Taper sides into sideburns, keep length at chin'
    }
  }
];
