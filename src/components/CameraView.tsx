'use client';

import React, { useRef, useEffect, useState } from 'react';
import { analyzeFace } from '@/lib/faceAnalysis';
import { FaceAnalysisResult } from '@/types';
import AROverlay from './AROverlay';

interface CameraViewProps {
  onAnalysisComplete: (result: FaceAnalysisResult) => void;
  selectedHaircutId?: string;
  selectedBeardId?: string;
  isLocked?: boolean;
}

export default function CameraView({
  onAnalysisComplete,
  selectedHaircutId,
  selectedBeardId,
  isLocked = false
}: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [landmarks, setLandmarks] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 640, height: 480 });

  useEffect(() => {
    let faceMesh: any;
    let camera: any;
    let isActive = true;

    async function setupMediaPipe() {
      try {
        const mpFaceMesh = await import('@mediapipe/face_mesh');
        const mpCamera = await import('@mediapipe/camera_utils');

        const FaceMeshConstructor = mpFaceMesh.FaceMesh || (mpFaceMesh as any).default?.FaceMesh;
        const CameraConstructor = mpCamera.Camera || (mpCamera as any).default?.Camera;

        if (!FaceMeshConstructor || !CameraConstructor) {
          setError('Failed to load face detection modules.');
          return;
        }

        faceMesh = new FaceMeshConstructor({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        faceMesh.onResults((results: any) => {
          if (!isActive || !canvasRef.current || !videoRef.current) return;

          const canvasCtx = canvasRef.current.getContext('2d');
          if (!canvasCtx) return;

          canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

          if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const currentLandmarks = results.multiFaceLandmarks[0];
            setLandmarks(currentLandmarks);

            if (isAnalyzing && countdown === 0) {
              const analysis = analyzeFace(currentLandmarks);
              onAnalysisComplete(analysis);
              setIsAnalyzing(false);
              setCountdown(null);
            }
          } else {
            setLandmarks(null);
          }
        });

        if (videoRef.current) {
          camera = new CameraConstructor(videoRef.current, {
            onFrame: async () => {
              if (videoRef.current && faceMesh && !isLocked) {
                await faceMesh.send({ image: videoRef.current });
              }
            },
            width: 640,
            height: 480,
          });
          camera.start();
        }
      } catch (err) {
        setError('Camera access failed.');
      }
    }

    setupMediaPipe();

    return () => {
      isActive = false;
      if (faceMesh) faceMesh.close();
      if (camera) camera.stop?.();
    };
  }, [isAnalyzing, countdown, onAnalysisComplete, isLocked]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);
  };

  return (
    <div className="relative w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-xl">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-20 bg-slate-900/90">
          <p className="text-white font-medium">{error}</p>
        </div>
      )}
      <video ref={videoRef} className="hidden" playsInline />
      <canvas ref={canvasRef} className="w-full h-full object-cover" width={640} height={480} />

      {landmarks && (
        <AROverlay
          landmarks={landmarks}
          selectedHaircutId={selectedHaircutId}
          selectedBeardId={selectedBeardId}
          width={640}
          height={480}
        />
      )}

      {!error && !isLocked && (
        <>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 bg-gradient-to-t from-black/60 to-transparent">
            {countdown !== null && countdown > 0 ? (
              <div className="text-white text-6xl font-bold mb-8 animate-ping">{countdown}</div>
            ) : (
              <button
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all disabled:bg-slate-400"
              >
                {isAnalyzing ? 'Scanning...' : 'Scan Face (3s)'}
              </button>
            )}
          </div>
          <div className="absolute top-4 left-4 right-4 text-center">
            <p className="text-white/80 text-sm font-medium bg-black/40 backdrop-blur-md py-2 px-4 rounded-full inline-block">
              {selectedHaircutId ? 'Try-on Active' : 'Position your face in the center'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
