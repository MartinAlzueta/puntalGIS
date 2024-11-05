import { useContext } from "react";

import {AppBar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
  } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InfoIcon from '@mui/icons-material/Info';
import "simplebar-react/dist/simplebar.min.css";

import ExportPDF from "./ExportPDF";
import Tools from "./Tools";
import DisplayInfos from "./DisplayInfo";
import { AppContext } from "../contexto/AppContext";
import { DataContext } from "../contexto/DataContext";


export default function SideBar(props: any) {
  const appContext = useContext(AppContext) as any;
  const dataContext = useContext(DataContext) as any;

  // objeto en el qeu se definen los menus
  const menus = [{
    title: "Filtros",
    child: <Tools />,
    icon: <FilterAltIcon /> 
  }, {
    title: "Información del Lote",
    child:  appContext.selectedFeature ? (
        <DisplayInfos />
      ) : <Typography variant="body1"> Seleccione un lote para ver la información. </Typography>,
    icon: <InfoIcon />,
    onExpand: (expanded: boolean)=> !expanded && appContext.setSelectedFeature(undefined),
    expanded: !!appContext.selectedFeature,
    disabled: !appContext.selectedFeature,
} , {
    title: "Exportar mapa",
    child: <ExportPDF
    showForm={appContext.showPdfForm}
    titulo={
      appContext.loteSeleccionado !== -1
        ? dataContext.lotesList.filter(
            (lote) => lote.id == appContext.loteSeleccionado
          )[0].name
        : dataContext.campo?.features[0].properties.name
    }
  />,
  icon: <PictureAsPdfIcon />,
  onExpand: (expanded: boolean)=> appContext.setShowPdfForm(expanded)
  }
];

  return (
    <>
      <AppBar
        position="fixed"
        //elevation={1}               
        style={{
          paddingTop: "74px",
          backgroundColor: "rgba(255,255,255)",
          zIndex: 1050,
          left: 0,
          height: props.open ? "100%" : "0px",
          width: props.open ? "300px" : "0px",
          overflowY: 'auto'
        }}
      >
        {props.open && menus.map((item)=> <Accordion expanded={item.expanded??undefined} disabled={item.disabled?? undefined} onChange={item.onExpand ? (_ev, isExpanded)=> item.onExpand(isExpanded): undefined} key={item.title}>
              <AccordionSummary >
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
