import { useContext, useEffect } from "react";
import { InputLabel, Select, MenuItem, Switch, Box, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AppContext } from "../contexto/AppContext";
import { DataContext } from "../contexto/DataContext";
import ExportPDF from "./ExportPDF";

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
    appContext.set
}, [])
return (
    
    <> <Box sx={{padding: 2}}>

        <InputLabel>Ver campo: </InputLabel>
            <Switch
              checked={appContext.showCampo}
              onChange={() => appContext.setShowCampo(!appContext.showCampo)}
            />
            <InputLabel>Lote</InputLabel>
            <Select
              id="plot_name"
              label="lote"
              value={appContext.loteSeleccionado}
              onChange={(ev) => appContext.setLoteSeleccionado(ev.target.value as number)}
              fullWidth
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
              fullWidth
            >
              {semaforos.map((el) => {
                return (
                  <MenuItem key={el.label} value={el.field}>
                    {el.label}
                  </MenuItem>
                );
              })}
            </Select>
            <Accordion variant="outlined" sx={{marginTop: "20px"}} >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Exportar mapa</Typography>
        </AccordionSummary>
        <AccordionDetails>
                   <ExportPDF titulo={appContext.loteSeleccionado !== -1 ? dataContext.lotesList.filter((lote)=>lote.id == appContext.loteSeleccionado)[0].name : dataContext.campo.features[0].properties.name}/>

        </AccordionDetails>
      </Accordion>
    </Box>
            
          </>   
   
)

}