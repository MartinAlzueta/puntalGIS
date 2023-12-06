import { MlWmsLayer } from "@mapcomponents/react-maplibre";

export default function Capas() {
  return (
    <MlWmsLayer
      url="https://landsatlook.usgs.gov/arcgis/rest/services/Sentinel2/ImageServer"
      //insertBeforeLayer="marker-wms"
      //urlParameters={{ layers: "capabaseargenmap" }}
    />
  );
}
