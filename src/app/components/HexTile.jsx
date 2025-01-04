import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const HexTile = ({ position, type, size = 0.99 }) => {
  const meshRef = useRef();
  
  // Colors for different tile types
  const colors = {
    land: '#90be6d',
    water: '#48cae4',
    selected: '#f4a261'
  };
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[0, 11, 0]}
    >
      <cylinderGeometry args={[size, size, 1, 6]} />
      <meshStandardMaterial
        color={colors[type]}
        metalness={type === 'water' ? 0.8 : 0.1}
        roughness={type === 'water' ? 0.2 : 0.8}
      />
    </mesh>
  );
};

export default HexTile;