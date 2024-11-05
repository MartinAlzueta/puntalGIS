import { useContext } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SquareIcon from "@mui/icons-material/Square";

import { AppContext } from "../contexto/AppContext";

const traduccion = {
  plot_name: "Lote",
  plot_id: "Id del lote",
  pests: "Plagas",
  weeds: "Maleza",
  diseases: "Enfermedades",
  general: "Condición general",
  adversities: "Adversidades",
  implementation_quality: "Implantación",
  id: "ID de la recorrida",
  date_time: "Fecha",
  harvest_quality: "Calidad de la cosecha",
  decision: "Decisión",
  semaphore: "Semáforo",
  state: "Estado",
};

const colores = {
  "0": "rgba(158, 158, 158, 0.7)",
  "1": "rgba(76, 175, 80, 0.7)",
  "2": "rgba(255, 235, 59, 0.7)",
  "3": "rgba(255, 152, 0, 0.7)",
  "4": "rgba(244, 67, 54, 0.7)",
};

const coloresGeneral = {
    0:
    "rgba(2, 68, 27, 0.7)",
    1:
    "rgba(76, 175, 80, 0.7)",
    2:
    "rgba(158, 158, 158, 0.7)",
    3:
    "rgba(255, 152, 0, 0.7)",
    4:
    "rgba(244, 67, 54, 0.7)",
}

export default function DisplayInfos() {
  const appContext = useContext(AppContext) as any;
  const plotData = appContext.selectedFeature?.properties;

  const parseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  };

  const getDate = (dateStr:string)=>{
    const date = new Date(dateStr);   
    return date.toLocaleDateString('es-LA')
  }
  return (
    <>
     
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {plotData && (
          <div>
            <Typography variant="body1" >
              {plotData.plot_name}
            </Typography>

            <Typography variant="body1" >
              Fecha de recorrida: {getDate(plotData.date_time)}
            </Typography>
            {Object.entries(plotData).map(([key]) => {
              // Skip the basic info fields (customize as needed)
              if (
                ["plot_name", "plot_id", "id", "date_time", "state"].includes(
                  key
                )
              )
                return null;

         
              return (
                
                <Grid container justifyContent="space-between" spacing={1} key={key}>
                  
                <Grid item xs={6}>
                  <Typography variant="caption" >
                    {traduccion[key]}
                  </Typography>
                </Grid>
                <Grid item xs={6}> {/* Caja alineada a la derecha */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '6px',
                      height: 22,
                      borderRadius: '4px', // Bordes redondeados
                      backgroundColor: parseJSON(plotData[key]).semaphore
                        ? (key === "general" ? coloresGeneral : colores)[parseJSON(plotData[key]).semaphore]
                        : (key === "general" ? "rgba(2, 68, 27, 0.7)" : "rgba(158, 158, 158, 0.7)"),
                            
                     // border: '1px solid black', 
                    }}
                  >
                    <Typography variant="caption" sx={{ whiteSpace: "nowrap"}} >
                    {parseJSON(plotData[key]).decision ?? "s/d"}
                        </Typography>
                  </Box>
                </Grid>
              </Grid>
              );
            })}
          </div>
        )}
      </List> 
      <Button
        variant="outlined"
        onClick={() => appContext.setSelectedFeature(undefined)}
      >
        {" "}
        limpiar selección{" "}
      </Button>
    </>
  );
}