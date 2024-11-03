import { useContext } from "react";

import {AppBar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
  } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import "simplebar-react/dist/simplebar.min.css";

import ExportPDF from "./ExportPDF";
import Tools from "./Tools";
import DisplayInfos from "./DisplayInfo";
import { AppContext } from "../contexto/AppContext";
import { DataContext } from "../contexto/DataContext";


export default function SideBar(props: any) {
  const appContext = useContext(AppContext) as any;
  const dataContext = useContext(DataContext) as any;

  const menus = [{
    title: "Filtros",
    child: <Tools />,
    icon: <FilterAltIcon />
  }, {
    title: "Exportar mapa",
    child: <ExportPDF
    titulo={
      appContext.loteSeleccionado !== -1
        ? dataContext.lotesList.filter(
            (lote) => lote.id == appContext.loteSeleccionado
          )[0].name
        : dataContext.campo?.features[0].properties.name
    }
  />,
  icon: <PictureAsPdfIcon />
  }
//   ,{
//     title: "Información",
//     child: <DisplayInfos />,
//     icon: undefined 
// } 
];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        style={{
          paddingTop: "74px",
          backgroundColor: "rgba(255,255,255)",
          zIndex: 1050,
          left: 0,
          height: props.open ? "100%" : "0px",
          width: props.open ? "256px" : "0px",
        }}
      >
        {props.open && menus.map((item)=> <Accordion>
              <AccordionSummary>
                {item.icon}
                <Typography variant="body2" sx={{paddingLeft: 1}}>{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
               {item.child}
              </AccordionDetails>
            </Accordion>)
        
       
        }
      </AppBar>
    </>
  );
}
