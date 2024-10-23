import "./App.css";
import { MapLibreMap } from "@mapcomponents/react-maplibre";
import Datos from "./Capas/Datos";
import Fondo from "./Capas/Fondo";
import Campo from "./Capas/Campo";

function App() {
  return (
    <>
      <MapLibreMap
        options={{
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          zoom: 6,
          center: [-60.039202, -34.872020],
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden"
        }}
      />
      <Fondo />
      
      <Datos />
        <Campo />    
    </>
  );
}

export default App;
