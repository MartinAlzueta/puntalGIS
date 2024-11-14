import "./App.css";
import { MapLibreMap, useMap } from "@mapcomponents/react-maplibre";
import Lotes from "./Capas/Lotes";
import Fondo from "./Capas/Fondo";
import Campo from "./Capas/Campo";
import TopBar from "./Componentes/TopBar";
import Referencias from "./Capas/Referencias";
import { useEffect } from "react";


import { createTheme, ThemeProvider, Button } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff", // Color del texto del botón
          backgroundColor: "#475A3C", // Color de fondo del botón
          "&:hover": {
            backgroundColor: "#738767", // Color en hover
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#475A3C", // Color del icono
          "&:hover": {
            color: "#1f3115", // Color en hover para IconButton
          },
        },
        colorPrimary: {
          color: "#475A3C", // Color del icono en estado primary
          "&:hover": {
            color: "#1f3115", // Color en hover en estado primary
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#ddd", // Color del botón de radio cuando no está seleccionado
          "&.Mui-checked": {
            color: "orangered", // Color del botón de radio cuando está seleccionado
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#738767", // Color del interruptor cuando está apagado
        },
        colorPrimary: {
          "&.Mui-checked": {
            color: "#1f3115", // Color del interruptor cuando está encendido
          },
        },
        track: {
          opacity: 0.2, // Transparencia de la pista (track)
          backgroundColor: "#738767", // Color de la pista cuando está apagado
          ".Mui-checked + &": {
            opacity: 1,
            backgroundColor: "#1f3115", // Color de la pista cuando está encendido
          },
        },
      },
    },
  },
});

function App() {

  return (
    <>
      <MapLibreMap
        options={{
          //style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          zoom: 6,
          center: [-60.039202, -34.87202],
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
        }}
      />
      <ThemeProvider theme={theme}>
      <TopBar />
      <Fondo /> 
      <Lotes />
      <Campo />
      <Referencias />
      </ThemeProvider>
    </>
  );
}

export default App;
