"use client";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import World from './components/World';
import Interface from './components/Interface';
import './globals.css';

const page = () => {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [20, 20, 20], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
        />
        
        <Suspense fallback={null}>
          <World />
        </Suspense>
        
        <OrbitControls />
      </Canvas>
      <Interface />
    </div>
  );
};

export default page;