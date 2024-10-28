import { useContext, useEffect } from "react";
import { InputLabel, Select, MenuItem, Switch } from "@mui/material";
import { AppContext } from "../contexto/AppContext";
import { DataContext } from "../contexto/DataContext";

const semaforos = [
    { label: "ninguno", field: "ninguno" },
    { label: "general", field: "general" },
    { label: "enfermedades", field: "diseases" },
    { label: "calidad de implantación", field: "implementation_quality" },
    { label: "plagas", field: "pests" },
    { label: "malezas", field: "weeds" },
    { label: "adversidades", field: "adversities" },
  ];



export default function Tools(){

const appContext = useContext(AppContext) as any;
const dataContext = useContext(DataContext) as any;

useEffect(()=>{
    appContext.setSemaforo(semaforos[0].field)
}, [])
return (
    
    <>
            <InputLabel>Ver campo: </InputLabel>
            <Switch
              checked={appContext.showCampo}
              onChange={() => appContext.setShowCampo(!appContext.showCampo)}
            />
            <InputLabel>Lote</InputLabel>
            <Select
              id="plot_name"
              label="lote"
              value={appContext.lote}
              onChange={(ev) => appContext.setLoteSeleccionado(ev.target.value as number)}
            >
              {dataContext.campo &&              
                dataContext.lotesList.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
            </Select>

            <InputLabel>Semaforos</InputLabel>
            <Select
              id="semaforos"
              label="semaforos"
              defaultValue={appContext.semaforo}
              onChange={(ev) => appContext.setSemaforo(ev.target.value as string)}
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
   
)

}