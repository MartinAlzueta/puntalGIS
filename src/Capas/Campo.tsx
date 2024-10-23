import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexto/DataContext";
import { AppContext } from "../contexto/AppContext"
import { MlGeoJsonLayer, MlLayer, useMap } from "@mapcomponents/react-maplibre";
import { bbox, FeatureCollection } from "@turf/turf";



export default function Campo() {
    const mapHook = useMap();
    const dataContext = useContext(DataContext) as any;
    const appContext = useContext(AppContext) as any;
  const [campo, setCampo] = useState<FeatureCollection>();


useEffect(()=>{
    if (dataContext.campo){
            setCampo(dataContext.campo)
    const newBox = bbox(dataContext.campo?.features[0]);
      mapHook.map?.fitBounds(newBox as [number, number, number, number], {
        padding: { top: 150, bottom: 175, left: 135, right: 135 },
      });
    }

}, [dataContext])
  return (
    <>
      {campo && appContext.showCampo && (
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
