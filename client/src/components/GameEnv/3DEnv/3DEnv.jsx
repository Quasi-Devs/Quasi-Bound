import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { io } from 'socket.io-client';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import card from './cards/scene.gltf';
import table from './models/scene.gltf';
import img from './models/textures/wire_228214153_baseColor.jpeg';
import img2 from './models/textures/wire_228214153_normal.png';
import './3denv.css';

const socket = io();
function Loading() {
  return (
    <mesh rotation={[0, 0, 0]} position={[0, 19, -29]} scale={new THREE.Vector3(5, 5, 5)}>
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
  texture.repeat.set(1.0, 0.6);
  const texture2 = new THREE.TextureLoader().load(img2);
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
  useFrame(({ mouse }) => {
    if (clicked) {
      group.current.rotation.x = 1.5;
      group.current.position.z = (mouse.y + 4) * -2;
      group.current.position.y = (mouse.y + 4) * 2;
      group.current.position.x = (mouse.x - 0.2) * 20;
    } else {
      group.current.rotation.x = 0.9;
    }
  });

  const handleClick = () => setClicker(!clicked);

  const prop = {
    position: [...position],
  };

  prop.position[2] = -10;

  let posit;

  if (!slot) {
    posit = [0, 0, 100];
  }
  posit = posit || position;
  return (
    // Add a ref to the group. This gives us a hook to
    // manipulate the properties of this geometry in the useFrame callback.
    <group ref={group} position={clicked ? prop.position : posit}>
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

const ThreeDEnv = ({ slots, user }) => {
  const [enemyName, setEnemyName] = useState('enemy');
  if (user) {
    socket.emit('Name', user.name_user, user.id);
    socket.on(`${user.id_enemy}Name`, (name) => {
      setEnemyName(name);
    });
  }
  return (
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
            <Loading />
            <Cards position={[6, 2, -13]} slot={slots[3]} />
            <Cards position={[1, 2, -13]} slot={slots[2]} />
            <Cards position={[-4, 2, -13]} slot={slots[1]} />
            <Cards position={[-9, 2, -13]} slot={slots[0]} />
            <Cards position={[-9, 10, -21]} slot={slots[4]} />
            <Cards position={[-4, 10, -21]} slot={slots[5]} />
            <Cards position={[1, 10, -21]} slot={slots[6]} />
            <Cards position={[6, 10, -21]} slot={slots[7]} />
          </Suspense>
        </Canvas>
        <span className="you">{user ? `${user.name_user}: 250` : null}</span>
        <span className="enemy">{`${enemyName}: 250`}</span>
      </div>
    </div>
  );
};
ThreeDEnv.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.bool).isRequired,
  user: PropTypes.element.isRequired,
};

export default ThreeDEnv;
