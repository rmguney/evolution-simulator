import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { calculateMovementSpeed, calculateEnergyConsumption } from '../utils/geneticUtils';

const Critter = ({ position, genes, stats, onMove, onDeath }) => {
  const meshRef = useRef();
  const { scene } = useGLTF('/assets/critter.glb', true);
  const model = scene ? scene.clone() : null;
  
  const [showStats, setShowStats] = useState(false);
  
  useFrame((state, delta) => {
    // Update position and handle movement
    if (onMove) {
      const speed = calculateMovementSpeed(genes.movementSpeed, genes.size);
      // Movement logic here
    }
    
    // Update scale based on size gene
    const scale = 0.5 + (genes.size / 100);
    meshRef.current.scale.set(scale, scale, scale);
  });
  
  // Status bars component
  const StatusBars = () => (
    <Html>
      <div className="bg-black/50 p-2 rounded text-white text-xs">
        <div>Energy: {stats.energy.toFixed(1)}%</div>
        <div>Age: {stats.age.toFixed(1)}</div>
        <div>Size: {genes.size.toFixed(1)}</div>
        <div>Speed: {genes.movementSpeed.toFixed(1)}</div>
      </div>
    </Html>
  );
  
  return (
    <group position={position}>
      {model ? (
        <primitive
          ref={meshRef}
          object={model}
          onPointerEnter={() => setShowStats(true)}
          onPointerLeave={() => setShowStats(false)}
        />
      ) : (
        <mesh
          ref={meshRef}
          onPointerEnter={() => setShowStats(true)}
          onPointerLeave={() => setShowStats(false)}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#e76f51" />
        </mesh>
      )}
      {showStats && <StatusBars />}
    </group>
  );
};

export default Critter;