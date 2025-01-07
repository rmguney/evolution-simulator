import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const Critter = ({ position, genes, stats }) => {
  const meshRef = useRef();
  const [showStats, setShowStats] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      const scale = 0.2 + (genes.size / 200); // Reduced base size and scale factor
      meshRef.current.scale.set(scale, scale, scale);
      
      // Random movement
      const speed = genes.movementSpeed * delta * 0.1;
      meshRef.current.position.x += (Math.random() - 0.5) * speed;
      meshRef.current.position.z += (Math.random() - 0.5) * speed;
    }
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
  
  // Adjust position to be above the hex cell
  const elevatedPosition = [position[0], position[1] + 0.75, position[2]];
  
  return (
    <group position={elevatedPosition}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setShowStats(true)}
        onPointerLeave={() => setShowStats(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#e76f51" />
      </mesh>
      {showStats && <StatusBars />}
    </group>
  );
};

export default Critter;