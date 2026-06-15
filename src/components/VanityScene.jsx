import React from 'react';
import * as THREE from 'three';
import { Environment, MeshReflectorMaterial } from '@react-three/drei';

export default function VanityScene({ stations, basinColor, faucetFinish, wallColor }) {
  const spacing = 1.3;
  const startX = -(stations - 1) * spacing / 2;

  const isMatteBlack = faucetFinish.code === 'MATBLK';
  const isGold = faucetFinish.code === 'GOLD';

  return (
    <group>
      
      <ambientLight intensity={0.5} />

      
      <directionalLight
        castShadow
        position={[0, 6, 4]}
        intensity={1.2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10, 0.1, 25]} />
      </directionalLight>

      <directionalLight position={[4, 3, 3]} intensity={0.4} />
      <directionalLight position={[-4, 3, 3]} intensity={0.4} />

      <directionalLight
        castShadow
        position={[5, 8, 4]}
        intensity={1.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      <directionalLight position={[0, 3, 5]} intensity={0.6} />

  
      {Array.from({ length: stations }).map((_, i) => (
        <group key={i} position={[startX + i * spacing, 0, 0]}>
     
          <mesh castShadow receiveShadow position={[0, -0.1, 0]}>
            <boxGeometry args={[1.2, 0.6, 0.65]} />
            <meshStandardMaterial color={basinColor} roughness={0.4} metalness={0.05} />
          </mesh>

         
          <group position={[0, 0.2, -0.18]}>
            <mesh castShadow position={[0, 0.09, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.18]} />
              <meshStandardMaterial 
                color={faucetFinish.hex} 
                metalness={isMatteBlack ? 0.1 : 0.95} 
                roughness={isMatteBlack ? 0.85 : isGold ? 0.15 : 0.05} 
                envMapIntensity={1.5}
              />
            </mesh>
            <mesh castShadow position={[0, 0.18, 0.04]}>
              <boxGeometry args={[0.03, 0.02, 0.12]} />
              <meshStandardMaterial 
                color={faucetFinish.hex} 
                metalness={isMatteBlack ? 0.1 : 0.95} 
                roughness={isMatteBlack ? 0.85 : isGold ? 0.15 : 0.05} 
                envMapIntensity={1.5}
              />
            </mesh>
          </group>

          <group position={[0, 1.1, -1.85]}>
            <mesh castShadow position={[0, 0, 0.01]}>
              <planeGeometry args={[0.95, 1.3]} />
              <MeshReflectorMaterial
                blur={[0, 0]}
                mixBlur={0}
                mixStrength={1}
                mixContrast={1}
                resolution={1024}
                mirror={1}
                depthScale={0}
                minDepthThreshold={0.9}
                maxDepthThreshold={1}
                color="#dcdcdc"
                metalness={1.0}
                roughness={0.0}
              />
            </mesh>

  
            <mesh castShadow position={[0, 0, -0.005]}>
              <boxGeometry args={[0.97, 1.32, 0.025]} />
              <meshStandardMaterial 
                color="#ffffff" 
                roughness={0.1} 
                metalness={0.9} 
              />
            </mesh>
          </group>

        </group>
      ))}

     
      <mesh position={[0, 3, -2]} receiveShadow>
        <planeGeometry args={[30, 15]} />
        <meshStandardMaterial color="#3c3f42" roughness={0.7} metalness={0.1} />
      </mesh>

     
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#2b2d30" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}