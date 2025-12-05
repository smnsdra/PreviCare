import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css'; // project overrides
import App from './App';
import reportWebVitals from './reportWebVitals';

// Derive a safe basename from PUBLIC_URL so the router works when "homepage" is set to a full URL
// CRA sets process.env.PUBLIC_URL from the "homepage" field in package.json.
// If PUBLIC_URL is a full URL (eg. https://user.github.io/repo), new URL(...).pathname returns "/repo".
const basename = process.env.PUBLIC_URL
  ? (() => {
      try {
        return new URL(process.env.PUBLIC_URL).pathname;
      } catch {
        return process.env.PUBLIC_URL;
      }
    })()
  : '/';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
