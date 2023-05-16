d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {
  const mataderosData = data.filter(d => d.domicilio_barrio === "MATADEROS");
  const palermoData = data.filter(d => d.domicilio_barrio === "PALERMO");

  const contactos_cerrados_mataderos = mataderosData.filter(d => d.estado_del_contacto === "Cerrado").length;
  const contactos_abiertos_mataderos = mataderosData.filter(d => d.estado_del_contacto === "Abierto").length;

  const contactos_cerrados_palermo = palermoData.filter(d => d.estado_del_contacto === "Cerrado").length;
  const contactos_abiertos_palermo = palermoData.filter(d => d.estado_del_contacto === "Abierto").length;

  let chart = Plot.plot({
    height: 440,
    width: 1000,
    nice: true,

    x: {
      label: "",
      tickFormat: null,
      tickSize: 0,
      ticks: 0,
      domain: [-0.6, 0.6], // Ajuste del dominio para permitir espacio adicional
    },
    y: {
      ticks: 0,
    },
    r: {
      range: [0, 170],
    },
    marks: [
      Plot.dot([{ tipo: "Cerrados", cantidad: contactos_cerrados_mataderos }], {
        x: -0.45,
        y: 0.5,
        r: 'cantidad',
        fill: '#225EA8'
      }),
      Plot.dot([{ tipo: "Abiertos", cantidad: contactos_abiertos_mataderos }], {
        x: -0.2,
        y: 0.5,
        r: 'cantidad',
        fill: '#C7D9F1'
      }),
      Plot.text([{ tipo: "Cerrados", cantidad: contactos_cerrados_mataderos }], {
        x: -0.45,
        y: 0.5,
        text: (d) => ((d.cantidad).toFixed(0) + " cerrados"),
        fill: "white",
        fontSize: 25,
      }),
      Plot.text([{ tipo: "Abiertos", cantidad: contactos_abiertos_mataderos }], {
        x: -0.2,
        y: 0.5,
        text: (d) => ((d.cantidad).toFixed(0) + " abiertos"),
        fill: "white",
        fontSize: 25,
      }),

      Plot.dot([{ tipo: "Cerrados", cantidad: contactos_cerrados_palermo }], {
        x: 0.17,
        y: 0.5,
        r: 'cantidad',
        fill: '#2CA25F'
      }),
      Plot.dot([{ tipo: "Abiertos", cantidad: contactos_abiertos_palermo }], {
        x: 0.42,
        y: 0.5,
        r: 'cantidad',
        fill: '#C7E9B4'
      }),
      Plot.text([{ tipo: "Cerrados", cantidad: contactos_cerrados_palermo }], {
        x: 0.163,
        y: 0.5,
        text: (d) => ((d.cantidad).toFixed(0) + " cerrados"),
        fill: "white",
        fontSize: 15,
        }),
        Plot.text([{ tipo: "Abiertos", cantidad: contactos_abiertos_palermo }], {
        x: 0.42,
        y: 0.5,
        text: (d) => ((d.cantidad).toFixed(0) + " abiertos"),
        fill: "white",
        fontSize: 25,
        }),
        ],
        });
        
        d3.select('#chart_def_3').append(() => chart);
      });
