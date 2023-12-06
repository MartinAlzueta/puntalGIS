import "./App.css";
import { MapLibreMap } from "@mapcomponents/react-maplibre";
//import Capas from "./Capas/Capas";
import Datos from "./Capas/Datos";

function App() {
  return (
    <>
      <MapLibreMap
        options={{
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          zoom: 6,
          center: [-60.013649, -34.903018]
        }}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
     <Datos />
    </>
  );
}

export default App;