import * as CryptoJS from 'crypto-js';
import { secretKey, secretKey2, intervalo_en_minutos } from './config';

export const validQueryParams = (params) => {

    const probando = true;

    if (!params['key']) { return "Parametros insuficientes"; }
    if (!params['tkn']) { return "Parametros insuficientes"; }

    const decryptedKey = desencriptar(params['key'], secretKey);
    if (!fechaHoraValidas(decryptedKey.slice(0, 22), intervalo_en_minutos)) {
        if (!probando) { return "Acceso vencido"; };
    }

    const palabraSecreta = decryptedKey.slice(12, 12 + secretKey2.length);

    if (palabraSecreta !== secretKey2) {
        if (!probando) { return "Acceso no permitido"; };
    }

    /*  const user = decryptedKey.substring(12 + secretKey2.length);
      const user_id = parseInt(user, 10); // 10 es la base numérica (decimal)
      if (isNaN(user_id)) {
          return "Usuario " + user + " no informado");
           console.info(message);
          return false;
      }

        setUser(user_id);
        console.info('Usuario',user);*/

    const tkn = params['tkn'];
    if (tkn === '') {
        return "Token no recibido";
    }


    // Subo el token encriptado al storage
    //    setToken(tkn || '');
    localStorage.setItem('token', tkn);


    return '';
};






export const desencriptar = (encryptedString, secretKey) => {
    try {
        // Decodificar la cadena URI
        const uriDecoded = decodeURIComponent(encryptedString);

        // Desencriptar utilizando AES
        const bytes = CryptoJS.AES.decrypt(uriDecoded, secretKey);

        // Convertir los bytes a texto
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        return originalText;
    } catch (error) {
        console.error('Error al obtener key:', error);
        return null;
    }
}

export const fechaHoraValidas = (cadenaFecha, intervalo_en_minutos) => {

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Convertir la cadena de fecha a un objeto Date
    const fechaEntrada = new Date(
        parseInt(cadenaFecha.substring(0, 4)), // Año
        parseInt(cadenaFecha.substring(4, 6)) - 1, // Mes (restamos 1 porque los meses en JavaScript son de 0 a 11)
        parseInt(cadenaFecha.substring(6, 8)), // Día
        parseInt(cadenaFecha.substring(8, 10)), // Hora
        parseInt(cadenaFecha.substring(10, 12)) // Minuto
    );

    // Ajustar las fechas sumando o restando 10 minutos
    const fechaActualMas10Min = new Date(fechaActual.getTime() + intervalo_en_minutos * 60000);
    const fechaActualMenos10Min = new Date(fechaActual.getTime() - intervalo_en_minutos * 60000);

    // Comparar las fechas
    if (fechaEntrada > fechaActualMas10Min) {
        //    console.log("La fecha es superior a la fecha/hora actual en " + intervalo_en_minutos.toString() + " minutos.");
        return false;
    } else if (fechaEntrada < fechaActualMenos10Min) {
        //    console.log("La fecha es inferior a la fecha/hora actual en " + intervalo_en_minutos.toString() + " minutos.");
        return false;
    } else {
        //    console.log("La fecha está dentro del rango de +/- " + intervalo_en_minutos.toString() + " minutos de la fecha/hora actual.");
        return true;
    }
}

// Función para obtener la fecha actual en formato yyyy-mm-dd
export const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};


export const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    if ((obj1 === undefined) && (obj2 !== undefined)) return false;
    if ((obj2 === undefined) && (obj1 !== undefined)) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}


export const calculateBbox = (polygon) => {
    /*   console.info('Entre a calcular bbox con ', polygon);
       const coordinates = polygon.geometry.coordinates[0];

       let minLng = coordinates[0][0];
       let minLat = coordinates[0][1];
       let maxLng = coordinates[0][0];
       let maxLat = coordinates[0][1];

       coordinates.forEach(coord => {
           const [lng, lat] = coord;
           if (lng < minLng) minLng = lng;
           if (lat < minLat) minLat = lat;
           if (lng > maxLng) maxLng = lng;
           if (lat > maxLat) maxLat = lat;
       });

       return [minLng, minLat, maxLng, maxLat];*/

    console.info('Entre a calcular bbox con ', polygon);
    // Función para actualizar límites del bbox

    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLong = Infinity;
    let maxLong = -Infinity;

    const updateBounds = (lat, long) => {
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (long < minLong) minLong = long;
        if (long > maxLong) maxLong = long;
    };

    // Recorrer cada feature en el FeatureCollection
    polygon.features.forEach(feature => {
        const { coordinates } = feature.geometry;

        if (Array.isArray(coordinates[0])) {
            // Para polígonos, líneas, etc.
            coordinates.forEach(coordArray => {
                coordArray.forEach(([long, lat]) => {
                    updateBounds(lat, long);
                });
            });
        } else {
            // Para puntos simples
            const [long, lat] = coordinates;
            updateBounds(lat, long);
        }
    });

    return [minLong, minLat, maxLong, maxLat];

}