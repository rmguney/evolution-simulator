import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const HexTile = ({ position, type, size = 0.99 }) => {
  const meshRef = useRef();
  
  // Colors for different tile types
  const colors = {
    land: '#B6C7AA',
    water: '#6A9AB0',
    selected: '#'
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
        metalness={type === 'water' ? 0.5 : 0.1}
        roughness={type === 'water' ? 0.5 : 0.9}
      />
    </mesh>
  );
};

export default HexTile;