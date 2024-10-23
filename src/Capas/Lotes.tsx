import { useContext, useEffect, useState } from "react";
import { DataContext } from "../contexto/DataContext";
//import lotes from "./test/lotes_prueba.json";
import {
  useMap,
  MlGeoJsonLayer,
  TopToolbar,
  MlLayer,
} from "@mapcomponents/react-maplibre";
import createGeojson, { campoType } from "../../utils/createGeojson";
import {
  bbox,
  FeatureCollection,
  GeometryCollection,
  Properties,
} from "@turf/turf";
import { InputLabel, Select, MenuItem, Switch } from "@mui/material";
import DisplayInfos from "../Componentes/DisplayInfo";
import { validQueryParams } from "../utils/utils.js";

interface queryParamsType {
  scout?: string;
  farm_id?: number;
  scout_id?: number;
  plot_id?: number;
}

const semaforos = [
  { label: "ninguno", field: "ninguno" },
  { label: "general", field: "general" },
  { label: "enfermedades", field: "diseases" },
  { label: "calidad de implantación", field: "implementation_quality" },
  { label: "plagas", field: "pests" },
  { label: "malezas", field: "weeds" },
  { label: "adversidades", field: "adversities" },
];

export default function Lotes() {
  const mapHook = useMap();
  const contexto = useContext(DataContext) as any;

  const [lote, setLote] = useState<number>(0);
  const [campo, setCampo] = useState<campoType>();
  const [lotesList, setLotesList] = useState<any[]>([]);
  const [semaforo, setSemaforo] = useState<string>(semaforos[0].field);
  const [filteredGeojson, setFilteredGeojson] = useState<any>();
  const [selectedFeature, setSelectedFeature] = useState<any>();
  const [geojson, setGeoJson] = useState<any>();

  const fillColor = () => {
    if (semaforo && semaforo != "ninguno" && semaforo != "general") {
      return [
        "match",
        ["get", "semaphore", ["get", semaforo]],
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
    } else if (semaforo && semaforo == "general") {
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
        paint={{
          "fill-color": fillColor() as string,
          "fill-outline-color":
            lote == -1
              ? "blue"
              : "black" /*, "fill-outline-color": borderColor() as string , "fill-opacity": opacity() as string*/,
        }}
        onClick={(ev: any) => {
          setSelectedFeature(ev.features[0]);
          setLote(ev.features[0].properties.plot_id);
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
    

      {/* <TopToolbar
        unmovableButtons={
          <>
            <InputLabel>Ver campo: </InputLabel>
            <Switch
              checked={contexto.showCampo}
              onChange={() => contexto.setShowCampo(!contexto.showCampo)}
            />
            <InputLabel>Lote</InputLabel>
            <Select
              id="plot_name"
              label="lote"
              value={lote}
              onChange={(ev) => setLote(ev.target.value as number)}
            >
              {campo &&
                geojson &&
                lotesList.map((el) => (
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
      /> */}

      {selectedFeature && (
        <DisplayInfos
          feature={selectedFeature}
          open={true}
          closeHandler={() => {
            setSelectedFeature(undefined);
            setLote(-1);
          }}
        />
      )}
    </>
  );
}
