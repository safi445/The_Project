import { FaceAnalysisResult, HaircutStyle, BeardStyle } from '../types';
import { haircuts, beards } from './styles';

export function getRecommendations(analysis: FaceAnalysisResult) {
  const recommendedHaircuts = haircuts
    .filter(h => h.suitableFaceShapes.includes(analysis.faceShape))
    .slice(0, 4);

  const recommendedBeards = beards
    .filter(b => b.suitableFaceShapes.includes(analysis.faceShape))
    .slice(0, 3);

  // If we don't have enough matches, add some universal ones
  if (recommendedHaircuts.length < 2) {
    recommendedHaircuts.push(...haircuts.filter(h => !recommendedHaircuts.includes(h)).slice(0, 2));
  }

  return {
    haircuts: recommendedHaircuts,
    beards: recommendedBeards
  };
}
