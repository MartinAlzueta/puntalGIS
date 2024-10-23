import React, { useState } from "react";
import { API_URL, secretKey } from '../utils/config.js'; /* mariana */
import { desencriptar } from '../utils/utils.js'; /* mariana */

const APIContext = React.createContext({});
const APIStateProvider = APIContext.Provider;
//TODO: definicion de TS para el contexto


const fetchWithToken = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  let headers = options.headers || {};
  if (token) {
    const decryptedToken = desencriptar(token, secretKey);
    headers['x-access-token'] = `${decryptedToken}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Network response was not ok: ${errorText}`);
  }

  // Verificar si la respuesta es JSON
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new SyntaxError(`Expected JSON, got ${contentType}: ${text}`);
  }
  console.info('en APIContext, ',endpoint,' devuelve ',response);
  return response.json();
};


const APIContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [campo, setCampo] = useState() 
    const [showCampo, setShowCampo] = useState(true)
 /*   
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
*/

    //Funcion para pedir los datos de lotes a la api
    function getLotes(params, callback: (data: any | {}) => void) {
      const { farm_id } = params;
      // Si no se indica campo o es menor que 1, devolver lotes vacíos
      if (!farm_id || farm_id < 1) {
        callback({});
        return;
      }
    
      fetchWithToken(`map/getFarm/${farm_id}`)
        .then(function (data) {     
          if (data.length > 0) {
            const lotes = data[0]; // Extraer los lotes del primer elemento del array
            callback(lotes);
            const nuevoCampo = data[0]?.map
            nuevoCampo.features[0].properties.name = data[0]?.name
            setCampo(nuevoCampo)            
          } else {
            callback({}); // Manejar el caso de array vacío o formato incorrecto
          }
        })
        .catch(function (error) {
          console.error('Error fetching lotes:', error);
          callback({}); // Manejar errores
        });
    }

  const stateProviderValue = {
    getLotes, 
    campo, 
    showCampo,
    setShowCampo      
  };

  return (
    <APIStateProvider value={stateProviderValue}>{children}</APIStateProvider>
  );
};

export { APIContext, APIContextProvider };
