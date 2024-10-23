import { FeatureCollection, Geometry, GeometryCollection } from "@turf/turf";
import { calculateBbox } from  '../utils/utils.js'; /* mariana */

interface plotsType {
    "id": number;
    "map": FeatureCollection,
    "name": string;
    "last_scout": any
}
export interface campoType {
    "map": FeatureCollection;
    "id": number;
    "name": string;
    "plots": plotsType[]
}

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

const defaultProps = { 
    "pests": {
        "decision": null,
        "semaphore": 0
    },
    "state": "Pre-siembra",
    "weeds": {
        "decision": null,
        "semaphore": 0
    },
    "diseases": {
        "decision": null,
        "semaphore": 0
    },
    "general": {
        "decision": null,
        "semaphore": 0
    },   
    "adversities": {
        "decision": null,
        "semaphore": 0
    },
    "implementation_quality": {
        "decision": null,
        "semaphore": 0
    }
}

export default function createGeojson(
  lotes: campoType
) {
  const geojson: geojsonType = {
    type: "FeatureCollection",
    name: "geojson",
    features: [],
  };

  // inserto el campo como lote -1
/*  if (!lotes.map.bbox) {
    lotes.map.bbox = calculateBbox(lotes.map);
  }*/
//   const firstFeature = {
//     type: "Feature",
//     id: -1,
//     properties: {'plot_name':lotes.name, 'plot_id':-1, ...defaultProps},
//     geometry: lotes["map"].features[0].geometry,
//   };
//   geojson.features = [firstFeature];


  lotes.plots?.forEach((element) => {
  /*  const lote = lotes.features.filter(
      (feat) => feat.properties?.Name == element["plot_name"]
    );*/
 //   element.map.bbox = calculateBbox(element.map);
    const newFeature = {
      type: "Feature",
      id: element.id,
      properties:  {'plot_name':element.name, 'plot_id':element.id, ...defaultProps, ...element.last_scout},
      geometry: element.map.features[0].geometry,
    };
    geojson.features
      ? geojson.features.push(newFeature)
      : (geojson.features = [newFeature]);
  });

  console.info('geojson creado',geojson);
  return geojson;
}
