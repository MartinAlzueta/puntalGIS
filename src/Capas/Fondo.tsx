import { MlWmsLayer } from "@mapcomponents/react-maplibre";

export default function Fondo() {

  const mapBoxToken =
  "pk.eyJ1IjoibWFsenVldGEiLCJhIjoiY20zZ2ZiNWQ3MDRtZzJqc2EzdjM1czY1MyJ9.FsE6rmU-EC_NWvE5mqBslg";

  return (
    <MlWmsLayer
      url="https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.3465@2x.jpg90?"
      //insertBeforeLayer="marker-wms"
      urlParameters={{ access_token: mapBoxToken, layers: ""}}
      layerId="satelite"      

    />
  );
}
