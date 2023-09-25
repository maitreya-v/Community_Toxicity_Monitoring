import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <mesh>
     <hemisphereLight intensity={0.2}/>
     <directionalLight intensity={10}
     position={[1,0,-2.5]}/>
     {/* <ambientLight intensity={10}/> */}

     


<primitive object={earth.scene} scale={2.5} position-y={-3} rotation-y={-3} />

    </mesh>
    
    
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
     
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 125,
        // near: 0.5,
        far: 100,
        position: [-8, 9, -6],
      }}

    >
  

      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          reverseOrbit
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;