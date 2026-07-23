"use client";

import { Float, Html, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { landmarks, playerStart, type Landmark, type LandmarkId } from "./content";

export type MoveControls = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

export type NearbyTargetId = LandmarkId | "record";

type ThreeBlogSceneProps = {
  controls: MutableRefObject<MoveControls>;
  reducedMotion: boolean;
  lowPowerMode: boolean;
  visitedIds: LandmarkId[];
  onMovementBlocked: () => void;
  onNearbyChange: (id: NearbyTargetId | null) => void;
  onOpenCompletion: () => void;
  onPositionChange: (position: { x: number; z: number }) => void;
  onSelect: (id: LandmarkId) => void;
  fallback: React.ReactNode;
};

const ISLAND_RADIUS_X = 21.5;
const ISLAND_RADIUS_Z = 16;
const LANDMARK_COLLISION_RADIUS = 3.15;

function isWalkable(x: number, z: number) {
  const insideIsland =
    (x * x) / (ISLAND_RADIUS_X * ISLAND_RADIUS_X) +
      (z * z) / (ISLAND_RADIUS_Z * ISLAND_RADIUS_Z) <=
    1;

  if (!insideIsland) return false;

  return landmarks.every((landmark) => {
    const dx = x - landmark.position[0];
    const dz = z - landmark.position[2];
    return Math.hypot(dx, dz) >= LANDMARK_COLLISION_RADIUS;
  });
}

const TREE_POSITIONS: Array<[number, number, number, number]> = [
  [-22, 0, 0, 0.9],
  [-20.3, 0, 6.5, 1.15],
  [-8.4, 0, 15.7, 0.8],
  [0, 0, 17, 1.05],
  [8.4, 0, 15.7, 0.85],
  [20.3, 0, 6.5, 1.2],
  [22, 0, 0, 0.8],
  [20.3, 0, -6.5, 1],
  [8.4, 0, -15.7, 0.9],
  [0, 0, -17, 1.15],
  [-8.4, 0, -15.7, 0.82],
  [-20.3, 0, -6.5, 0.9],
];

function LowPolyTree({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 2, 6]} />
        <meshStandardMaterial color="#85583d" roughness={1} />
      </mesh>
      <mesh position={[0, 2.35, 0]} rotation={[0.1, 0.25, -0.08]}>
        <dodecahedronGeometry args={[1.25, 0]} />
        <meshStandardMaterial color="#258b63" roughness={0.9} />
      </mesh>
      <mesh position={[-0.65, 2.15, 0.25]}>
        <dodecahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial color="#36a872" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Cloud({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <Float speed={0.35} rotationIntensity={0.05} floatIntensity={0.35}>
      <group position={position} scale={scale}>
        {[
          [-1.1, 0, 0, 0.9],
          [0, 0.2, 0, 1.15],
          [1.1, -0.05, 0, 0.75],
        ].map(([x, y, z, size], index) => (
          <mesh key={index} position={[x, y, z]}>
            <dodecahedronGeometry args={[size, 1]} />
            <meshStandardMaterial color="#eefbf7" transparent opacity={0.82} roughness={1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Building({ landmark }: { landmark: Landmark }) {
  if (landmark.id === "career") {
    return (
      <group>
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[3.3, 2.5, 3.3]} />
          <meshStandardMaterial color={landmark.color} roughness={0.78} />
        </mesh>
        <mesh position={[0.4, 3.1, -0.15]}>
          <boxGeometry args={[2.15, 1.25, 2.4]} />
          <meshStandardMaterial color={landmark.accent} roughness={0.7} />
        </mesh>
        {[-0.75, 0.15, 1.05].map((x) => (
          <mesh key={x} position={[x, 1.35, 1.68]}>
            <boxGeometry args={[0.48, 0.7, 0.08]} />
            <meshStandardMaterial color="#24344c" emissive="#24344c" emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
    );
  }

  if (landmark.id === "tech") {
    return (
      <group>
        <mesh position={[0, 1.45, 0]} rotation={[0, Math.PI / 4, 0]}>
          <octahedronGeometry args={[2.25, 0]} />
          <meshStandardMaterial color={landmark.color} roughness={0.55} metalness={0.08} />
        </mesh>
        <mesh position={[0, 3.2, 0]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color={landmark.accent} emissive={landmark.accent} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.35, 0.12, 6, 24]} />
          <meshStandardMaterial color="#b9ccff" emissive="#4169e1" emissiveIntensity={0.35} />
        </mesh>
      </group>
    );
  }

  if (landmark.id === "portfolio") {
    return (
      <group>
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[4, 2.5, 3]} />
          <meshStandardMaterial color={landmark.color} roughness={0.82} />
        </mesh>
        <mesh position={[0, 2.75, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshStandardMaterial color={landmark.accent} roughness={0.75} />
        </mesh>
        <mesh position={[0, 1.05, 1.56]}>
          <boxGeometry args={[1.1, 1.6, 0.1]} />
          <meshStandardMaterial color="#25314d" />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[2.2, 2.6, 2.4, 6]} />
        <meshStandardMaterial color={landmark.color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.8, 0]} rotation={[0, Math.PI / 6, 0]}>
        <coneGeometry args={[2.55, 1.8, 6]} />
        <meshStandardMaterial color={landmark.accent} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.05, 2.1]}>
        <boxGeometry args={[0.9, 1.45, 0.12]} />
        <meshStandardMaterial color="#27304a" />
      </mesh>
    </group>
  );
}

function LandmarkBuilding({
  landmark,
  reducedMotion,
  onSelect,
}: {
  landmark: Landmark;
  reducedMotion: boolean;
  onSelect: (id: LandmarkId) => void;
}) {
  const beacon = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!beacon.current || reducedMotion) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.8 + landmark.position[0]) * 0.035;
    beacon.current.scale.setScalar(pulse);
  });

  return (
    <group
      position={[landmark.position[0], landmark.position[1] + 0.45, landmark.position[2]]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(landmark.id);
      }}
    >
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[3.6, 3.9, 0.35, 12]} />
        <meshStandardMaterial color="#f5f1d8" roughness={1} />
      </mesh>
      <mesh ref={beacon} position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.25, 0.055, 5, 32]} />
        <meshBasicMaterial color={landmark.color} transparent opacity={0.72} />
      </mesh>
      <Float
        speed={reducedMotion ? 0 : 1.4}
        floatIntensity={reducedMotion ? 0 : 0.12}
        rotationIntensity={0}
      >
        <Building landmark={landmark} />
      </Float>
      <Html center position={[0, 5.1, 0]} distanceFactor={14} wrapperClass="tb-world-label-wrap">
        <button className="tb-world-label" type="button" onClick={() => onSelect(landmark.id)}>
          <span>{landmark.eyebrow}</span>
          {landmark.label}
        </button>
      </Html>
    </group>
  );
}

