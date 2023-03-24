import React from 'react'
import App from './App'
import * as ReactDOMClient from 'react-dom/client';

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

