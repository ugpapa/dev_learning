import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import * as THREE from 'three';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <React.StrictMode>
        {/* ACESFilmicToneMapping = R3F default tone mapping
            sRGBEncoding = R3F default output encoding
        */ }
        <Canvas
            // frameloop="demand"
            // flat
            gl={ {
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                outputEncoding: THREE.sRGBEncoding
            } }
            // orthographic
            camera={ {
                fov: 45,
                // zoom: 50,
                near: 0.1,
                far: 200,
                position: [3, 2, 6]
            } }>
            <Experience />
        </Canvas>
    </ React.StrictMode>
);