import { useState, useEffect, useContext } from "react";
import { APIContext } from "../contexto/APIContext";
import { MlGeoJsonLayer, MlLayer, useMap } from "@mapcomponents/react-maplibre";
import { bbox, FeatureCollection } from "@turf/turf";



export default function Campo() {
    const mapHook = useMap();
    const contexto = useContext(APIContext) as any;
  const [campo, setCampo] = useState<FeatureCollection>();


useEffect(()=>{
    if (contexto.campo){
            setCampo(contexto.campo)
    const newBox = bbox(contexto.campo?.features[0]);
      mapHook.map?.fitBounds(newBox as [number, number, number, number], {
        padding: { top: 150, bottom: 175, left: 135, right: 135 },
      });
    }

}, [contexto])
  return (
    <>
      {campo && contexto.showCampo && (
        <>
          <MlGeoJsonLayer layerId="campo" insertBeforeLayer="data_layer" geojson={campo} paint={{"fill-color": "rgba(255, 255, 255, 0.2)" }} />
          <MlLayer geojson={campo} insertBeforeLayer="data_layer" layerId="campo_labels" options={{
          type: "symbol",
          layout: {
            "text-field": ["get", "name"],
            "text-font": ["Metropolis Regular"],
          },
          paint: { "text-color": "#000" },
        }}/>
        </>
      )}
    </>
  );
}
