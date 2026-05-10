import { describe, it, expect } from 'vitest';
import { analyzeFace } from '../lib/faceAnalysis';
import { getRecommendations } from '../lib/recommendations';

describe('Face Analysis', () => {
  it('should detect Oval face shape based on height/width ratio', () => {
    const landmarks = new Array(500).fill({ x: 0, y: 0 });
    landmarks[10] = { x: 0.5, y: 0.1 }; // top
    landmarks[152] = { x: 0.5, y: 0.9 }; // chin
    landmarks[234] = { x: 0.3, y: 0.5 }; // left cheek
    landmarks[454] = { x: 0.7, y: 0.5 }; // right cheek
    landmarks[58] = { x: 0.35, y: 0.8 }; // left jaw
    landmarks[288] = { x: 0.65, y: 0.8 }; // right jaw
    landmarks[103] = { x: 0.35, y: 0.2 }; // forehead left
    landmarks[332] = { x: 0.65, y: 0.2 }; // forehead right

    const result = analyzeFace(landmarks);
    expect(result.faceShape).toBe('Oval');
  });

  it('should detect Round face shape', () => {
    const landmarks = new Array(500).fill({ x: 0, y: 0 });
    landmarks[10] = { x: 0.5, y: 0.2 }; // top
    landmarks[152] = { x: 0.5, y: 0.8 }; // chin (height 0.6)
    landmarks[234] = { x: 0.2, y: 0.5 }; // left cheek
    landmarks[454] = { x: 0.8, y: 0.5 }; // right cheek (width 0.6)
    // Other points...

    const result = analyzeFace(landmarks);
    expect(result.faceShape).toBe('Round');
  });
});

describe('Recommendations', () => {
  it('should return at least 2 haircut recommendations', () => {
    const analysis: any = { faceShape: 'Oval' };
    const result = getRecommendations(analysis);
    expect(result.haircuts.length).toBeGreaterThanOrEqual(2);
  });
});
