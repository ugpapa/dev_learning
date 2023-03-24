import { OrbitControls, useTexture, Sphere, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { Suspense, useEffect } from 'react'
import * as THREE from 'three'

function Box() {
  const textureProps = useTexture({
    map: './texture/color.jpg',
    displacementMap: './texture/displacement.jpg',
    metalnessMap: './texture/metalness.jpg',
    normalMap: './texture/normal.jpg',
    roughnessMap: './texture/roughness.jpg',
  })
  return (
    <Sphere>
      <meshPhysicalMaterial {...textureProps} map-magFilter={THREE.NearestFilter} displacementScale={0.25} />
    </Sphere>
  )
}

export default function App() {
  return (
    <Canvas shadows dpr={[0.1, 1.5]}>
      <OrbitControls makeDefault autoRotate enableDamping/>
      <Suspense fallback={null}>
        <Stage preset="rembrandt" intensity={1} environment="city">
          <Box />
        </Stage>
      </Suspense>
    </Canvas>
  )
}
