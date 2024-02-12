import React from "react";

const APIContext = React.createContext({});
const APIStateProvider = APIContext.Provider;
//TODO: definicion de TS para el contexto
const APIContextProvider = ({ children }: { children: React.ReactNode }) => {

    
  //Funcion para pedir los datos de recorridas a la api
  function getRecorridas(callback: (data: JSON) => void) {
    fetch('http://158.69.146.130:3001/api/map/getFarmState/35/2023-11-11')
      .then(function (response) {
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function (json) {
        callback(json);
      });
  }

    //Funcion para pedir los datos de recorridas a la api
  function getLotes(params: {scout_id: number}, callback: (data: JSON) => void) {
    fetch('http://158.69.146.130:3001/api/map/getXXXXX' + params.scout_id )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        callback(json);
      });
  }

  const stateProviderValue = {
    getRecorridas  
    
  };

  return (
    <APIStateProvider value={stateProviderValue}>{children}</APIStateProvider>
  );
};

export { APIContext, APIContextProvider };
