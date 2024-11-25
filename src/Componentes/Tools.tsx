import { useContext, useEffect, useState } from "react";
import {
  InputLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Switch,
  Tooltip,
  Typography,
  Box
} from "@mui/material";
import { AppContext } from "../contexto/AppContext";
import { DataContext } from "../contexto/DataContext";

import SpaIcon from "@mui/icons-material/Spa";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import AdbIcon from "@mui/icons-material/Adb";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

import Down from "@mui/icons-material/KeyboardArrowDown";
import Up from "@mui/icons-material/KeyboardArrowUp";

const semaforos = [
  { label: "Ninguno", field: "ninguno", icon: <DoNotDisturbIcon /> },
  { label: "General", field: "general", icon: <AssessmentIcon /> },
  { label: "Enfermedades", field: "diseases", icon: <AdbIcon /> },
  {
    label: "Calidad de implantación",
    field: "implementation_quality",
    icon: <SpaIcon />,
  },
  { label: "Plagas", field: "pests", icon: <LocalHospitalIcon /> },
  { label: "Malezas", field: "weeds", icon: <LocalFloristIcon /> },
  { label: "Adversidades", field: "adversities", icon: <AcUnitIcon /> },
];

const decision = [
  "Todas",
  "Sin datos",
  " No intervenir",
  "Revisar en 3-7 días",
  "Intervenir",
];

export default function Tools() {
  const appContext = useContext(AppContext) as any;
  const dataContext = useContext(DataContext) as any;

  const [masOpciones, setMasOpciones] = useState(false);

  useEffect(() => {
    appContext.setSemaforo(semaforos[0].field);
    appContext.setDecision(decision[0]);
  }, []);
  return (
    <>
      <Grid container alignItems="center" paddingBlockEnd={3}>
        <Grid item xs={12}>
          <InputLabel>Lote: </InputLabel>
        </Grid>
        <Grid item xs={12}>
          <Select
            id="plot_name"
            label="lote"
            value={appContext.loteSeleccionado}
            onChange={(ev) =>
              appContext.setLoteSeleccionado(ev.target.value as number)
            }
            fullWidth
          >
            {dataContext.campo &&
              dataContext.lotesList.map((el) => (
                <MenuItem key={el.id} value={el.id}>
                  {el.name}
                </MenuItem>
              ))}
          </Select>
        </Grid>
      </Grid>

      <Grid container alignItems="center" paddingBlockEnd={3}>
        <Grid item xs={12}>
          <InputLabel>Semaforos: </InputLabel>
        </Grid>
        {semaforos.map((el) => {
          return (
            <Grid item xs={3} key={el.label}>
              <Tooltip title={el.label}>
                <IconButton
                  onClick={() => appContext.setSemaforo(el.field)}
                  color={
                    appContext.semaforo === el.field ? "primary" : "secondary"
                  }
                  size="large"
                >
                  {el.icon}
                </IconButton>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>

      <Grid container alignItems="center" paddingBlockEnd={3}>
        <Grid item xs={12}>
          <InputLabel>Decisión: </InputLabel>
        </Grid>

        <Grid item xs={12}>
          <Select
            id="decision"
            label="Decisión"
            value={appContext.decision}
            onChange={(ev) => appContext.setDecision(ev.target.value)}
            fullWidth
          >
            {decision.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {!masOpciones ? (
        <>
          <Typography> Más opciones </Typography><IconButton onClick={() => setMasOpciones(true)}>
            <Down />
          </IconButton>
        </>
      ) : (
        <>
          <Typography> Menos opciones </Typography><IconButton onClick={() => setMasOpciones(false)}>           
            <Up />
          </IconButton>
        </>
      )}
      </Box>
      {masOpciones && (
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <InputLabel>Ver campo: </InputLabel>
          </Grid>
          <Grid item xs={2}>
            <Switch
              checked={appContext.showCampo}
              onChange={() => appContext.setShowCampo(!appContext.showCampo)}
            />
          </Grid>

          <Grid item xs={10}>
            <InputLabel>Satélite: </InputLabel>
          </Grid>

          <Grid item xs={2}>
            <Switch
              checked={appContext.showSatelite}
              onChange={() =>
                appContext.setShowSatelite(!appContext.showSatelite)
              }
            />
          </Grid>

          <Grid item xs={10}>
            <InputLabel>Referencias geográficas: </InputLabel>
          </Grid>
          <Grid item xs={2}>
            <Switch
              checked={appContext.showReferencias}
              onChange={() =>
                appContext.setShowReferencias(!appContext.showReferencias)
              }
            />
          </Grid>

          <Grid item xs={10}>
            <InputLabel>Red vial terciaria: </InputLabel>
          </Grid>

          <Grid item xs={2}>
            <Switch
              checked={appContext.showTerciarias}
              onChange={() =>
                appContext.setShowTerciarias(!appContext.showTerciarias)
              }
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
