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
        camera={{ position: [200, 80, 300], fov: 6 }}
        shadows
      >
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={2}
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