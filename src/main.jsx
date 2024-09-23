import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SearchProvider } from "./atom/search.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </SearchProvider>
);
