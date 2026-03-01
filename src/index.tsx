import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container #root not found. Check public/index.html for <div id="root"></div>.');
}

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorker.unregister();