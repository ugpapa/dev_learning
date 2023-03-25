import { useThree, extend } from '@react-three/fiber';
import { Float, Html, MeshReflectorMaterial, OrbitControls, PivotControls, Text, TransformControls } from '@react-three/drei';
import { useRef } from 'react';

export default function Experience() {
    const cube = useRef();
    const sphere = useRef();

    return <>
        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls
            anchor={ [ 0, 1, 0 ] }
            dpethTest={ false }
            lineWidth={ 4 }
            axisColors={ [ '#9381ff', '#ff4d6d', '#7ae582' ] }
            scale={ 1 }
            fixed={ false }
        >
            <mesh ref={ sphere } position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html
                    position={ [ 1, 1, 0 ] }
                    wrapperClass='label'
                    center
                    distanceFactor={ 5 }
                    occlude={ [ sphere, cube ] }
                >
                    That's a sphere!
                </Html>
            </mesh>
        </PivotControls>

        <PivotControls
            anchor={ [ 0, 1, 0 ] }
            dpethTest={ false }
        >
            <mesh ref={ cube } position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </PivotControls>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>

            <planeGeometry />
            <MeshReflectorMaterial
                resolution={ 1024 }
                blur={ [ 1000, 1000 ] }
                mixBlur={0.0}
                mirror={0.75}
                color='silver'
            />
        </mesh>

        <Float speed={ 5 } floatIntensity={ 2 }>
            <Text
                font='./bangers-v20-latin-regular.woff'
                fontSize={ 1.0 }
                color='salmon'
                position-y={ 3 }
                maxWidth={ 1 }
                textAlign='center'
            >
                Gavin Quach
            </Text>
        </Float>
    </>;
}