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
  implementation_quality: "Calidad de implantación",
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

  console.log(plotData);

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
            <Typography variant="h6" gutterBottom>
              {plotData.plot_name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Id del lote: {plotData.plot_id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Fecha de recorrida: {getDate(plotData.date_time)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Estado: {plotData.state}
            </Typography>

            {Object.entries(plotData).map(([key, value]) => {
              // Skip the basic info fields (customize as needed)
              if (
                ["plot_name", "plot_id", "id", "date_time", "state"].includes(
                  key
                )
              )
                return null;

              // Parse sub-object fields
              const parsedValue = parseJSON(value);

              return (
                <Accordion key={key}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography variant="body2">
                          {traduccion[key]}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <SquareIcon
                          sx={{
                            color: parseJSON(plotData[key]).semaphore
                              ? ( key === "general" ? coloresGeneral : colores)[parseJSON(plotData[key]).semaphore]
                              : (key === "general" ? "rgba(2, 68, 27, 0.7)" :"rgba(158, 158, 158, 0.7)"),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    {parsedValue ? (
                      <List dense>
                        {Object.entries(parsedValue).map(
                          ([subKey, subValue]) => (
                            <ListItem key={subKey}>
                              <ListItemText
                                primary={traduccion[subKey]}
                                secondary={
                                  subValue !== null
                                    ? subValue?.toString()
                                    : "sin Datos"
                                }
                              />
                            </ListItem>
                          )
                        )}
                      </List>
                    ) : (
                      <Typography color="textSecondary">
                        No data available
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
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
