import { MlWmsLayer } from "@mapcomponents/react-maplibre";
import { useContext } from "react";
import { AppContext } from "../contexto/AppContext";

const mapBoxToken =
  "pk.eyJ1IjoibWFsenVldGEiLCJhIjoiY20zZ2ZiNWQ3MDRtZzJqc2EzdjM1czY1MyJ9.FsE6rmU-EC_NWvE5mqBslg";

export default function Fondo() {
  const appcontext = useContext(AppContext) as any;

  return (
    <>
      {appcontext.showSatelite && (
        <MlWmsLayer
          url="https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.3465@2x.jpg90?"
          insertBeforeLayer="data_layer"
          urlParameters={{ access_token: mapBoxToken, layers: "" }}
          layerId="satelite"
        />
      )}
    </>
  );
}
