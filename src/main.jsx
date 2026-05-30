import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { TooltipProvider } from "./lib/Tooltip.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </HashRouter>
  </React.StrictMode>
);
