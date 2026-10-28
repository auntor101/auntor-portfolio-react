import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { LightboxProvider } from "./lib/Lightbox.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <LightboxProvider>
        <App />
      </LightboxProvider>
    </HashRouter>
  </React.StrictMode>
);
