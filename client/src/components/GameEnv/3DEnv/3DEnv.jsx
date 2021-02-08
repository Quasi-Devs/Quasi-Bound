import React, {
  Suspense, useRef, useState, useEffect,
} from 'react';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { Canvas as CanvasCSS3D, useThree as useThreeCSS3D, useFrame as CSSFrame } from 'react-three-fiber/css3d';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { makeStyles } from '@material-ui/core/styles';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { io } from 'socket.io-client';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import table from './models/scene.gltf';
import backgroundImg from '../../../models/gameplay-background.gif';
import './3denv.css';
import '../2DEnv/2denv.css';

function DOMObject({
  dom, position, scale, color, rotation, slot, clicked, index, opaque, setOpaque,
}) {
  const { scene } = useThreeCSS3D();
  const ref = useRef(CSS3DObject);
  const pos = position;
  let rot = rotation;
  let elevated = false;
  const opacity = opaque;
  const currentpos = position[1] * 10;
  CSSFrame(({ mouse }) => {
    if (slot.point_health && slot.point_health !== undefined) {
      if (slot && slot.point_health <= 0 && opacity[index] !== 0) {
        opacity[index] -= 5;
        setOpaque({ ...opacity });
      } else if (slot && slot.point_health > 0 && opacity[index] !== 100) {
        opacity[index] = 100;
        setOpaque({ ...opacity });
      }
    }
    if ((slot && slot.description.includes('Fly') && !clicked) || (slot && !slot.is_character)) {
      ref.current.castShadow = true;
      if (ref.current.position.y >= currentpos + 200) {
        elevated = true;
      }
      if (ref.current.position.y >= currentpos) {
        if (elevated) {
          if (!slot.is_character) {
            ref.current.position.y -= 0;
          } else {
            ref.current.position.y -= 1;
          }
          if (ref.current.position.y === currentpos + 100) {
            elevated = false;
          }
        } else if (!slot.is_character) {
          ref.current.position.y += 4;
        } else {
          ref.current.position.y += 1;
        }
      }
    }
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

  const posit = position || [-9, 2, -13];
  const newPos = new THREE.Vector3(posit[0] * 90, posit[1] * 10, posit[2] * 140);
  const newRot = new THREE.Euler(rot[0], rot[1], rot[2]);
  useEffect(() => {
    ref.current = new CSS3DObject(dom.current);
    ref.current.position.copy(newPos);
    ref.current.scale.copy(scale);
    ref.current.rotation.copy(newRot);
    scene.add(ref.current);
    return () => scene.remove(ref.current);
  }, [dom, scene, position, scale, rotation, color]);
  return null;
}

const socket = io();

function Table() {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, table);
  useFrame(() => {
    group.current.rotation.x = 5.5;
  });
  return (
    <group ref={group} position={[-12, -17, -23]}>
      <mesh visible geometry={nodes.mesh_1.geometry}>
        <meshPhongMaterial attach="material" color="rgb(36, 240, 236)" />
      </mesh>
      <mesh visible geometry={nodes.mesh_0.geometry}>
        <meshPhongMaterial attach="material" color="rgb(133, 104, 17)" />
      </mesh>
    </group>
  );
}

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

const opa = {
};

const ThreeDEnv = ({
  slots, user, enemyHP, HP, done, spellSlot, clicked, placeCard,
}) => {
  const [clicks, setClick] = useState({});
  const [enemyName, setEnemyName] = useState('enemy');
  const [background, setBackground] = useState(false);
  const [enemyImage, setEnemyImage] = useState('https://media1.giphy.com/media/gZfJz3u1OS1I4/giphy.gif');
  const [opaque, setOpaque] = useState({
    0: 100, 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100,
  });

  const spell = useRef(null);
  const refs = [useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [cameraY] = useState(30);
  const positions = [[-9, 2, -13], [-4, 2, -13], [1, 2, -13], [6, 2, -13],
    [-9, 75, -21], [-4, 75, -21], [1, 75, -21], [6, 75, -21]];
  socket.on(`${user.id_enemy}Name`, async (name) => {
    setEnemyName(name);
  });
  socket.on(`${user.id_enemy}Image`, async (image) => {
    if (!image.includes('null')) {
      setEnemyImage(image);
    }
  });

  function User() {
    const texture = useLoader(THREE.TextureLoader, enemyImage);
    return (
      <mesh rotation={[0, 29.9, 0]} position={[0, 19, -29]} scale={new THREE.Vector3(5, 5, 5)}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshLambertMaterial
          attach="material"
          color="white"
          roughness={1}
          metalness={0}
          map={texture}
        />
      </mesh>
    );
  }

  useEffect(() => {
    socket.emit('Name', user.name_user, user.id);
    socket.emit('Image', user.thumbnail, user.id);
  }, [slots, user, enemyHP, HP]);
  const useStyles = makeStyles({
    doneIcon: {
      backgroundImage: background,
      width: window.innerWidth - 200,
      height: window.innerHeight,
      position: 'absolute',
      zIndex: 1,
      marginLeft: '10%',
      marginBottom: '100%',
    },
  });
  slots.forEach((slot, i) => {
    opa[`opacity${i}`] = { opacity: `${opaque[i]}%` };
  });
  const cardStyles = makeStyles(opa);
  const classes = useStyles();
  const cardClasses = cardStyles();
  const spellAttributes = spellSlot ? spellSlot.description.split('/')[0] : spellSlot.description;
  const spellLore = spellSlot && spellSlot.description.split('/')[1];
  return (
    <>
      <div>
        {
         background && <div className={classes.doneIcon} />
        }
        <div style={{
          height: window.innerHeight * 0.73, backgroundImage: `url(${backgroundImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
        }}
        >
          <Canvas>
            <directionalLight intensity={0.5} />
            <ambientLight intensity={0.5} />
            <spotLight position={[20, 20, 10]} angle={0.9} />
            <Suspense fallback={<Loading />}>
              <Table />
              <User />
            </Suspense>
          </Canvas>
          <CanvasCSS3D
            style={{
              position: 'absolute', top: '0', height: window.innerHeight * 0.73, width: '98%', right: 0,
            }}
            camera={{ position: [0, cameraY, 150] }}
          >
            {
              slots.map((slot, i) => {
                if (!clicks[i]) {
                  clicks[i] = false;
                }
                // console.log(positions[i]);
                return (
                  <DOMObject
                    dom={refs[i]}
                    position={positions[i]}
                    scale={new THREE.Vector3(1.3, 1.3, 1.3)}
                    color={new THREE.Color()}
                    rotation={[-0.9, 0, 0]}
                    slot={slot}
                    key={String(i)}
                    index={i}
                    opaque={opaque}
                    setOpaque={setOpaque}
                    clicked={clicks[i]}
                  />
                );
              })
            }
            <DOMObject
              dom={spell}
              position={[0, 4, -4]}
              scale={new THREE.Vector3(1.6, 1.6, 1.6)}
              rotation={[-0.2, 0, 0]}
              slot={spellSlot}
            />
          </CanvasCSS3D>
          {
              slots.map((slot, i) => {
                const attributes = slot ? slot.description.split('/')[0] : slot.description;
                const lore = slot && slot.description.split('/')[1];
                return (
                  <div styles={{ width: '1px', height: '1px', border: 'solid 2px black' }} key={String(i)}>
                    {
                      !slot ? (
                        // Add click event to place card
                        <div
                          ref={refs[i]}
                          onClick={() => {
                            if (i <= 3) {
                              placeCard(slot, i);
                            }
                          }}
                          className="hover-station"
                        >
                          {' '}
                        </div>
                      ) : (
                        <div
                          aria-hidden="true"
                          className={`${clicks[i] ? 'hover-station' : 'hover'} card_background ${cardClasses[`opacity${i}`]}`}
                          ref={refs[i]}
                          onClick={() => {
                            if (!clicked.is_character && clicked.title) {
                              placeCard(slot, i);
                            }
                            const replacement = clicks;
                            replacement[i] = !replacement[i];
                            setClick({ ...replacement });
                          }}
                        >
                          <div className="hover_title">{slot.title}</div>
                          <div className="hover_resource">{`cost: ${slot.point_resource}`}</div>
                          <img className="hover_img" src={slot.thumbnail} alt="thumbnail" />
                          <div className="top_stats">
                            <div className="stat">
                              <img src="https://cdn4.iconfinder.com/data/icons/ancient-greece/48/Greek_Mythology-15-512.png" alt="attack thumb" width="25" height="25" />
                              <span className="downwards">
                                {
                          ` ${slot.point_attack || 0}`
                }
                              </span>
                            </div>
                            <div className="stat">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-y46uQBifR87p1-kh4s0Lgp4jSFqA2ZM9ZQ&usqp=CAU" alt="attack thumb" width="22" height="22" />
                              {
                            ` ${slot.point_health || 0}`
                }
                            </div>
                            <div className="stat">
                              <img src="https://static.thenounproject.com/png/1162-200.png" alt="attack thumb" width="22" height="22" />
                              {
                            ` ${slot.point_armor || 0}`
                          }
                            </div>
                          </div>
                          <div className="is_character">{slot.is_character ? `Character - ${slot.size || 'default'}` : 'Spell' }</div>
                          <div className="hover_stats">{attributes}</div>
                          <hr />
                          <div className="hover_lore"><i>{lore || null}</i></div>
                        </div>
                      )
                    }

                  </div>
                );
              })
            }
          <div styles={{ width: '1px', height: '1px' }}>
            {
              !spellSlot.title ? (<div ref={spell} className="slot_background">{' '}</div>) : (
                <div
                  aria-hidden="true"
                  className="hover card_background"
                  ref={spell}
                >
                  <div className="hover_title">{spellSlot.title}</div>
                  <div className="hover_resource">{`cost: ${spellSlot.point_resource}`}</div>
                  <img className="hover_img" src={spellSlot.thumbnail} alt="thumbnail" />
                  <div className="top_stats">
                    <div className="stats">
                      {' '}
                    </div>
                  </div>
                  <div className="is_character">{spellSlot.is_character ? `Character - ${spellSlot.size}` : 'Spell' }</div>
                  <div className="hover_stats">{spellAttributes}</div>
                  <hr />
                  <div className="hover_lore"><i>{spellLore || null}</i></div>
                </div>
              )
            }
          </div>
          <span className="you">
            <p>
              {`${user.name_user}: `}
              <p className={(HP > 167) ? 'good' : 'okay'}>{HP}</p>
              <p className="bad">{(HP > 83) ? null : HP}</p>
            </p>
          </span>
          <span className="spell">{spellSlot ? `${enemyName} used spell` : null}</span>
          {(HP <= 0 && done) ? (
            <>
              {(HP <= 0 && enemyHP <= 0 && done) ? (
                <>
                  <span className="Done">Tie</span>
                </>
              ) : (
                <>
                  { !background && setBackground('url(https://static.wixstatic.com/media/d5fe05_38421c1389974763ae998de5958b0f93~mv2.gif)') }
                  <span className="Done">Lose</span>
                </>
              )}
            </>
          ) : null}
          {(enemyHP <= 0 && done) ? (
            <>
              {(HP <= 0 && enemyHP <= 0 && done) ? (
                <>
                  <span className="Done">Tie</span>
                </>
              ) : (
                <>
                  { !background && setBackground('url(https://i.gifer.com/ZGYq.gif)') }
                  <span className="Done">Win</span>
                </>
              )}
            </>
          ) : null}
          <span className="enemy">
            <p>
              {`${enemyName}: `}
              <p className={(enemyHP > 167) ? 'good' : 'okay'}>{enemyHP}</p>
              <p className="bad">{(enemyHP > 83) ? null : enemyHP}</p>
            </p>
          </span>
        </div>
      </div>
    </>
  );
};
ThreeDEnv.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.bool).isRequired,
  user: PropTypes.shape({
    name_user: PropTypes.string,
    id: PropTypes.number,
    area: PropTypes.string,
    description: PropTypes.string,
    total_win: PropTypes.number,
    total_games: PropTypes.number,
    count_rating: PropTypes.number,
    thumbnail: PropTypes.string,
    id_enemy: PropTypes.number,
  }).isRequired,
  enemyHP: PropTypes.number.isRequired,
  HP: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  spellSlot: PropTypes.bool.isRequired,
  clicked: PropTypes.bool.isRequired,
  placeCard: PropTypes.func.isRequired,
};

export default ThreeDEnv;
