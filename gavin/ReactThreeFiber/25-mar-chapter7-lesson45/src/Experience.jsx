import { useFrame } from '@react-three/fiber';
import { Stage, Lightformer, Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { useControls } from 'leva';

export default function Experience() {
    const dirLight = useRef();
    const cube = useRef();

    useHelper(dirLight, THREE.DirectionalLightHelper, 3);

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        cube.current.position.x = 2 + Math.sin(time);
        cube.current.rotation.y += delta * 0.2;
    });

    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#4b2709',
        opacity: { value: 0.5, min: 0, max: 1 },
        blur: { value: 1, min: 0, max: 10 }
    });

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [ 1, 2, 3 ] }
    });

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapIntensity: { value: 7, min: 0, max: 12 },
        envMapHeight: { value: 7, min: 0, max: 100 },
        envMapRadius: { value: 28, min: 10, max: 1000 },
        envMapScale: { value: 100, min: 10, max: 1000 }
    });

    return <>
        {/* <Environment
            preset="sunset"
            ground={ {
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale
            } } */}
        {/*// files={
        //     // [
        //     //     './environmentMaps/2/px.jpg',
        //     //     './environmentMaps/2/nx.jpg',
        //     //     './environmentMaps/2/py.jpg',
        //     //     './environmentMaps/2/ny.jpg',
        //     //     './environmentMaps/2/pz.jpg',
        //     //     './environmentMaps/2/nz.jpg',
        //     // ]
        //     './environmentMaps/the_sky_is_on_fire_2k.hdr'
        // }
        > */}
        {/* <color args={ [ 'black' ] } attach='background' /> */ }
        {/* <Lightformer
                position-z={ -5 }
                scale={ 10 }
                color="red"
                intensity={ 10 }
                form="ring"
            /> */}
        {/* <mesh position-z={ -5 } scale={ 10 }>
                <planeGeometry />
                <meshBasicMaterial color={ [ 10, 0, 0 ] } />
            </mesh> */}
        {/* </Environment> */ }

        {/* <BakeShadows /> */ }
        {/* <SoftShadows
            frustum={ 3.75 }
            size={ 0.005 }
            near={ 9.5 }
            samples={ 17 }
            rings={ 11 }
        /> */}


        {/* <color args={ [ 'skyblue' ] } attach='background' /> */}

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <AccumulativeShadows
            position-y={ -.99 }
            scale={ 10 }
            color='#316d39'
            opacity={ 0.8 }
            frame={ Infinity }
            temporal
            blend={ 100 }
        >
            <RandomizedLight
                amount={ 8 }
                radius={ 1 }
                ambient={ 0.5 }
                intensity={ 1 }
                position={ [ 1, 2, 3 ] }
                bias={ 0.001 }
            />
        </AccumulativeShadows> */}

        <ContactShadows
            position-y={ [ -0 ] }
            scale={ 10 }
            resolution={ 512 }
            far={ 50 }
            color={ color }
            opacity={ opacity }
            blur={ blur }
            frames={ 1 }
        />

        {/* <directionalLight
            ref={ dirLight }
            position={ sunPosition }
            intensity={ 1.5 }
            castShadow
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ -5 }
            shadow-camera-left={ -5 }
        />
        <ambientLight intensity={ 0.5 } />

        <Sky sunPosition={sunPosition} /> */}

        <Stage
            shadows={{ type: 'contact', opacity: 0.5, blur: 1}}
            environment='sunset'
            preset='portrait'
            intensity={2}
        >
            <mesh castShadow receiveShadow position-x={ - 2 } position-y={ 1 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" envMapIntensity={ envMapIntensity } />
            </mesh>

            <mesh ref={ cube } castShadow receiveShadow position-x={ 2 } position-y={ 1 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={ envMapIntensity } />
            </mesh>

            {/* <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={ envMapIntensity } />
        </mesh> */}
        </Stage>

    </>;
}