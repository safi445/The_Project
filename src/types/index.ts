export type FaceShape = 'Oval' | 'Round' | 'Square' | 'Heart' | 'Diamond';

export interface FaceAnalysisResult {
  faceShape: FaceShape;
  jawlineType: 'Sharp' | 'Soft';
  hairDensity: 'Low' | 'Medium' | 'High';
  beardGrowthPattern: 'Full' | 'Patchy' | 'Thin';
  landmarks: any;
}

export interface HaircutStyle {
  id: string;
  name: string;
  description: string;
  suitableFaceShapes: FaceShape[];
  details: {
    fadeLength: string;
    topTexture: string;
    lineUp: string;
  };
  productRecommendations: string[];
}

export interface BeardStyle {
  id: string;
  name: string;
  suitableFaceShapes: FaceShape[];
  details: {
    lengthMm: number;
    guide: string;
  };
}

export interface ConsultationSession {
  id: string;
  date: string;
  faceAnalysis: FaceAnalysisResult;
  selectedHaircutId?: string;
  selectedBeardId?: string;
}