function RecordHub({
  visitedIds,
  reducedMotion,
  onOpenCompletion,
}: {
  visitedIds: LandmarkId[];
  reducedMotion: boolean;
  onOpenCompletion: () => void;
}) {
  const completed = visitedIds.length === landmarks.length;

  return (
    <group position={[0, 0.56, 0]}>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[2.55, 2.8, 0.08, 12]} />
        <meshStandardMaterial color="#eee3c7" roughness={1} />
      </mesh>
      {landmarks.map((landmark, index) => {
        const angle = (index / landmarks.length) * Math.PI * 2 - Math.PI / 4;
        const active = visitedIds.includes(landmark.id);

        return (
          <mesh
            key={landmark.id}
            position={[Math.cos(angle) * 1.75, 0.12, Math.sin(angle) * 1.75]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.72, 0.08, 1.22]} />
            <meshStandardMaterial
              color={active ? landmark.color : "#9eaa91"}
              emissive={active ? landmark.color : "#000000"}
              emissiveIntensity={active ? 0.38 : 0}
              roughness={0.78}
            />
          </mesh>
        );
      })}
      <Float
        speed={reducedMotion ? 0 : 1.15}
        floatIntensity={reducedMotion ? 0 : 0.18}
        rotationIntensity={reducedMotion ? 0 : 0.08}
      >
        <mesh position={[0, 3.85, 0]} rotation={[0, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.78, 0]} />
          <meshStandardMaterial
            color={completed ? "#fff6c4" : "#d7dec8"}
            emissive={completed ? "#ffcb5c" : "#48636b"}
            emissiveIntensity={completed ? 0.8 : 0.12}
            roughness={0.55}
          />
        </mesh>
      </Float>
      <Html center position={[0, 5.25, 0]} distanceFactor={14} wrapperClass="tb-world-label-wrap">
        <button
          className={`tb-world-label tb-record-label${completed ? " is-complete" : ""}`}
          type="button"
          disabled={!completed}
          onClick={onOpenCompletion}
        >
          <span>Explorer record</span>
          {completed ? "완주 기록 열기" : `탐험 기록 ${visitedIds.length} / ${landmarks.length}`}
        </button>
      </Html>
    </group>
  );
}

