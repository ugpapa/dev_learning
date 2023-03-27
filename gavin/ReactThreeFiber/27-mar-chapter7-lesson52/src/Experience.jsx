import * as THREE from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { InstancedRigidBodies, CylinderCollider, CuboidCollider, Debug, Physics, RigidBody } from '@react-three/rapier';
import { useMemo, useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Experience() {
    const cubesCount = 100;
    const cubes = useRef();

    const cubeTransforms = useMemo(() => {
        const positions = [];
        const rotations = [];
        const scales = [];

        for (let i = 0; i < cubesCount; i++) {
            positions.push([ (Math.random() - 0.5) * 8, 6 + i * 0.2, (Math.random() - 0.5) * 8 ]);
            rotations.push([ Math.random(), Math.random(), Math.random() ]);

            const scale = 0.2 + Math.random() * 0.8;
            scales.push([ scale, scale, scale ]);
        }

        return { positions, rotations, scales };
    }, []);

    const cube = useRef();
    const twister = useRef();

    const [ hitSound ] = useState(() => new Audio('./hit.mp3'));
    console.log(); (hitSound);

    const burger = useGLTF('./hamburger.glb');

    const cubeJump = () => {
        const mass = cube.current.mass();
        cube.current.applyImpulse({ x: 0, y: mass * 5, z: 0 });
        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        });
    };

    // Doesn't work with <InstancedRigidBodies>
    // useEffect(() =>
    // {
    //     for(let i = 0; i < cubesCount; i++)
    //     {
    //         const matrix = new THREE.Matrix4()
    //         matrix.compose(
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1, 1, 1)
    //         )
    //         cubes.current.setMatrixAt(i, matrix)
    //     }
    // }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const eulerRotation = new THREE.Euler(0, time * 3, 0);
        const quaternionRotation = new THREE.Quaternion();
        quaternionRotation.setFromEuler(eulerRotation);
        twister.current.setNextKinematicRotation(quaternionRotation);

        const angle = time * 0.5;
        const x = Math.cos(angle);
        const z = Math.sin(angle);
        twister.current.setNextKinematicTranslation({ x: x, z: z, y: -0.8 });
    });

    const collisionEnter = () => {
        console.log('collision');
        hitSound.currentTime = 0;
        hitSound.volume = Math.random();
        hitSound.play();
    };

    return <>
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics>
            <Debug />
            <InstancedRigidBodies>
                <instancedMesh ref={ cubes } args={ [ null, null, cubesCount ] }>
                    <boxGeometry />
                    <meshStandardMaterial color="tomato" />
                </instancedMesh>
            </InstancedRigidBodies>

            <RigidBody colliders="ball" position={ [ -2, 4, 0 ] }>
                <mesh castShadow>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody
                ref={ cube }
                position={ [ 1.5, 2, 0 ] }
                gravityScale={ 1 }
                restitution={ 0 }
                friction={ 0.7 }
                colliders={ false }
                onCollisionEnter={ collisionEnter }
                onCollisionExit={ () => { console.log('exit'); } }
                onSleep={ () => { console.log('sleep'); } }
                onWake={ () => { console.log('wake'); } }
            >
                <mesh castShadow onClick={ cubeJump }>
                    <boxGeometry />
                    <meshStandardMaterial color='mediumpurple' />
                </mesh>
                <CuboidCollider mass={ 2 } args={ [ 0.5, 0.5, 0.5 ] } />
            </RigidBody>

            <RigidBody type='fixed'>
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 10, 0.5, 10 ] } />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed">
                <CuboidCollider args={ [ 5, 5, 0.5 ] } position={ [ 0, 4, 5.5 ] } />
                <CuboidCollider args={ [ 5, 5, 0.5 ] } position={ [ 0, 4, - 5.5 ] } />
                <CuboidCollider args={ [ 0.5, 5, 5 ] } position={ [ 5.5, 4, 0 ] } />
                <CuboidCollider args={ [ 0.5, 5, 5 ] } position={ [ - 5.5, 4, 0 ] } />
                <CuboidCollider args={ [ 0.5, 5, 5 ] } position={ [ 0, 10, 0 ] } rotation={[0, 0, Math.PI * 0.5 ] } />
            </RigidBody>

            <RigidBody
                ref={ twister }
                position={ [ 0, -0.8, 0 ] }
                friction={ 0 }
                type="kinematicPosition"
            >
                <mesh castShadow scale={ [ 0.4, 0.4, 4 ] }>
                    <boxGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>
            </RigidBody>


            <RigidBody
                position={ [ 0, 4, 0 ] }
                colliders={ false }
            >
                <primitive object={ burger.scene } scale={ 0.2 } />
                <CylinderCollider args={ [ 0.5, 0.9 ] } />
            </RigidBody>
        </Physics>
    </>;
}