import * as THREE from 'three';
import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const torusMaterial = new THREE.MeshMatcapMaterial();

export default function Experience() {
    const matcapTexture = useMatcapTexture('1A2461_3D70DB_2C3C8F_2C6CAC', 256);

    const donuts = useRef([]);

    // const [ torusGeometry, setTorusGeometry ] = useState();
    // const [ torusMaterial, setTorusMaterial ] = useState();

    useEffect(() => {
        matcapTexture.encoding = THREE.sRGBEncoding;
        matcapTexture.needsUpdate = true;

        torusMaterial.matcap = matcapTexture;
        torusMaterial.needsUpdate = true;
    });

    useFrame((state, delta) => {
        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.2;
        }
    });

    return <>
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <torusGeometry ref={ setTorusGeometry } args={ [ 1, 0.6, 16, 32 ] } />
        <meshMatcapMaterial ref={ setTorusMaterial } matcap={ matcapTexture } /> */}
        <Center>
            <Text3D
                material={ torusMaterial }
                font="./fonts/helvetiker_regular.typeface.json"
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
            >
                HELLO R3F
            </Text3D>
        </Center>

        { [ ...Array(100) ].map((v, i) =>
            <mesh
                ref={ (element) => donuts.current.push(element) }
                key={ i }
                geometry={ torusGeometry }
                material={ torusMaterial }
                position={ [
                    (Math.random() - 0.5) * 50,
                    (Math.random() - 0.5) * 50,
                    (Math.random() - 0.5) * 50,
                ] }

                rotation={ [
                    (Math.random() * Math.PI),
                    (Math.random() * Math.PI),
                    0,
                ] }

                scale={ 0.2 + Math.random() * 0.2 }
            />
        ) }
    </>;
}