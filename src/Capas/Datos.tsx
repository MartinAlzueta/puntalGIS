import { useContext, useEffect, useState } from "react";
import { APIContext } from "../contexto/APIContext";
import lotes from "./test/lotes_prueba.json";
import {
  useMap,
  MlGeoJsonLayer,
  TopToolbar,
  MlLayer,
} from "@mapcomponents/react-maplibre";
import respuestaUltimaRecorrida from "./test/respuestaUltimaRecorrida.json";
import createGeojson from "../contexto/createGeojson";
import {
  bbox,
  FeatureCollection,
  GeometryCollection,
  Properties,
} from "@turf/turf";
import { InputLabel, Select, MenuItem } from "@mui/material";

interface queryParamsType {
  scout?: string;
  farm_id?: number;
  scout_id?: number;
  plot_id?: number;
}

const semaforos = [
  "ninguno",
  "disease_semaphore",
  "pest_semaphore",
  "weed_semaphore",
  "adversity_semaphore",
];

export default function Datos() {
  //const [datos, setDatos] = useState();
  //const contexto = useContext(APIContext) as any;
  const mapHook = useMap();
  const geojson = createGeojson(
    respuestaUltimaRecorrida.data,
    lotes as unknown as FeatureCollection
  );
  //variables seleccionadas
  const [lote, setLote] = useState<number>(0);
  const [semaforo, setSemaforo] = useState<string>(semaforos[0]);
  const [filteredGeojson, setFilteredGeojson] = useState<any>();
  const [selectedFeature, setSelectedFeature] = useState<any>();
  const [ultimaRecorrida, setUltimaRecorrida] = useState<any>();

  const contexto = useContext(APIContext) as any;

  console.log(lote);

  const fillColor = () => {
    if (semaforo) {
      return [
        "match",
        ["get", semaforo],
        0,
        "#96ceb4",
        1,
        "#ffffba",
        2,
        "#ff3030",
        "#999999", //default
      ];
    } else return "#999999";
  };

  const listaLotes = () => {
    const array: any[] = [];
    geojson.features?.forEach((el) => {
      if (!array.includes(el.properties.plot_name)) {
        array.push({
          name: el.properties.plot_name,
          id: el.properties.plot_id,
        });
      }
    });
    array.push({ name: "todos", id: 0 });
    return array;
  };

  // useEffect(() => {
  //       contexto.getRecorridas((data)=>setUltimaRecorrida(data));
  // }, []);

  useEffect(() => {
    lotes.bbox &&
      mapHook.map?.fitBounds(lotes.bbox as [number, number, number, number]);
  }, [mapHook.map, lotes]);

  useEffect(() => {
    if (typeof filteredGeojson !== "undefined") {
      const newBox = bbox(filteredGeojson);
      mapHook.map?.fitBounds(newBox as [number, number, number, number], {
        padding: { top: 150, bottom: 175, left: 135, right: 135 },
      });
    } else {
      const newBox = bbox(geojson);
      mapHook.map?.fitBounds(newBox as [number, number, number, number], {
        padding: { top: 150, bottom: 175, left: 135, right: 135 },
      });
    }
  }, [mapHook.map, filteredGeojson]);

  //filtrar Lotes

  useEffect(() => {
    if (lote === 0) {
      setFilteredGeojson(undefined);
    } else {
      typeof geojson !== "undefined" &&
        setFilteredGeojson(() => {
          return {
            ...geojson,
            features: geojson?.features?.filter(
              (el) => el.properties?.plot_id == lote
            ),
          };
        });
    }
  }, [lote]);

  //Read query parameters

  useEffect(() => {
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const params = {};
      for (let [key, value] of searchParams.entries()) {
        params[key] = value;
      }

      return params;
    };
    //
    const params: queryParamsType = getQueryParams();
    console.log(params);
    params.scout && setSemaforo(params.scout);
    params.plot_id && setLote(params.plot_id);
  }, []);

  return (
    <>
      <MlGeoJsonLayer
        geojson={
          filteredGeojson
            ? filteredGeojson
            : (geojson as FeatureCollection<GeometryCollection, Properties>)
        }
        layerId="data_layer"
        paint={{ "fill-color": fillColor() as string }}
        //onClick={(ev) =>{ setSelectedFeature(ev.features[0]); console.log(ev)}}
      />

      <MlLayer
        geojson={
          filteredGeojson
            ? filteredGeojson
            : (geojson as FeatureCollection<GeometryCollection, Properties>)
        }
        options={{
          type: "symbol",
          layout: {
            "text-field": ["get", "plot_name"],
            "text-font": ["Metropolis Regular"],
          },
          paint: { "text-color": "#000" },
        }}
      />

      <TopToolbar
        unmovableButtons={
          <>
            <InputLabel>Lote</InputLabel>
            <Select
              labelId="lote"
              id="plot_name"
              label="lote"
              onChange={(ev) => setLote(ev.target.value as number)}
            >
              {listaLotes().map((el) => {
                return <MenuItem value={el.id}> {el.name}</MenuItem>;
              })}
            </Select>

            <InputLabel>Semaforos</InputLabel>
            <Select
              labelId="semaforos"
              id="semaforos"
              label="semaforos"
              value={semaforo}
              onChange={(ev) => setSemaforo(ev.target.value as string)}
            >
              {semaforos.map((el) => {
                return <MenuItem value={el}> {el}</MenuItem>;
              })}
            </Select>
          </>
        }
      />
    </>
  );
}
