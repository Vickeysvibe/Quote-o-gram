import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./pages/test/injectCss";
const root = ReactDOM.createRoot(document.getElementById("root"));
document.body.style.zoom = "100%";
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
