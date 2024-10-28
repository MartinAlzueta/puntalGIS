import { useContext, useEffect, useState } from "react";
import { DataContext } from "../contexto/DataContext";
//import lotes from "./test/lotes_prueba.json";
import {
  useMap,
  MlGeoJsonLayer,  
  MlLayer,
} from "@mapcomponents/react-maplibre";
import createGeojson, { campoType } from "../../utils/createGeojson";
import {
  bbox,
  FeatureCollection,
  GeometryCollection,
  Properties,
} from "@turf/turf";
import DisplayInfos from "../Componentes/DisplayInfo";
import { validQueryParams } from "../utils/utils.js";
import { AppContext } from "../contexto/AppContext";

interface queryParamsType {
  scout?: string;
  farm_id?: number;
  scout_id?: number;
  plot_id?: number;
}



export default function Lotes() {
  const mapHook = useMap();
  const contexto = useContext(DataContext) as any;
  const appcontext = useContext(AppContext) as any;

  const [campo, setCampo] = useState<campoType>();

  const [filteredGeojson, setFilteredGeojson] = useState<any>();
  const [selectedFeature, setSelectedFeature] = useState<any>();
  const [geojson, setGeoJson] = useState<any>();

  const fillColor = () => {
    if (appcontext.semaforo && appcontext.semaforo != "ninguno" && appcontext.semaforo != "general") {
      return [
        "match",
        ["get", "semaphore", ["get", appcontext.semaforo]],
        0,
        "rgba(158, 158, 158, 0.7)",
        1,
        "rgba(76, 175, 80, 0.7)",
        2,
        "rgba(255, 235, 59, 0.7)",
        3,
        "rgba(255, 152, 0, 0.7)",
        4,
        "rgba(244, 67, 54, 0.7)",
        //default
        "rgba(158, 158, 158, 0.7)",
      ];
    } else if (appcontext.semaforo && appcontext.semaforo == "general") {
      // paleta especial para el semaforo general
      return [
        "match",
        ["get", "semaphore", ["get", "general"]],
        0,
        "rgba(2, 68, 27, 0.7)",
        1,
        "rgba(76, 175, 80, 0.7)",
        2,
        "rgba(158, 158, 158, 0.7)",
        3,
        "rgba(255, 152, 0, 0.7)",
        4,
        "rgba(244, 67, 54, 0.7)",
        //default
        "rgba(2, 68, 27, 0.7)",
      ];
    } else {
      return "rgba(21, 141, 189, 0.2)";
    }
  };

  
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const params: queryParamsType = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  useEffect(() => {
    campo && setGeoJson(createGeojson(campo));
  }, [campo]);

  useEffect(() => {
    if (campo) {
      campo.map.bbox &&
        mapHook.map?.fitBounds(
          campo.map.bbox as [number, number, number, number]
        );
    }
  }, [mapHook.map, campo]);

  useEffect(() => {
    if (typeof filteredGeojson !== "undefined") {
      const newBox = bbox(filteredGeojson);
      mapHook.map?.fitBounds(newBox as [number, number, number, number], {
        padding: { top: 150, bottom: 175, left: 135, right: 135 },
      });
    }
    if (
      typeof filteredGeojson === "undefined" &&
      typeof geojson !== "undefined"
    ) {
      const newBox = bbox(geojson);
      mapHook.map?.fitBounds(newBox as [number, number, number, number], {
        padding: { top: 150, bottom: 175, left: 135, right: 135 },
      });
    }
  }, [mapHook.map, filteredGeojson]);

  //filtrar Lotes

  useEffect(() => {
    const lote = appcontext.loteSeleccionado;

    if (lote === 0) {
      setFilteredGeojson(undefined);
    } else {
      if (lote === -1) {
        typeof geojson !== "undefined" &&
          setFilteredGeojson(() => {
            return {
              ...geojson,
              features: geojson?.features,
            };
          });
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
    }
  }, [appcontext.loteSeleccionado, geojson]);

  const handleLotesResponse = (data) => {
    if (data) {
      setCampo(data);
    }
  };

  
  //Read query parameters
  useEffect(() => {
    const params: queryParamsType = getQueryParams();
    //  params.scout && setSemaforo(params.scout);
    //  params.plot_id && setLote(params.plot_id);

    if (validQueryParams(params) === "") {
      if (params.farm_id) {
        contexto.getLotes({ farm_id: params.farm_id }, handleLotesResponse);
      } else {
        console.info("Parametros inválidos");
      }
    } else {
      console.info("Parametros inválidos");
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
        options={{paint:{
          "fill-color": fillColor() as string,
          "fill-outline-color":
            appcontext.loteSeleccionado == -1
              ? "blue"
              : "black" /*, "fill-outline-color": borderColor() as string , "fill-opacity": opacity() as string*/,
        } }}       
        onClick={(ev: any) => {
          setSelectedFeature(ev.features[0]);
          appcontext.setLoteSeleccionado(ev.features[0].properties.plot_id);
        }}
      />

      <MlLayer
        geojson={
          filteredGeojson
            ? filteredGeojson
            : (geojson as FeatureCollection<GeometryCollection, Properties>)
        }
        layerId="data_labels"
        options={{
          type: "symbol",
          layout: {
            "text-field": ["get", "plot_name"],
            "text-font": ["Metropolis Regular"],
          },
          paint: { "text-color": "#000" },
        }}
      />
    

      {selectedFeature && (
        <DisplayInfos
          feature={selectedFeature}
          open={true}
          closeHandler={() => {
            setSelectedFeature(undefined);
            appcontext.setLoteSeleccionado(-1);
          }}
        />
      )}
    </>
  );
}
