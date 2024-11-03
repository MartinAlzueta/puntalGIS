import { useContext } from "react";
import { List, ListItemText, Button } from "@mui/material";

import { AppContext } from "../contexto/AppContext";

export default function DisplayInfos() {
    const appContext = useContext(AppContext) as any;

  return (
    <>
   <Button variant="outlined" onClick={()=>appContext.setSelectedFeature(undefined)}> limpiar selección </Button>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,       
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {appContext.selectedFeature &&
          Object.keys(appContext.selectedFeature.properties).map((el) => (
            <ListItemText key={el}>
              {el} : {appContext.selectedFeature.properties?.[el]}
            </ListItemText>
          ))}
      </List>  
    </>
   
  );
}
