import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.scss";
import GlobalData from "./context/GlobalData.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalData>
      <App />
    </GlobalData>
  </React.StrictMode>
);
