import React, {
  Suspense, useRef, useState, useEffect,
} from 'react';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { Canvas as CanvasCSS3D, useThree as useThreeCSS3D, useFrame as CSSFrame } from 'react-three-fiber/css3d';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { io } from 'socket.io-client';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import table from './models/scene.gltf';
import img from './models/textures/wire_228214153_baseColor.jpeg';
import img2 from './models/textures/wire_228214153_normal.png';
import './3denv.css';
import '../2DEnv/2denv.css';

function DOMObject({
  dom, position, scale, rotation, slot, clicked,
}) {
  const { scene } = useThreeCSS3D();
  const ref = useRef(CSS3DObject);
  const pos = position;
  let rot = rotation;
  CSSFrame(({ mouse }) => {
    if (clicked) {
      rot = [1.5, 0, 0];
      ref.current.rotation.x = 0.1;
      ref.current.position.x = (mouse.x - 0.2) * 500;
      ref.current.position.y = (mouse.y + 4) * 100;
      ref.current.position.z = (mouse.y + 4) * -100;
    } else {
      rot = [-0.9, 0, 0];
    }
  });
  if (clicked) {
    rot = [0.5, 0, 0];
    pos[2] = (pos[2] + 4) / 2;
    pos[1] = (pos[1] + 4) * 2;
    pos[0] = (pos[0] - 0.2) / 4;
  }
  const prop = {
    position: [...position],
  };

  prop.position[2] = -10;

  let posit;

  if (!slot) {
    posit = [0, 0, 100];
  }
  posit = posit || position;
  const newPos = new THREE.Vector3(posit[0] * 75, posit[1] * 10, posit[2] * 140);
  const newRot = new THREE.Euler(rot[0], rot[1], rot[2]);
  useEffect(() => {
    ref.current = new CSS3DObject(dom.current);
    ref.current.position.copy(newPos);
    ref.current.scale.copy(scale);
    ref.current.rotation.copy(newRot);
    scene.add(ref.current);
    return () => scene.remove(ref.current);
  }, [dom, scene, position, scale, rotation]);
  return null;
}

const socket = io.connect('', {
  transports: ['websocket'],
});
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
  useFrame(() => {
    group.current.rotation.x = 5.5;
  });
  return (
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

const ThreeDEnv = ({
  slots, user, enemyHP, HP,
}) => {
  const [clicks, setClick] = useState({});
  const [enemyName, setEnemyName] = useState('enemy');

  const refs = [useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [cameraY] = useState(30);
  const positions = [[-9, 2, -13], [-4, 2, -13], [1, 2, -13], [6, 2, -13],
    [-9, 75, -21], [-4, 75, -21], [1, 75, -21], [6, 75, -21]];
  if (user) {
    socket.emit('Name', user.name_user, user.id);
    socket.on(`${user.id_enemy}Name`, (name) => {
      setEnemyName(name);
    });
  }
  return (
    <>
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
            </Suspense>
          </Canvas>
          <CanvasCSS3D
            style={{ position: 'absolute', top: '0', height: window.innerHeight * 0.73 }}
            camera={{ position: [0, cameraY, 150] }}
          >
            {
              slots.map((slot, i) => {
                if (!clicks[i]) {
                  clicks[i] = false;
                }
                return (
                  <>
                    <DOMObject
                      dom={refs[i]}
                      position={positions[i]}
                      scale={new THREE.Vector3(1.3, 1.3, 1.3)}
                      rotation={[-0.9, 0, 0]}
                      slot={slot}
                      clicked={clicks[i]}
                    />
                  </>
                );
              })
            }
          </CanvasCSS3D>
          {
              slots.map((slot, i) => (
                <div styles={{ width: '1px', height: '1px' }}>
                  <div
                    aria-hidden="true"
                    className="hover"
                    ref={refs[i]}
                    onClick={() => {
                      const replacement = clicks;
                      replacement[i] = !replacement[i];
                      setClick({ ...replacement });
                    }}
                  >
                    <div className="hover_title">{slot.title}</div>
                    <div className="hover_resource">{`cost: ${slot.point_resource}`}</div>
                    <img className="hover_img" src={slot.thumbnail} alt="thumbnail" />
                    <div className="hover_stats">
                      <div>
                        {
                      `ATTACK: ${slot.point_attack || 0}`
                      }
                      </div>
                      <div>
                        {
                        `HEALTH: ${slot.point_health || 0}`
                      }
                      </div>
                      <div>
                        {
                        `DEFENSE: ${slot.point_armor || 0}`
                      }
                      </div>
                    </div>
                    <div className="hover_stats">{slot.is_character ? 'Character' : 'Spell' }</div>
                    <div className="hover_stats">{slot.description}</div>
                  </div>
                </div>
              ))
            }
          <span className="you">{user ? `${user.name_user}: ${HP}` : null}</span>
          <span className="enemy">{`${enemyName}: ${enemyHP}`}</span>
        </div>
      </div>
    </>
  );
};
ThreeDEnv.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.bool).isRequired,
  user: PropTypes.element.isRequired,
  enemyHP: PropTypes.element.isRequired,
  HP: PropTypes.element.isRequired,
};

export default ThreeDEnv;