function Player({
  controls,
  onMovementBlocked,
  onNearbyChange,
  onPositionChange,
  recordAvailable,
}: {
  controls: MutableRefObject<MoveControls>;
  onMovementBlocked: () => void;
  onNearbyChange: (id: NearbyTargetId | null) => void;
  onPositionChange: (position: { x: number; z: number }) => void;
  recordAvailable: boolean;
}) {
  const player = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);
  const lastNearby = useRef<NearbyTargetId | null>(null);
  const lastPositionUpdate = useRef(0);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const cameraPosition = useMemo(() => new THREE.Vector3(), []);
  const cameraOffset = useMemo(() => new THREE.Vector3(9.5, 11, 15.5), []);
  const targetOffset = useMemo(() => new THREE.Vector3(0, 1.2, 0), []);

  useFrame(({ camera, clock }, delta) => {
    if (!player.current) return;

    const input = controls.current;
    direction.set(
      Number(input.right) - Number(input.left),
      0,
      Number(input.backward) - Number(input.forward),
    );

    const moving = direction.lengthSq() > 0;
    if (moving) {
      direction.normalize();
      const step = Math.min(delta, 0.05) * 8;
      const nextX = player.current.position.x + direction.x * step;
      const nextZ = player.current.position.z + direction.z * step;
      let moved = false;

      if (isWalkable(nextX, player.current.position.z)) {
        player.current.position.x = nextX;
        moved = moved || direction.x !== 0;
      }
      if (isWalkable(player.current.position.x, nextZ)) {
        player.current.position.z = nextZ;
        moved = moved || direction.z !== 0;
      }
      if (!moved) onMovementBlocked();
      player.current.rotation.y = THREE.MathUtils.damp(
        player.current.rotation.y,
        Math.atan2(direction.x, direction.z),
        12,
        delta,
      );
    }

    const stride = moving ? Math.sin(clock.elapsedTime * 11) * 0.65 : 0;
    if (leftArm.current) leftArm.current.rotation.x = THREE.MathUtils.damp(leftArm.current.rotation.x, stride, 15, delta);
    if (rightArm.current) rightArm.current.rotation.x = THREE.MathUtils.damp(rightArm.current.rotation.x, -stride, 15, delta);
    if (leftLeg.current) leftLeg.current.rotation.x = THREE.MathUtils.damp(leftLeg.current.rotation.x, -stride, 15, delta);
    if (rightLeg.current) rightLeg.current.rotation.x = THREE.MathUtils.damp(rightLeg.current.rotation.x, stride, 15, delta);

    cameraPosition.copy(player.current.position).add(cameraOffset);
    camera.position.lerp(cameraPosition, 1 - Math.exp(-delta * 3.5));
    cameraTarget.copy(player.current.position).add(targetOffset);
    camera.lookAt(cameraTarget);

    if (clock.elapsedTime - lastPositionUpdate.current > 0.12) {
      lastPositionUpdate.current = clock.elapsedTime;
      onPositionChange({
        x: player.current.position.x,
        z: player.current.position.z,
      });
    }

    let nearby: NearbyTargetId | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const landmark of landmarks) {
      const dx = player.current.position.x - landmark.position[0];
      const dz = player.current.position.z - landmark.position[2];
      const distance = Math.hypot(dx, dz);
      if (distance < 4.3 && distance < nearestDistance) {
        nearby = landmark.id;
        nearestDistance = distance;
      }
    }

    if (recordAvailable) {
      const recordDistance = Math.hypot(player.current.position.x, player.current.position.z);
      if (recordDistance < 4.2 && recordDistance < nearestDistance) {
        nearby = "record";
      }
    }

    if (nearby !== lastNearby.current) {
      lastNearby.current = nearby;
      onNearbyChange(nearby);
    }
  });

  return (
    <group ref={player} position={playerStart}>
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.65, 0.9, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <group position={[0, 1.15, 0]}>
        <mesh position={[0, 1.48, 0]}>
          <sphereGeometry args={[0.48, 12, 8]} />
          <meshStandardMaterial color="#efb18a" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.78, -0.06]} rotation={[0.12, 0, 0]}>
          <sphereGeometry args={[0.43, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#172036" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.72, 0]}>
          <boxGeometry args={[0.85, 1.15, 0.48]} />
          <meshStandardMaterial color="#2865d9" roughness={0.75} />
        </mesh>
        <mesh ref={leftArm} position={[-0.58, 0.78, 0]}>
          <boxGeometry args={[0.24, 1.05, 0.26]} />
          <meshStandardMaterial color="#efb18a" roughness={0.9} />
        </mesh>
        <mesh ref={rightArm} position={[0.58, 0.78, 0]}>
          <boxGeometry args={[0.24, 1.05, 0.26]} />
          <meshStandardMaterial color="#efb18a" roughness={0.9} />
        </mesh>
        <mesh ref={leftLeg} position={[-0.23, -0.12, 0]}>
          <boxGeometry args={[0.32, 1.05, 0.36]} />
          <meshStandardMaterial color="#172036" roughness={0.88} />
        </mesh>
        <mesh ref={rightLeg} position={[0.23, -0.12, 0]}>
          <boxGeometry args={[0.32, 1.05, 0.36]} />
          <meshStandardMaterial color="#172036" roughness={0.88} />
        </mesh>
      </group>
    </group>
  );
}

