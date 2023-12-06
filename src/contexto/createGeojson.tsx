import { FeatureCollection, Geometry, GeometryCollection } from "@turf/turf";

interface geojsonType {
  type: "FeatureCollection";
  name: string;
  features:
    | {
        type: string;
        id: number;
        properties: any;
        geometry: Geometry | GeometryCollection;
      }[]
    | undefined;
}

export default function createGeojson(
  recorridas: any[],
  lotes: FeatureCollection
) {
  const geojson: geojsonType = {
    type: "FeatureCollection",
    name: "geojson",
    features: undefined,
  };

  recorridas.forEach((element, idx) => {
    const lote = lotes.features.filter(
      (feat) => feat.properties?.Name == element["plot_name"]
    );
    const newFeature = {
      type: "Feature",
      id: idx,
      properties: element,
      geometry: lote[0].geometry,
    };
    geojson.features
      ? geojson.features.push(newFeature)
      : (geojson.features = [newFeature]);
  });

  return geojson;
}
