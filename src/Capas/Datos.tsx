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
import DisplayInfos from "./DisplayInfo";

interface queryParamsType {
  scout?: string;
  farm_id?: number;
  scout_id?: number;
  plot_id?: number;
}

const semaforos = [
  { label: "ninguno", field: "ninguno" },
  { label: "enfermedad", field: "disease_semaphore" },
  { label: "peste", field: "pest_semaphore" },
  { label: "maleza", field: "weed_semaphore" },
  { label: "adversidad", field: "adversity_semaphore" },
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
  const [semaforo, setSemaforo] = useState<string>(semaforos[0].field);
  const [filteredGeojson, setFilteredGeojson] = useState<any>();
  const [selectedFeature, setSelectedFeature] = useState<any>();
  const [ultimaRecorrida, setUltimaRecorrida] = useState<any>();
  const contexto = useContext(APIContext) as any;
  

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

  const getQueryParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    return params;
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
    const params: queryParamsType = getQueryParams();
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
        onClick={(ev: any) => {          
          setSelectedFeature(ev.features[0]);
          setLote(ev.features[0].properties.plot_id)
          
        }}
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
              id="plot_name"
              label="lote"
              value={lote}
              onChange={(ev) => setLote(ev.target.value as number)}
            >
              {listaLotes().map((el) => {
                return (
                  <MenuItem key={el.id} value={el.id}>
                    {" "}
                    {el.name}
                  </MenuItem>
                );
              })}
            </Select>

            <InputLabel>Semaforos</InputLabel>
            <Select
              id="semaforos"
              label="semaforos"
              value={semaforo}
              onChange={(ev) => setSemaforo(ev.target.value as string)}
            >
              {semaforos.map((el) => {
                return (
                  <MenuItem key={el.label} value={el.field}>                   
                    {el.label}
                  </MenuItem>
                );
              })}
            </Select>
          
          </>
        }
      />
     {selectedFeature && <DisplayInfos feature={selectedFeature} open={true} closeHandler={()=>{setSelectedFeature(undefined); setLote(0)} } />}
    </>
  );
}
