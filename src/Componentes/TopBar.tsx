import { useState } from "react";

import { AppBar, Typography, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Tools from "./Tools";
import  SideBar from "./SideBar";


export default function TopBar() {
    const [open, setOpen] = useState(false);
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
          boxShadow:
            "0 3px 5px -1px #0003,0 6px 10px #00000024,0 1px 18px #0000001f",
        }}
      >
        <Toolbar>
            <IconButton sx={{color: "white"}} onClick={()=>setOpen(!open)}>
                 <MenuIcon />
            </IconButton>
         
          <Typography
            variant="h5"
            fontWeight={550}
            //   fontSize="20px"
            //   lineHeight="32px"
            fontFamily="Roboto, Helvetica Neue, sans-serif"
            paddingLeft={1}
          >
            Puntal Agro
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar open={open} setOpen={setOpen} >
        <Tools />
      </SideBar>
    </>
  );
}
