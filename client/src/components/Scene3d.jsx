import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

const RotatingCube = () => {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5);


    // Define 8 unique cube corners by index (bitmask: x,y,z > 0)
    // We'll make corners 0,1,2 black — others blue
    const cornerColors = [
      new THREE.Color(0x000000), // 000 -> black
      new THREE.Color(0x000000), // 100 -> black
      new THREE.Color(0x000000), // 100 -> black
      new THREE.Color(0x000000), // 010 -> black
      new THREE.Color("#2563EB"), // 110
      new THREE.Color(0x000000), // 010 -> black
      new THREE.Color("#2563EB"), // 110
      new THREE.Color(0x000000), // 010 -> black
    ];

    const pos = geo.attributes.position;
    const colors = [];

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      const cornerIndex = (x > 0 ? 1 : 0) + (y > 0 ? 2 : 0) + (z > 0 ? 4 : 0);

      const c = cornerColors[cornerIndex];
      colors.push(c.r, c.g, c.b);
    }

    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.004;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial vertexColors metalness={0.4} roughness={0.6} />
    </mesh>
  );
};

const Scene3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 6]} intensity={1.2} />
      <pointLight position={[-5, -5, 5]} intensity={1.0} />

      <RotatingCube />

      <Environment preset="dawn" background={false} />

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
