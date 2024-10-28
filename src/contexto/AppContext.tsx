import React, { useState } from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext({});
const AppStateProvider = AppContext.Provider;



const AppContextProvider = ({ children }) => {

    const [showCampo, setShowCampo] = useState(true)
    const [semaforo, setSemaforo] = useState<string>();
    const [loteSeleccionado, setLoteSeleccionado] = useState<number>(0);


  const value = {   
    showCampo,
    setShowCampo,
    semaforo,
    setSemaforo, 
    loteSeleccionado,
    setLoteSeleccionado
  };

  return <AppStateProvider value={value}>{children}</AppStateProvider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppContextProvider };