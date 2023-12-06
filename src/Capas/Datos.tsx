import { useContext, useEffect, useState } from "react";
import { APIContext } from "../contexto/APIContext";
import lotes from "./test/lotes_prueba.json";
import {
  useMap,
  MlGeoJsonLayer,
  TopToolbar,
  MlLayer,
} from "@mapcomponents/react-maplibre";
import recorridas from "./test/respuestaPrueba.json";
import createGeojson from "../contexto/createGeojson";
import {
  bbox,
  FeatureCollection,
  GeometryCollection,
  Properties,
} from "@turf/turf";
import { InputLabel, Select, MenuItem } from "@mui/material";

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
    recorridas,
    lotes as unknown as FeatureCollection
  );
  //variables seleccionadas
  const [lote, setLote] = useState<string>();
  const [semaforo, setSemaforo] = useState<string>();
  const [filteredGeojson, setFilteredGeojson] = useState<any>();
  const [selectedFeature, setSelectedFeature] = useState<any>();

  console.log(selectedFeature?.properties)


  const listaLotes = () => {
    const array: string[] = [];
    geojson.features?.forEach((el) => {
      if (!array.includes(el.properties.plot_name)) {
        array.push(el.properties.plot_name);
      }
    });
    array.push("todos")
    return array;
  };
  // useEffect(() => {
  //   setDatos(contexto.testData);
  // }, []);

  useEffect(() => {
    mapHook.map?.fitBounds(lotes.bbox as [number, number, number, number]);
  }, [mapHook.map, lotes]);

  useEffect(() => {
    if (typeof filteredGeojson !== "undefined") {
      const newBox = bbox(filteredGeojson);
      mapHook.map?.fitBounds(newBox as [number, number, number, number], {
        padding: {top: 150, bottom:175, left: 135, right: 135}
      });
    } else {
      const newBox = bbox(geojson);
      mapHook.map?.fitBounds(newBox as [number, number, number, number], {
        padding: {top: 150, bottom:175, left: 135, right: 135}
      });
    }
  }, [mapHook.map, filteredGeojson]);

  function handleSelectLote(ev) {

    if(ev.target.value === "todos"){
      setFilteredGeojson(undefined)
    } else {
       typeof geojson !== "undefined" &&
      setFilteredGeojson(() => {
        return {
          ...geojson,
          features: geojson?.features?.filter(
            (el) => el.properties?.plot_name == ev.target.value
          ),
        };
      });
    }
   
  }

  const fillColor = ()=> {

    if (semaforo){
      return [
    'match', ['get', semaforo ],
    0, '#96ceb4',
    1, '#ffffba',
    2, '#ff3030' ,
    '#999999' //default          
  ]
    }
    else return "#999999"
  
  }  

  return (
    <>
      <MlGeoJsonLayer
        geojson={
          filteredGeojson
            ? filteredGeojson
            : (geojson as FeatureCollection<GeometryCollection, Properties>)
        }
        paint={{"fill-color": fillColor() as string }}
        onClick={(ev)=>setSelectedFeature(ev.features[0])}
      />

      <MlLayer 
      geojson={filteredGeojson
        ? filteredGeojson
        : (geojson as FeatureCollection<GeometryCollection, Properties>)}
      options={{
        type: 'symbol',
        layout: {'text-field': ["get", "plot_name"], 'text-font': ['Metropolis Regular']},
        paint: {'text-color': "#000"}
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
              onChange={(ev) => handleSelectLote(ev)}
            >
              {listaLotes().map((el) => {
                return <MenuItem value={el}> {el}</MenuItem>;
              })}
            </Select>

            <InputLabel>Semaforos</InputLabel>
            <Select
              labelId="semaforos"
              id="semaforos"
              label="semaforos"
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


