
import { MlVectorTileLayer } from "@mapcomponents/react-maplibre";

export default function GeometryVectorTileLayer() {


  return (

    <MlVectorTileLayer           
        layerId="test"
        url= 'https://wms.wheregroup.com/tileserver/tile/tileserver.php?/index.json?/europe-0-14/{z}/{x}/{y}.pbf'
        insertBeforeLayer="campo"
        layers={[
         {
                      id: "highway-area",
                      type: "fill",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: ["==", "$type", "Polygon"],
                      layout: {
                        visibility: "visible",
                      },
                      paint: {
                        "fill-color": "hsla(0, 0%, 89%, 0.56)",
                        "fill-outline-color": "#cfcdca",
                        "fill-opacity": 0.9,
                        "fill-antialias": false,
                      },
                    },
                    {
                      id: "highway-link-casing",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 13,
                      filter: [
                        "all",            
                        [
                          "in",
                          "class",
                          "primary_link",
                          "secondary_link"
                        ]],
                      paint: {
                        "line-color": "#e9ac77",
                        "line-opacity": 1,
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [8, 1.5],
                            [20, 17],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-primary-casing",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 5,
                      filter: ["all", ["in", "class", "primary"]],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#e9ac77",
                        "line-opacity": {
                          stops: [
                            [7, 0],
                            [8, 1],
                          ],
                        },
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [7, 0],
                            [8, 0.6],
                            [9, 1.5],
                            [20, 22],
                          ],
                        },
                      },
                    },
                   {
                      id: "highway-motorway-casing",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 4,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["==", "class", "motorway"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#e9ac77",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [4, 0],
                            [5, 0.4],
                            [6, 0.6],
                            [7, 1.5],
                            [20, 22],
                          ],
                        },
                        "line-opacity": {
                          stops: [
                            [4, 0],
                            [5, 1],
                          ],
                        },
                      },
                    },
                   {
                      id: "highway-path",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["==", "class", "path"],
                        ],
                      ],
                      paint: {
                        "line-color": "#cba",
                        "line-dasharray": [1.5, 0.75],
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [15, 1.2],
                            [20, 4],
                          ],
                        },
                      },
                    },
                     {
                      id: "highway-motorway-link",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 12,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["==", "class", "motorway_link"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                      },
                      paint: {
                        "line-color": "#fc8",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [12.5, 0],
                            [13, 1.5],
                            [14, 2.5],
                            [20, 11.5],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-link",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 13,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        [
                          "in",
                          "class",
                          "primary_link",
                          "secondary_link",
                          "tertiary_link",
                          "trunk_link",
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [12.5, 0],
                            [13, 1.5],
                            [14, 2.5],
                            [20, 11.5],
                          ],
                        },
                      },
                    },
                     {
                      id: "highway-secondary-tertiary",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["in", "class", "secondary", "tertiary"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [6.5, 0],
                            [8, 0.5],
                            [14, 9],
                            [20, 13],
                          ],
                        },
                      },
                    },
                     {
                      id: "highway-primary",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["in", "class", "primary"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": [
                          "interpolate",
                          ["exponential", 1],
                          ["zoom"],
                          8,
                          0.5,
                          22,
                          14,
                        ],
                      },
                    },
                    {
                      id: "highway-trunk",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["in", "class", "trunk"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [6.5, 0],
                            [7, 0.5],
                            [20, 18],
                          ],
                        },
                      },
                    },
                     {
                      id: "highway-motorway",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 5,
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["==", "class", "motorway"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fc8",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [6.5, 0],
                            [7, 0.5],
                            [20, 18],
                          ],
                        },
                      },
                    },
                     {
                      id: "railway-service",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        ["all", ["==", "class", "rail"], ["has", "service"]],
                      ],
                      paint: {
                        "line-color": "hsla(0, 0%, 73%, 0.77)",
                        "line-width": {
                          base: 1.4,
                          stops: [
                            [14, 0.4],
                            [20, 1],
                          ],
                        },
                      },
                      paint: {
                        "line-color": "#e9ac77",
                        "line-opacity": 1,
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [8, 1.5],
                            [20, 17],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-primary-casing",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 5,
                      filter: ["all", ["in", "class", "primary"]],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#e9ac77",
                        "line-opacity": {
                          stops: [
                            [7, 0],
                            [8, 1],
                          ],
                        },
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [7, 0],
                            [8, 0.6],
                            [9, 1.5],
                            [20, 22],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-motorway-casing",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 4,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["==", "class", "motorway"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#e9ac77",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [4, 0],
                            [5, 0.4],
                            [6, 0.6],
                            [7, 1.5],
                            [20, 22],
                          ],
                        },
                        "line-opacity": {
                          stops: [
                            [4, 0],
                            [5, 1],
                          ],
                        },
                      },
                    },
                   {
                      id: "highway-path",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["==", "class", "path"],
                        ],
                      ],
                      paint: {
                        "line-color": "#cba",
                        "line-dasharray": [1.5, 0.75],
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [15, 1.2],
                            [20, 4],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-motorway-link",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 12,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["==", "class", "motorway_link"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                      },
                      paint: {
                        "line-color": "#fc8",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [12.5, 0],
                            [13, 1.5],
                            [14, 2.5],
                            [20, 11.5],
                          ],
                        },
                      },
                    },
                   {
                      id: "highway-link",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 13,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        [
                          "in",
                          "class",
                          "primary_link",
                          "secondary_link",
                          "tertiary_link",
                          "trunk_link",
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [12.5, 0],
                            [13, 1.5],
                            [14, 2.5],
                            [20, 11.5],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-secondary-tertiary",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["in", "class", "secondary", "tertiary"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [6.5, 0],
                            [8, 0.5],
                            [14, 9],
                            [20, 13],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-primary",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["in", "class", "primary"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": [
                          "interpolate",
                          ["exponential", 1],
                          ["zoom"],
                          8,
                          0.5,
                          22,
                          14,
                        ],
                      },
                    },
                    {
                      id: "highway-trunk",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["in", "class", "trunk"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [6.5, 0],
                            [7, 0.5],
                            [20, 18],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-motorway",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 5,
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["==", "class", "motorway"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },                     
                      paint: {
                        "line-color": "#e9ac77",
                        "line-opacity": 1,
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [8, 1.5],
                            [20, 17],
                          ],
                        },
                      },
                    },
                   {
                      id: "highway-primary-casing",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 5,
                      filter: ["all", ["in", "class", "primary"]],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#e9ac77",
                        "line-opacity": {
                          stops: [
                            [7, 0],
                            [8, 1],
                          ],
                        },
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [7, 0],
                            [8, 0.6],
                            [9, 1.5],
                            [20, 22],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-motorway-casing",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 4,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["==", "class", "motorway"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#e9ac77",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [4, 0],
                            [5, 0.4],
                            [6, 0.6],
                            [7, 1.5],
                            [20, 22],
                          ],
                        },
                        "line-opacity": {
                          stops: [
                            [4, 0],
                            [5, 1],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-path",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["==", "class", "path"],
                        ],
                      ],
                      paint: {
                        "line-color": "#cba",
                        "line-dasharray": [1.5, 0.75],
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [15, 1.2],
                            [20, 4],
                          ],
                        },
                      },
                    },
                     {
                      id: "highway-motorway-link",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 12,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["==", "class", "motorway_link"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                      },
                      paint: {
                        "line-color": "#fc8",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [12.5, 0],
                            [13, 1.5],
                            [14, 2.5],
                            [20, 11.5],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-link",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 13,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        [
                          "in",
                          "class",
                          "primary_link",
                          "secondary_link",
                          "tertiary_link",
                          "trunk_link",
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [12.5, 0],
                            [13, 1.5],
                            [14, 2.5],
                            [20, 11.5],
                          ],
                        },
                      },
                    },
                   {
                      id: "highway-secondary-tertiary",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["in", "class", "secondary", "tertiary"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [6.5, 0],
                            [8, 0.5],
                            [14, 9],
                            [20, 13],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-primary",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["in", "class", "primary"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": [
                          "interpolate",
                          ["exponential", 1],
                          ["zoom"],
                          8,
                          0.5,
                          22,
                          14,
                        ],
                      },
                    },
                    {
                      id: "highway-trunk",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["in", "class", "trunk"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [6.5, 0],
                            [7, 0.5],
                            [20, 18],
                          ],
                        },    
                    }                  
                    },
                    {
                      id: "highway-motorway",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 5,
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["==", "class", "motorway"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },                 
                      paint: {
                        "line-color": "#e9ac77",
                        "line-opacity": 1,
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [8, 1.5],
                            [20, 17],
                          ],
                        },
                      },  
                    },                  
                    {
                      id: "highway-primary-casing",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 5,
                      filter: ["all", ["in", "class", "primary"]],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#e9ac77",
                        "line-opacity": {
                          stops: [
                            [7, 0],
                            [8, 1],
                          ],
                        },
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [7, 0],
                            [8, 0.6],
                            [9, 1.5],
                            [20, 22],
                          ],
                        },
                      },
                    },
                     {
                      id: "highway-motorway-casing",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 4,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["==", "class", "motorway"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#e9ac77",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [4, 0],
                            [5, 0.4],
                            [6, 0.6],
                            [7, 1.5],
                            [20, 22],
                          ],
                        },
                        "line-opacity": {
                          stops: [
                            [4, 0],
                            [5, 1],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-path",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["==", "class", "path"],
                        ],
                      ],
                      paint: {
                        "line-color": "#cba",
                        "line-dasharray": [1.5, 0.75],
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [15, 1.2],
                            [20, 4],
                          ],
                        },
                      },
                    },
                   {
                      id: "highway-motorway-link",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 12,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["==", "class", "motorway_link"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                      },
                      paint: {
                        "line-color": "#fc8",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [12.5, 0],
                            [13, 1.5],
                            [14, 2.5],
                            [20, 11.5],
                          ],
                        },
                      },
                    },
              {
                      id: "highway-link",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 13,
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        [
                          "in",
                          "class",
                          "primary_link",
                          "secondary_link",
                          "tertiary_link",
                          "trunk_link",
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [12.5, 0],
                            [13, 1.5],
                            [14, 2.5],
                            [20, 11.5],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-secondary-tertiary",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["!in", "brunnel", "bridge", "tunnel"],
                        ["in", "class", "secondary", "tertiary"],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [6.5, 0],
                            [8, 0.5],
                            [14, 9],
                            [20, 13],
                          ],
                        },
                      },
                    },
                    {
                      id: "highway-primary",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["in", "class", "primary"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": [
                          "interpolate",
                          ["exponential", 1],
                          ["zoom"],
                          8,
                          0.5,
                          22,
                          14,
                        ],
                      },
                    },
                 {
                      id: "highway-trunk",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["in", "class", "trunk"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fea",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [6.5, 0],
                            [7, 0.5],
                            [20, 18],
                          ],
                        },
                      },
                    },
                  {
                      id: "highway-motorway",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      minzoom: 5,
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["==", "class", "motorway"],
                        ],
                      ],
                      layout: {
                        "line-cap": "round",
                        "line-join": "round",
                        visibility: "visible",
                      },
                      paint: {
                        "line-color": "#fc8",
                        "line-width": {
                          base: 1.2,
                          stops: [
                            [6.5, 0],
                            [7, 0.5],
                            [20, 18],
                          ],
                        },
                      },
                    },
                 {
                      id: "railway-service",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        ["all", ["==", "class", "rail"], ["has", "service"]],
                      ],
                      paint: {
                        "line-color": "hsla(0, 0%, 73%, 0.77)",
                        "line-width": {
                          base: 1.4,
                          stops: [
                            [14, 0.4],
                            [20, 1],
                          ],
                        },
                      },
                    },
              {
                      id: "railway",
                      type: "line",
                      metadata: {
                        "mapbox:group": "1444849345966.4436",
                      },
            
                      "source-layer": "transportation",
                      filter: [
                        "all",
                        ["==", "$type", "LineString"],
                        [
                          "all",
                          ["!has", "service"],
                          ["!in", "brunnel", "bridge", "tunnel"],
                          ["==", "class", "rail"],
                        ],
                      ],
                      paint: {
                        "line-color": "#bbb",
                        "line-width": {
                          base: 1.4,
                          stops: [
                            [14, 0.4],
                            [15, 0.75],
                            [20, 2],
                          ],
                        },
                      },
                    }                        
        ] as any}    
      sourceOptions={{ minzoom: 8, maxzoom: 18 } as any}
 />
  );
}
