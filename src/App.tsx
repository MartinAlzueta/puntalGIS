import "./App.css";
import { MapLibreMap } from "@mapcomponents/react-maplibre";
import Lotes from "./Capas/Lotes";
import Fondo from "./Capas/Fondo";
import Campo from "./Capas/Campo";
import TopBar from "./Componentes/TopBar";

function App() {
  return (
    <>
      <MapLibreMap
        options={{
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          zoom: 6,
          center: [-60.039202, -34.87202],
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
        }}
      />
      <TopBar />
     
      <Fondo />

      <Lotes />
      <Campo />
    </>
  );
}

export default App;
