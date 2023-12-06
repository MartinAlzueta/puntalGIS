import React from "react";
import test from '../Capas/test/respuestaPrueba.json'

const APIContext = React.createContext({});
const APIStateProvider = APIContext.Provider;
//TODO: definicion de TS para el contexto
const APIContextProvider = ({ children }: { children: React.ReactNode }) => {

  const testData = test;
  const farm_id = 267;
    
  //Funcion para pedir los datos de recorridas a la api
  function getRecorridas(callback: (data: JSON) => void) {
    fetch('http://158.69.146.130:3001/api/map/getAllScouts/' + farm_id)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        callback(json);
      });
  }

    //Funcion para pedir los datos de recorridas a la api
  function getLotes(callback: (data: JSON) => void) {
    fetch('http://158.69.146.130:3001/api/map/getXXXXX' + farm_id )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        callback(json);
      });
  }

  const stateProviderValue = {
    //getRecorridas,
    //getLotes,
testData
  };

  return (
    <APIStateProvider value={stateProviderValue}>{children}</APIStateProvider>
  );
};

export { APIContext, APIContextProvider };
