import { MlWmsLayer } from "@mapcomponents/react-maplibre";

export default function Capas() {

  const mapBoxToken =
  "pk.eyJ1IjoibWFsenVldGEiLCJhIjoiY2xoa2h6YTJ6MHMyeTNjbngzMmJrM3M4MCJ9.QLWW-pDPEMeuZevZl83xEA";

  return (
    <MlWmsLayer
      url="https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.3465@2x.jpg90?"
      //insertBeforeLayer="marker-wms"
      urlParameters={{ access_token: mapBoxToken, layers: ""}}
      

    />
  );
}
