import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

const RotatingCube = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.004;
    }
  });

  // New colors selected to match the website's dark abstract shape and bright blue accents.
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhysicalMaterial
        color="#111827" // Very Dark Blue-Black (Matches the abstract visual)
        metalness={0.95}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.05}
        emissive="#2563EB" // Bright Blue (Matches the website's brand color/buttons)
        emissiveIntensity={0.5} // Increased intensity for a noticeable blue edge glow
      />
    </mesh>
  );
};

const Scene3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Lighting: Adjusted for a cleaner, modern look using white/light blue */}
      <ambientLight intensity={0.6} color="#FFFFFF" />
      <directionalLight position={[4, 4, 6]} intensity={1.2} color="#BFDBFE" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#3B82F6" />

      {/* Main Object */}
      <RotatingCube />

      {/* Environment: sleek & neutral (kept 'dawn' as it provides soft highlights) */}
      <Environment preset="dawn" background={false} />

      {/* Smooth camera motion */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.4}
      />
    </Canvas>
  );
};

export default Scene3D;
