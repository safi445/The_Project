'use client';

import React, { useRef, useEffect } from 'react';
import { renderAROverlay } from '@/lib/arRenderer';

interface AROverlayProps {
  landmarks: any;
  selectedHaircutId?: string;
  selectedBeardId?: string;
  width: number;
  height: number;
}

export default function AROverlay({
  landmarks,
  selectedHaircutId,
  selectedBeardId,
  width,
  height,
}: AROverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !landmarks) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (selectedHaircutId) {
      renderAROverlay(ctx, landmarks, selectedHaircutId, 'hair');
    }

    if (selectedBeardId) {
      renderAROverlay(ctx, landmarks, selectedBeardId, 'beard');
    }
  }, [landmarks, selectedHaircutId, selectedBeardId, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      width={width}
      height={height}
    />
  );
}
