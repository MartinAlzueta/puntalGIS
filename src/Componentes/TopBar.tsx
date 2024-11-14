<<<<<<< HEAD
import { useContext, useState } from "react";

import { AppBar, Typography, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Tools from "./Tools";
import SideBar from "./SideBar";
import { MlCreatePdfButton } from "@mapcomponents/react-maplibre";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { AppContext } from "../contexto/AppContext";
import ExportPDF from "./ExportPDF";

export default function TopBar() {
  const [open, setOpen] = useState(true);
  const appContext = useContext(AppContext) as any;
=======
import Tools from "./Tools";
import  SideBar from "./SideBar";
import { AppContext } from "../contexto/AppContext";
import { useContext } from "react";

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Modal, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
//import PrintIcon from '@mui/icons-material/Print';
//import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ExportPDF from "./ExportPDF";

export default function TopBar() {
  const appContext = useContext(AppContext) as any;
  const [open, setOpen] = useState(true);           // Controla el menú lateral


>>>>>>> 41cbaed3712e0c28fcd9ebb1e433327188d3b96e
  return (
    <>
      <AppBar
        sx={{
          minHeight: "62px",
          position: "absolute",
          zIndex: 1300,
          top: 0,
          backgroundColor: "#475A3C",
          maxHeight: "64px",
          justifyContent: "space-between",
          boxShadow: "0 3px 5px -1px #0003,0 6px 10px #00000024,0 1px 18px #0000001f",
        }}
      >
        <Toolbar>
<<<<<<< HEAD
=======
          
>>>>>>> 41cbaed3712e0c28fcd9ebb1e433327188d3b96e
          <IconButton sx={{ color: "white" }} onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            fontWeight={550}
            fontFamily="Roboto, Helvetica Neue, sans-serif"
            paddingLeft={1}
            sx={{ flexGrow: 1 }}
          >
            Puntal Agro
          </Typography>
<<<<<<< HEAD
          <IconButton size="large" sx={{color: appContext.showPdfForm ? "white" : "#ffff", backgroundColor:"#e57d48", ml: "auto"}} onClick={()=> appContext.setShowPdfForm(!appContext.showPdfForm)}>
          <PictureAsPdfIcon />
        </IconButton>
=======

   <ExportPDF
    showForm={appContext.showPdfForm}
    titulo={'Exportar'}
  />
>>>>>>> 41cbaed3712e0c28fcd9ebb1e433327188d3b96e
        </Toolbar>
      
      </AppBar>

      <SideBar open={open} setOpen={setOpen}>
        <Tools />
      </SideBar>

      <ExportPDF showForm={appContext.showPdfForm} />
    </>
  );
}
