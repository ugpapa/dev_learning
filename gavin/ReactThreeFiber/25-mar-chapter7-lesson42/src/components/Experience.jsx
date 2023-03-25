import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import CustomObject from "./CustomObject";

extend({ OrbitControls });

export default function Experience() {
    const three = useThree();
    const { camera, gl } = useThree();

    const cubeRef = useRef();
    const groupRef = useRef();

    useFrame((state, delta) => {
        // const angle = state.clock.elapsedTime

        // state.camera.position.x = Math.sin(angle) * 10
        // state.camera.position.z = Math.cos(angle) * 10
        // state.camera.lookAt(0, 0, 0)

        cubeRef.current.rotation.y += delta;
        cubeRef.current.rotation.x += Math.random() * delta;

        groupRef.current.rotation.y += delta;
    });

    return <>
        <orbitControls args={ [camera, gl.domElement] } />

        <directionalLight position={ [1, 2, 3] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.6 } />

        <group ref={ groupRef }>
            <mesh position-x={ -2 }>
                <sphereGeometry />
                <meshStandardMaterial color={ 'orange' } />
            </mesh>
            <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.25 } position-x={ 2 } scale={ 1.5 }>
                <boxGeometry args={ [1, 1, 1] } scale={ 1.5 } />
                <meshStandardMaterial color='purple' wireframe={ false } />
            </mesh>
        </group>
        <mesh position-y={ -1 } rotation-x={ -Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color={ 'greenyellow' } />
        </mesh>

        <CustomObject />
    </>;
}