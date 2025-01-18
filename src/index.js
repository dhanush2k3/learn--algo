import React from "react";
import ReactDOM from "react-dom/client"; // Update to use the 'react-dom/client' package
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
