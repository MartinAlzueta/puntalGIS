import React, { useState } from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext({});
const AppStateProvider = AppContext.Provider;

const AppContextProvider = ({ children }) => {
  const [showCampo, setShowCampo] = useState(true);
  const [semaforo, setSemaforo] = useState<string>("ninguno");
  const [loteSeleccionado, setLoteSeleccionado] = useState<number>(-1);
  const [selectedFeature, setSelectedFeature] = useState<any>();
  const [showPdfForm, setShowPdfForm] =useState(false)

  const value = {
    showCampo,
    setShowCampo,
    semaforo,
    setSemaforo,
    loteSeleccionado,
    setLoteSeleccionado,
    selectedFeature,
    setSelectedFeature,
    showPdfForm,
    setShowPdfForm
  };

  return <AppStateProvider value={value}>{children}</AppStateProvider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppContextProvider };
