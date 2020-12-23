/* eslint-disable no-param-reassign */
import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import card from './cards/scene.gltf';
import table from './models/scene.gltf';
import img from './models/textures/wire_228214153_baseColor.jpeg';
import img2 from './models/textures/wire_228214153_normal.png';
import './3denv.css';

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

function Table() {
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
    group.current.rotation.x = 5.5;
  });
  return (
    // Add a ref to the group. This gives us a hook
    // to manipulate the properties of this geometry in the useFrame callback.
    <group ref={group} position={[-12, -17, -23]}>
      <mesh visible geometry={nodes.mesh_1.geometry}>
        <meshPhongMaterial attach="material" map={texture2} />
      </mesh>
      <mesh visible geometry={nodes.mesh_0.geometry}>
        <meshPhongMaterial attach="material" map={texture} />
      </mesh>
    </group>
  );
}

function Cards({ position, slot }) {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, card);
  const [clicked, setClicker] = useState(false);
  // useFrame will run outside of react in animation frames to optimize updates.
  useFrame(() => {
    group.current.rotation.x = 0.9;
  });

  const handleClick = () => setClicker(!clicked);

  const prop = {
    position: [...position],
  };

  prop.position[2] = -10;

  if (slot) {
    position = [0, 0, 100];
  }

  return (
    // Add a ref to the group. This gives us a hook to
    // manipulate the properties of this geometry in the useFrame callback.
    <group ref={group} position={clicked ? prop.position : position}>
      <mesh
        visible
        geometry={nodes.mesh_0.geometry}
        scale={clicked ? new THREE.Vector3(0.04, 0.04, 0.04) : new THREE.Vector3(0.02, 0.02, 0.02)}
        onClick={handleClick}
      >
        <meshPhongMaterial attach="material" color="gold" />
      </mesh>
    </group>
  );
}
Cards.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  slot: PropTypes.bool.isRequired,
};

const ThreeDEnv = ({ slots }) => (
  <div>
    <div style={{ height: window.innerHeight * 0.73 }}>
      <Canvas>
        <color attach="background" args={['gray']} />
        <OrbitControls />
        <directionalLight intensity={0.5} />
        <ambientLight intensity={0.5} />
        <spotLight position={[20, 20, 10]} angle={0.9} />
        <Suspense fallback={<Loading />}>
          <Table />
          <Cards position={[6, 2, -13]} slot={slots[3]} />
          <Cards position={[1, 2, -13]} slot={slots[2]} />
          <Cards position={[-4, 2, -13]} slot={slots[1]} />
          <Cards position={[-9, 2, -13]} slot={slots[0]} />
          <Cards position={[-9, 10, -21]} />
          <Cards position={[-4, 10, -21]} />
          <Cards position={[1, 10, -21]} />
          <Cards position={[6, 10, -21]} />
        </Suspense>
      </Canvas>
      <span className="you">30</span>
      <span className="enemy">30</span>
    </div>
  </div>
);
ThreeDEnv.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default ThreeDEnv;