function World({
  controls,
  reducedMotion,
  visitedIds,
  onMovementBlocked,
  onNearbyChange,
  onOpenCompletion,
  onPositionChange,
  onSelect,
}: Omit<ThreeBlogSceneProps, "fallback">) {
  return (
    <>
      <color attach="background" args={["#74c8c4"]} />
      <fog attach="fog" args={["#74c8c4", 32, 68]} />
      <hemisphereLight args={["#effffa", "#355e52", 2.1]} />
      <directionalLight position={[8, 18, 10]} intensity={2.4} color="#fff4d6" />

      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[160, 160]} />
        <meshStandardMaterial color="#258fab" roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.25, 0]} scale={[1, 1, 0.78]}>
        <cylinderGeometry args={[23.4, 25.5, 1.15, 16]} />
        <meshStandardMaterial color="#35775c" roughness={1} />
      </mesh>
      <mesh position={[0, 0.36, 0]} scale={[1, 1, 0.78]}>
        <cylinderGeometry args={[23.3, 23.65, 0.18, 16]} />
        <meshStandardMaterial color="#7cbf6d" roughness={1} />
      </mesh>

      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[5, 0.12, 34]} />
        <meshStandardMaterial color="#e9ddbd" roughness={1} />
      </mesh>
      <mesh position={[0, 0.53, 0]}>
        <boxGeometry args={[36, 0.12, 4.7]} />
        <meshStandardMaterial color="#e9ddbd" roughness={1} />
      </mesh>
      <mesh position={[0, 0.55, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.28, 1, 1]}>
        <ringGeometry args={[7.3, 8.2, 64]} />
        <meshStandardMaterial color="#ddcfad" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[4.4, 4.4, 0.1, 16]} />
        <meshStandardMaterial color="#f4ebcf" roughness={1} />
      </mesh>

      <RecordHub
        visitedIds={visitedIds}
        reducedMotion={reducedMotion}
        onOpenCompletion={onOpenCompletion}
      />

      {TREE_POSITIONS.map(([x, y, z, scale]) => (
        <LowPolyTree key={`${x}-${z}`} position={[x, y + 0.45, z]} scale={scale} />
      ))}

      {landmarks.map((landmark) => (
        <LandmarkBuilding
          key={landmark.id}
          landmark={landmark}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
        />
      ))}

      {!reducedMotion && (
        <>
          <Cloud position={[-19, 12, -19]} scale={1.25} />
          <Cloud position={[19, 15, -15]} scale={0.9} />
          <Cloud position={[24, 11, 10]} scale={0.7} />
          <Sparkles count={38} scale={[50, 14, 42]} size={1.7} speed={0.18} opacity={0.3} color="#ffffff" />
        </>
      )}

      <Player
        controls={controls}
        onMovementBlocked={onMovementBlocked}
        onNearbyChange={onNearbyChange}
        onPositionChange={onPositionChange}
        recordAvailable={visitedIds.length === landmarks.length}
      />
    </>
  );
}

export default function ThreeBlogScene({
  controls,
  reducedMotion,
  lowPowerMode,
  visitedIds,
  onMovementBlocked,
  onNearbyChange,
  onOpenCompletion,
  onPositionChange,
  onSelect,
  fallback,
}: ThreeBlogSceneProps) {
  return (
    <Canvas
      role="region"
      aria-label="김성재의 작업 세계를 탐색하는 3D 장면"
      aria-describedby="three-blog-controls"
      camera={{ position: [9.5, 11, 27.5], fov: 42, near: 0.1, far: 140 }}
      dpr={lowPowerMode ? 1 : [1, 1.5]}
      fallback={fallback}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      performance={{ min: 0.6 }}
    >
      <World
        controls={controls}
        reducedMotion={reducedMotion}
        lowPowerMode={lowPowerMode}
        visitedIds={visitedIds}
        onMovementBlocked={onMovementBlocked}
        onNearbyChange={onNearbyChange}
        onOpenCompletion={onOpenCompletion}
        onPositionChange={onPositionChange}
        onSelect={onSelect}
      />
    </Canvas>
  );
}
