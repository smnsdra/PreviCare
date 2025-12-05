import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const basename = (() => {
  const p = process.env.PUBLIC_URL || '/';
  try {
    // If PUBLIC_URL is a full url (https://.../repo) return its pathname (/repo)
    return new URL(p).pathname;
  } catch {
    // Otherwise return value as-is or fallback to '/'
    return p === '' ? '/' : p;
  }
})();

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
