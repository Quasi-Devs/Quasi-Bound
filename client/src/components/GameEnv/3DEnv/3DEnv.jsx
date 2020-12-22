import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import table from './models/scene.gltf';
import img from './models/textures/wire_228214153_baseColor.jpeg';
import img2 from './models/textures/wire_228214153_normal.png';

function Loading() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function ArWing() {
  const texture = new THREE.TextureLoader().load(img);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.0, 0.6);
  const texture2 = new THREE.TextureLoader().load(img2);
  texture2.wrapS = THREE.RepeatWrapping;
  texture2.wrapT = THREE.RepeatWrapping;
  texture2.repeat.set(1.0, 0.6);
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, table);
  // useFrame will run outside of react in animation frames to optimize updates.
  useFrame(() => {
    group.current.rotation.x = 5.09;
  });
  return (
    // Add a ref to the group. This gives us a hook
    // to manipulate the properties of this geometry in the useFrame callback.
    <group ref={group} position={[-12, -20, -10]}>
      <mesh visible geometry={nodes.mesh_1.geometry}>
        <meshPhongMaterial attach="material" map={texture2} />
      </mesh>
      <mesh visible geometry={nodes.mesh_0.geometry}>
        <meshPhongMaterial attach="material" map={texture} />
      </mesh>
    </group>
  );
}

const ThreeDEnv = () => (
  <div>
    <div style={{ height: window.innerHeight * 0.73 }}>
      <Canvas>
        <color attach="background" args={['gray']} />
        <OrbitControls />
        <directionalLight intensity={0.5} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.9} />
        <Suspense fallback={<Loading />}>
          <ArWing />
        </Suspense>
      </Canvas>
    </div>
  </div>
);

export default ThreeDEnv;
