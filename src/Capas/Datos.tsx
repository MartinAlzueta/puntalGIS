import { useContext, useEffect, useState } from "react";
import { APIContext } from "../contexto/APIContext";
//import lotes from "./test/lotes_prueba.json";
import {
  useMap,
  MlGeoJsonLayer,
  TopToolbar,
  MlLayer,
} from "@mapcomponents/react-maplibre";
import createGeojson, { campoType } from "../contexto/createGeojson";
import {
  bbox,
  FeatureCollection,
  GeometryCollection,
  Properties,
} from "@turf/turf";
import { InputLabel, Select, MenuItem } from "@mui/material";
import DisplayInfos from "./DisplayInfo";
import { validQueryParams} from "../utils/utils.js";

interface queryParamsType {
  scout?: string;
  farm_id?: number;
  scout_id?: number;
  plot_id?: number;
}

const semaforos = [
  { label: "ninguno", field: "ninguno" },
  { label: "general", field: "general " },
  { label: "enfermedades", field: "diseases" },
  { label: "calidad de implantación", field: "implementation_quality" },
  { label: "plagas", field: "pests" },
  { label: "malezas", field: "weeds" },
  { label: "adversidades", field: "adversities" },
];

export default function Datos() {
  //const [datos, setDatos] = useState();
  //const contexto = useContext(APIContext) as any;
  const mapHook = useMap();

  //variables seleccionadas
  const [lote, setLote] = useState<number>(0);
  const [campo, setCampo] = useState<campoType>();
  const [lotesList, setLotesList] = useState<any[]>([]);
  const [semaforo, setSemaforo] = useState<string>(semaforos[0].field);
  const [filteredGeojson, setFilteredGeojson] = useState<any>();
  const [selectedFeature, setSelectedFeature] = useState<any>();
  const contexto = useContext(APIContext) as any;
  const [geojson, setGeoJson] = useState<any>(); 


  const fillColor = () => {
    if (semaforo && semaforo != "ninguno") {
        return [
          "case",
          // Condition: Check if "semaphore" exists in the semaforo object
          ["has", "semaphore", ["get", semaforo]],
          
          // If "semaphore" exists, use the corresponding semaphore value to return a color
          [
            "match",
            ["get", "semaphore", ["get", semaforo]], // Get the semaphore value
            -1, "#999999",
            0, "#96ceb4",  // Color for 0
            1, "#ffffba",  // Color for 1
            2, "#ff3030",  // Color for 2
            "#6D0606"      // Default color if the value is not 0, 1, or 2
          ],
      
          // Fallback if "semaphore" does not exist or is undefined
          "#6D0606"
        ];
      }  else {
    return "rgba(0, 0, 255, 0.1)"
      }
 
  };


  const listaLotes = () => {
    const array: any[] = [];
    if (campo) {
      campo.plots?.forEach((el) => {
          array.push({
            name: el.name,
            id: el.id,
          });
      });
    } 
    array.push({ name: "todos", id: -1 });
    return array;
  };


  const getQueryParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const params: queryParamsType = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };


  useEffect(()=>{
      campo && setGeoJson(createGeojson(
       campo
     ));
   },[campo])

  useEffect(() => {
    if (campo) {
     campo.map.bbox &&
      mapHook.map?.fitBounds(campo.map.bbox as [number, number, number, number]);}
  }, [mapHook.map, campo]);

  useEffect(() => {
    if (typeof filteredGeojson !== "undefined") {
      const newBox = bbox(filteredGeojson);
      mapHook.map?.fitBounds(newBox as [number, number, number, number], {
        padding: { top: 150, bottom: 175, left: 135, right: 135 },
      });
    } 
    if(typeof filteredGeojson === "undefined" && typeof geojson !== "undefined") {
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
      if (lote === -1) {
        typeof geojson !== "undefined" &&
        setFilteredGeojson(() => {
          return {
            ...geojson,
            features: geojson?.features
          };
        });
      } 
      else {
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
    }
  }, [lote, geojson]);

  const handleLotesResponse = (data) => {
    if (data) {
        setCampo(data);
    }
  };

  useEffect(() => {
    if (campo) {
      const lotesLista = listaLotes();
      setLotesList(lotesLista);
    }
  }, [campo]);

  useEffect(() => {
    if (campo) {
      setLote(-1);
    }
  }, [lotesList]);
  

  //Read query parameters
  useEffect(() => {
    const params: queryParamsType = getQueryParams();
  //  params.scout && setSemaforo(params.scout);
  //  params.plot_id && setLote(params.plot_id);

    if (validQueryParams(params) === '') {
      if (params.farm_id) {
        contexto.getLotes({ farm_id: params.farm_id }, handleLotesResponse);
      } else {
        console.info('Parametros inválidos');
      }
    } else {
      console.info('Parametros inválidos');
    }

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
        paint={{ "fill-color": fillColor() as string, "fill-outline-color": (lote == -1)?"blue":"black" /*, "fill-outline-color": borderColor() as string , "fill-opacity": opacity() as string*/ }}
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
            {campo && geojson && lotesList.map((el) => (
                <MenuItem key={el.id} value={el.id}>
                  {el.name}
                </MenuItem>
              ))}

             
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
     {selectedFeature && <DisplayInfos feature={selectedFeature} open={true} closeHandler={()=>{setSelectedFeature(undefined); setLote(-1)} } />}
    </>
  );
}
