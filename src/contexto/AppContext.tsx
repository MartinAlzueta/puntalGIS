import React, { useState } from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext({});
const AppStateProvider = AppContext.Provider;

const AppContextProvider = ({ children }) => {
  const [showCampo, setShowCampo] = useState(true);
  const [showReferencias, setShowReferencias] = useState(true);
  const [showTerciarias, setShowTerciarias] = useState(true);
  const [showSatelite, setShowSatelite] = useState(true);
  const [semaforo, setSemaforo] = useState<string>();
  const [decision, setDecision] = useState<string>("Todas");
  const [loteSeleccionado, setLoteSeleccionado] = useState<number>(-1);
  const [selectedFeature, setSelectedFeature] = useState<any>();
  const [showPdfForm, setShowPdfForm] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const value = {
    showCampo,
    setShowCampo,
    showReferencias,
    setShowReferencias,
    showTerciarias,
    setShowTerciarias,
    showSatelite,
    setShowSatelite,
    semaforo,
    setSemaforo,
    decision,
    setDecision,
    loteSeleccionado,
    setLoteSeleccionado,
    selectedFeature,
    setSelectedFeature,
    showPdfForm,
    setShowPdfForm,
    showFilters,
    setShowFilters,
  };

  return <AppStateProvider value={value}>{children}</AppStateProvider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppContextProvider };
