import React from "react";
import ReactDOM from "react-dom/client";
import { MapComponentsProvider } from "@mapcomponents/react-maplibre";
import App from "./App";
import "./index.css";
import { DataContextProvider } from "./contexto/DataContext";
import { AppContextProvider } from "./contexto/AppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MapComponentsProvider>
      <DataContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DataContextProvider>
    </MapComponentsProvider>
  </React.StrictMode>
);
