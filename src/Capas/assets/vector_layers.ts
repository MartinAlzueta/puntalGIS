export const layers =  [
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
        ["in", "class", "primary_link", "secondary_link"],
      ],
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
    },
    {
      id: "highway-name-path",
      type: "symbol",
      "source-layer": "transportation_name",
      minzoom: 15.5,
      filter: ["all", ["==", "class", "path"], ["!has", "name:de"]],
      layout: {
        "text-size": {
          base: 1,
          stops: [
            [13, 12],
            [14, 13],
          ],
        },
        "text-font": ["Open Sans Regular"],
        "text-field": "{name:latin} {name:nonlatin}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-halo-color": "#f8f4f0",
        "text-color": "hsl(30, 23%, 62%)",
        "text-halo-width": 0.5,
      },
    },
    {
      id: "highway-name-path-en",
      type: "symbol",
      "source-layer": "transportation_name",
      minzoom: 15.5,
      filter: ["all", ["==", "class", "path"], ["has", "name:de"]],
      layout: {
        "text-size": {
          base: 1,
          stops: [
            [13, 12],
            [14, 13],
          ],
        },
        "text-font": ["Open Sans Regular"],
        "text-field": "{name:de} {name:nonlatin}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-halo-color": "#f8f4f0",
        "text-color": "hsl(30, 23%, 62%)",
        "text-halo-width": 0.5,
      },
    },
    {
      id: "highway-name-minor",
      type: "symbol",
      "source-layer": "transportation_name",
      minzoom: 15,
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "minor", "service", "track"],
        ["!has", "name:de"],
      ],
      layout: {
        "text-size": {
          base: 1,
          stops: [
            [13, 12],
            [14, 13],
          ],
        },
        "text-font": ["Open Sans Regular"],
        "text-field": "{name:latin} {name:nonlatin}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-halo-blur": 0.5,
        "text-color": "#765",
        "text-halo-width": 1,
      },
    },
    {
      id: "highway-name-minor-en",
      type: "symbol",
      "source-layer": "transportation_name",
      minzoom: 15,
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "minor", "service", "track"],
        ["has", "name:de"],
      ],
      layout: {
        "text-size": {
          base: 1,
          stops: [
            [13, 12],
            [14, 13],
          ],
        },
        "text-font": ["Open Sans Regular"],
        "text-field": "{name:de} {name:nonlatin}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-halo-blur": 0.5,
        "text-color": "#765",
        "text-halo-width": 1,
      },
    },
    {
      id: "highway-name-major",
      type: "symbol",
      "source-layer": "transportation_name",
      minzoom: 12.2,
      filter: [
        "all",
        ["in", "class", "primary", "secondary", "tertiary", "trunk"],
        ["!has", "name:de"],
      ],
      layout: {
        "text-size": {
          base: 1,
          stops: [
            [13, 12],
            [14, 13],
          ],
        },
        "text-font": ["Open Sans Regular"],
        "text-field": "{name:latin} {name:nonlatin}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-halo-blur": 0.5,
        "text-color": "#765",
        "text-halo-width": 1,
      },
    },
    {
      id: "highway-name-major-en",
      type: "symbol",
      "source-layer": "transportation_name",
      minzoom: 12.2,
      filter: [
        "all",
        ["in", "class", "primary", "secondary", "tertiary", "trunk"],
        ["has", "name:de"],
      ],
      layout: {
        "text-size": {
          base: 1,
          stops: [
            [13, 12],
            [14, 13],
          ],
        },
        "text-font": ["Open Sans Regular"],
        "text-field": "{name:de} {name:nonlatin}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-halo-blur": 0.5,
        "text-color": "#765",
        "text-halo-width": 1,
      },
    },
    {
      id: "highway-shield",
      type: "symbol",
      "source-layer": "transportation_name",
      minzoom: 8,
      filter: [
        "all",
        ["<=", "ref_length", 6],
        ["==", "$type", "LineString"],
        ["!in", "network", "us-interstate", "us-highway", "us-state"],
      ],
      layout: {
        "text-size": 10,
        "icon-image": "road_{ref_length}",
        "icon-rotation-alignment": "viewport",
        "symbol-spacing": 200,
        "text-font": ["Open Sans Semibold"],
        "symbol-placement": {
          base: 1,
          stops: [
            [10, "point"],
            [11, "line"],
          ],
        },
        "text-rotation-alignment": "viewport",
        "icon-size": 1,
        "text-field": "{ref}",
      },
      paint: {},
    },
    {
      id: "place-other",
      type: "symbol",
      metadata: {
        "mapbox:group": "1444849242106.713",
      },
      "source-layer": "place",
      filter: [
        "all",
        ["!in", "class", "city", "town", "village"],
        ["!has", "name:de"],
      ],
      layout: {
        "text-letter-spacing": 0.1,
        "text-size": {
          base: 1.2,
          stops: [
            [12, 10],
            [15, 14],
          ],
        },
        "text-font": ["Open Sans Bold"],
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-transform": "uppercase",
        "text-max-width": 9,
      },
      paint: {
        "text-color": "#633",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)",
      },
    },
    {
      id: "place-other-en",
      type: "symbol",
      metadata: {
        "mapbox:group": "1444849242106.713",
      },
      "source-layer": "place",
      filter: [
        "all",
        ["!in", "class", "city", "town", "village"],
        ["has", "name:de"],
      ],
      layout: {
        "text-letter-spacing": 0.1,
        "text-size": {
          base: 1.2,
          stops: [
            [12, 10],
            [15, 14],
          ],
        },
        "text-font": ["Open Sans Bold"],
        "text-field": "{name:de}\n{name:nonlatin}",
        "text-transform": "uppercase",
        "text-max-width": 9,
      },
      paint: {
        "text-color": "#633",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)",
      },
    },
    {
      id: "place-village",
      type: "symbol",
      metadata: {
        "mapbox:group": "1444849242106.713",
      },
      "source-layer": "place",
      filter: ["all", ["==", "class", "village"], ["!has", "name:de"]],
      layout: {
        "text-font": ["Open Sans Regular"],
        "text-size": {
          base: 1.2,
          stops: [
            [10, 12],
            [15, 22],
          ],
        },
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-max-width": 8,
      },
      paint: {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)",
      },
    },
    {
      id: "place-village-en",
      type: "symbol",
      metadata: {
        "mapbox:group": "1444849242106.713",
      },
      "source-layer": "place",
      filter: ["all", ["==", "class", "village"], ["has", "name:de"]],
      layout: {
        "text-font": ["Open Sans Regular"],
        "text-size": {
          base: 1.2,
          stops: [
            [10, 12],
            [15, 22],
          ],
        },
        "text-field": "{name:de}\n{name:nonlatin}",
        "text-max-width": 8,
      },
      paint: {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)",
      },
    },
    {
      id: "place-town",
      type: "symbol",
      metadata: {
        "mapbox:group": "1444849242106.713",
      },
      "source-layer": "place",
      filter: ["all", ["==", "class", "town"], ["!has", "name:de"]],
      layout: {
        "text-font": ["Open Sans Regular"],
        "text-size": {
          base: 1.2,
          stops: [
            [10, 14],
            [15, 24],
          ],
        },
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-max-width": 8,
      },
      paint: {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)",
      },
    },
    {
      id: "place-town-en",
      type: "symbol",
      metadata: {
        "mapbox:group": "1444849242106.713",
      },
      "source-layer": "place",
      filter: ["all", ["==", "class", "town"], ["has", "name:de"]],
      layout: {
        "text-font": ["Open Sans Regular"],
        "text-size": {
          base: 1.2,
          stops: [
            [10, 14],
            [15, 24],
          ],
        },
        "text-field": "{name:de}\n{name:nonlatin}",
        "text-max-width": 8,
      },
      paint: {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)",
      },
    },
    {
      id: "place-city",
      type: "symbol",
      metadata: {
        "mapbox:group": "1444849242106.713",
      },
      "source-layer": "place",
      filter: [
        "all",
        ["!=", "capital", 2],
        ["==", "class", "city"],
        ["!has", "name:de"],
      ],
      layout: {
        "text-font": ["Open Sans Semibold"],
        "text-size": {
          base: 1.2,
          stops: [
            [7, 14],
            [11, 24],
          ],
        },
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-max-width": 8,
      },
      paint: {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)",
      },
    },
    {
      id: "place-city-en",
      type: "symbol",
      metadata: {
        "mapbox:group": "1444849242106.713",
      },
      "source-layer": "place",
      filter: [
        "all",
        ["!=", "capital", 2],
        ["==", "class", "city"],
        ["has", "name:de"],
      ],
      layout: {
        "text-font": ["Open Sans Semibold"],
        "text-size": {
          base: 1.2,
          stops: [
            [7, 14],
            [11, 24],
          ],
        },
        "text-field": "{name:de}\n{name:nonlatin}",
        "text-max-width": 8,
      },
      paint: {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)",
      },
    },
    {
      id: "place-city-capital",
      type: "symbol",
      metadata: {
        "mapbox:group": "1444849242106.713",
      },
      "source-layer": "place",
      filter: [
        "all",
        ["==", "capital", 2],
        ["==", "class", "city"],
        ["!has", "name:de"],
      ],
      layout: {
        "text-font": ["Open Sans Semibold"],
        "text-size": {
          base: 1.2,
          stops: [
            [7, 14],
            [11, 24],
          ],
        },
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-max-width": 8,
        "icon-image": "star_11",
        "text-offset": [0.4, 0],
        "icon-size": 0.8,
        "text-anchor": "left",
      },
      paint: {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)",
      },
    },
    {
      id: "place-city-capital-en",
      type: "symbol",
      metadata: {
        "mapbox:group": "1444849242106.713",
      },
      "source-layer": "place",
      filter: [
        "all",
        ["==", "capital", 2],
        ["==", "class", "city"],
        ["has", "name:de"],
      ],
      layout: {
        "text-font": ["Open Sans Semibold"],
        "text-size": {
          base: 1.2,
          stops: [
            [7, 14],
            [11, 24],
          ],
        },
        "text-field": "{name:de}\n{name:nonlatin}",
        "text-max-width": 8,
        "icon-image": "star_11",
        "text-offset": [0.4, 0],
        "icon-size": 0.8,
        "text-anchor": "left",
      },
      paint: {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)",
      },
    },
    {
      id: "waterway-name",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "waterway",
      minzoom: 13,
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["has", "name"],
        ["!has", "name:de"],
      ],
      layout: {
        "text-font": ["Open Sans Italic"],
        "text-size": 14,
        "text-field": "{name:latin} {name:nonlatin}",
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "symbol-placement": "line",
        "text-letter-spacing": 0.2,
        "symbol-spacing": 350,
      },
      paint: {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)",
      },
    },
    {
      id: "waterway-name-en",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "waterway",
      minzoom: 13,
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["has", "name"],
        ["has", "name:de"],
      ],
      layout: {
        "text-font": ["Open Sans Italic"],
        "text-size": 14,
        "text-field": "{name:de} {name:nonlatin}",
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "symbol-placement": "line",
        "text-letter-spacing": 0.2,
        "symbol-spacing": 350,
      },
      paint: {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)",
      },
    },
    {
      id: "water-name-lakeline",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!has", "name:de"],
      ],
      layout: {
        "text-font": ["Open Sans Italic"],
        "text-size": 14,
        "text-field": "{name:latin} {name:nonlatin}",
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "symbol-placement": "line",
        "symbol-spacing": 350,
        "text-letter-spacing": 0.2,
      },
      paint: {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)",
      },
    },
    {
      id: "water-name-lakeline-en",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["has", "name:de"],
      ],
      layout: {
        "text-font": ["Open Sans Italic"],
        "text-size": 14,
        "text-field": "{name:de} {name:nonlatin}",
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "symbol-placement": "line",
        "symbol-spacing": 350,
        "text-letter-spacing": 0.2,
      },
      paint: {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)",
      },
    },
    {
      id: "water-name-other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["!in", "class", "ocean"],
        ["!has", "name:de"],
      ],
      layout: {
        "text-font": ["Open Sans Italic"],
        "text-size": {
          stops: [
            [0, 10],
            [6, 14],
          ],
        },
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "symbol-placement": "point",
        "symbol-spacing": 350,
        "text-letter-spacing": 0.2,
        visibility: "visible",
      },
      paint: {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)",
      },
    },
    {
      id: "water-name-other-en",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["!in", "class", "ocean"],
        ["has", "name:de"],
      ],
      layout: {
        "text-font": ["Open Sans Italic"],
        "text-size": {
          stops: [
            [0, 10],
            [6, 14],
          ],
        },
        "text-field": "{name:de}\n{name:nonlatin}",
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "symbol-placement": "point",
        "symbol-spacing": 350,
        "text-letter-spacing": 0.2,
        visibility: "visible",
      },
      paint: {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)",
      },
    },
  ]