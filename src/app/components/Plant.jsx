import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Plant = ({ position, scale = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Animate growth
      const currentScale = Math.min(scale, meshRef.current.scale.x + delta * 0.5);
      meshRef.current.scale.set(currentScale, currentScale, currentScale);
    }
  });
  
  // Elevate plant slightly above hex cell
  const elevatedPosition = [position[0], position[1] + 0.5, position[2]];
  
  return (
    <mesh ref={meshRef} position={elevatedPosition} scale={[0.1, 0.1, 0.1]}>
      <coneGeometry args={[0.5, 1, 8]} />
      <meshStandardMaterial color="#4a9f4f" />
    </mesh>
  );
};

export default Plant;