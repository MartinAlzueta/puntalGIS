import React, { useState } from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext({});
const AppStateProvider = AppContext.Provider;

const AppContextProvider = ({ children }) => {

    const [showCampo, setShowCampo] = useState(true)


  const value = {   
    showCampo,
    setShowCampo 
  };

  return <AppStateProvider value={value}>{children}</AppStateProvider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppContextProvider };