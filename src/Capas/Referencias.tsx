import {
  MlGeoJsonLayer,
  MlVectorTileLayer,
} from "@mapcomponents/react-maplibre";
import { useState, useEffect, useContext } from "react";
import { FeatureCollection } from "@turf/turf";
import { layers } from "./assets/vector_layers";
import { AppContext } from "../contexto/AppContext";

export default function Referencias() {
  const contexto: any = useContext(AppContext);
  const [vial_terciaria, setVialTerciaria] = useState<FeatureCollection>();

  useEffect(() => {
    fetch("/assets/Vial_terciaria_BA.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure the data is in the expected format
        setVialTerciaria(data as FeatureCollection);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {vial_terciaria && contexto.showTerciarias && (
        <MlGeoJsonLayer
          geojson={vial_terciaria}
          layerId="red-terciaria"
          options={{
            paint: {
              "line-color": "#e7edc5",
              "line-opacity": 0.8,
              "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                5,
                0, // At zoom level 5, the line width is 0 pixel
                10,
                2, // At zoom level 10, the line width is 2 pixels
                15,
                6, // At zoom level 15, the line width is 6 pixels
              ],
            },
          }}
          labelProp="fna1"
          labelOptions={{
            layout: { "text-field": ["coalesce", ["get", "fna1"], ""] },
          }}
        />
      )}
      {contexto.showReferencias && (
        <MlVectorTileLayer
          layerId="test"
          url="https://wms.wheregroup.com/tileserver/tile/tileserver.php?/index.json?/europe-0-14/{z}/{x}/{y}.pbf"
          insertBeforeLayer="data_layer"
          layers={layers as any}
          sourceOptions={{ minzoom: 4, maxzoom: 22 } as any}
        />
      )}
    </>
  );
}
