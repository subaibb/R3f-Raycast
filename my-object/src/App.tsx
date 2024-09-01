
import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame,useThree } from '@react-three/fiber';
import { OrbitControls} from '@react-three/drei';
import * as THREE from 'three';
import { Vector2 } from 'three';
import { Raycaster,Vector3 } from 'three';


import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";


 export function Globe():JSX.Element{

    const pointsRef = useRef() as React.MutableRefObject<THREE.Points>;
    const sphereRef = useRef() as React.MutableRefObject<THREE.Mesh>;
    const planeRef = useRef() as React.MutableRefObject<THREE.Mesh>;
    const mouse = useRef(new Vector2());
    const { camera } = useThree();
    const radius = 2;
    

  
  
const uniforms = useMemo(() => ({
  uTime: {
    value: 0.0
  },
  uRadius: {
    value: radius
  },
  uMouse: {
    value: new THREE.Vector3()
  },
  uSeed:{
    value: Math.random()
  },
  uDistortion: {
    value: 0.1
  },
  uPositon:{
    value: new THREE.Vector3()
  
  }
  
}), [])




useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);

const raycaster = useRef(new Raycaster());
  useFrame((state, delta) => {
    state;
    uniforms.uTime.value += delta;
    planeRef.current.lookAt(camera.position);
    raycaster.current.setFromCamera(mouse.current, camera);

    const intersects = raycaster.current.intersectObjects([planeRef.current]);
    const rotationSpeed = 0.0003;

    pointsRef.current.geometry.rotateX(rotationSpeed );
    pointsRef.current.geometry.rotateY(rotationSpeed );
    
    if (intersects.length > 0) {
      uniforms.uMouse.value = intersects[0].point;
      sphereRef.current.position.copy(intersects[0].point);
    }else{
      uniforms.uMouse.value = new Vector3(0,0,0);
    }
    
    
    //...do something here
  })



      return (
          <>
        <group>
        <points ref={pointsRef} position={[-0.2,-0.2,-0.2]} >
        <sphereGeometry args={[radius, 164, 164]} />

        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
      
      <mesh ref={planeRef} position={[0,0,1]}  >
        <boxGeometry  args={[12,12,5.1]}  />
        <meshBasicMaterial transparent opacity={0.0}  />
      </mesh>
      </group>  
      <mesh ref={sphereRef}  >
        <sphereGeometry args={[0.1, 32, 32]}  />
        <meshBasicMaterial  />
      </mesh>

      </>


      );
  
}


  export default function Scene() {

    return (
      <Canvas style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#08090B",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0
      }} camera={{ position: [0, 0, -4] }}>
      <ambientLight intensity={0.5} />
      <Globe />
      <OrbitControls
    enableZoom={false}
    enableRotate={false}
      />
    </Canvas>
    )
  }