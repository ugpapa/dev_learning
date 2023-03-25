import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './css/style.css';

const root = createRoot(document.querySelector('#root'));
root.render(
    <div>
        <App clickersCount = { 5 }>
        <h1>My First React App</h1>
        <h2>Apppp</h2>
        </App>
    </div>
);