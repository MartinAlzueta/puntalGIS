
import { AppBar} from "@mui/material";


import "simplebar-react/dist/simplebar.min.css";

export default function SideBar(props) {
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
        {props.open && props.children}
      </AppBar>
    </>
  );
}
