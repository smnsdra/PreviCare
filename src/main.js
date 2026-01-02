import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

/*
  Load the Medilab template CSS from public/assets/css/main.css.
  Vite serves files in /public at the root, so /assets/css/main.css maps to public/assets/css/main.css.
  Then load our small overrides so they apply after the template styles.
*/
import "/assets/css/main.css";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);