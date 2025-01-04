import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Plant = ({ position, scale = 1, onGrow, onDepleted }) => {
  const meshRef = useRef();
  const growthTimer = useRef(0);
  const depleted = useRef(false);
  
  // Try to load plant model, fallback to cone if not found
  const { scene } = useGLTF('/assets/plant.glb', true);
  const model = scene ? scene.clone() : null;
  
  useFrame((state, delta) => {
    if (depleted.current) return;
    
    growthTimer.current += delta;
    
    // Scale animation during growth
    const currentScale = Math.min(scale, (growthTimer.current / 2) * scale);
    meshRef.current.scale.set(currentScale, currentScale, currentScale);
    
    if (growthTimer.current >= 2 && onGrow) {
      onGrow();
    }
  });
  
  const handleDepleted = () => {
    depleted.current = true;
    if (onDepleted) onDepleted();
  };
  
  return model ? (
    <primitive
      ref={meshRef}
      object={model}
      position={position}
      onClick={handleDepleted}
    />
  ) : (
    <mesh ref={meshRef} position={position} onClick={handleDepleted}>
      <coneGeometry args={[0.5, 1, 8]} />
      <meshStandardMaterial color="#4a9f4f" />
    </mesh>
  );
};

export default Plant;