import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapComponentsProvider } from "@mapcomponents/react-maplibre";
import App from './App'
import './index.css'
import { APIContextProvider } from './contexto/APIContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
       
   <MapComponentsProvider>
    <APIContextProvider>
      <App /> 
      </APIContextProvider>
    </MapComponentsProvider>
   
  </React.StrictMode>,
)
