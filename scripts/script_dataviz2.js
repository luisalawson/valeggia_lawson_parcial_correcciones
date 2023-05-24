const mapaFetch = d3.json('barrios-caba.geojson');
const dataFetch = d3.dsv(';', 'data/contactos_anuales.csv', d3.autoType);

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  const dataFiltrada = data.filter(d => {
    const fecha = d.fecha_ingreso.split('/');
    const categoria = d.categoria;
    const mes = parseInt(fecha[1]);
    return categoria === "LIMPIEZA Y RECOLECCIÓN" && (mes === 03 || mes === 04);
  });
  
  /* Agrupamos reclamos x barrio */
  const reclamosPorBarrio = d3.group(dataFiltrada, d => d.domicilio_barrio) // crea un Map
  console.log('reclamosPorBarrio', reclamosPorBarrio)
  
  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos = reclamosPorBarrio.get(nombreBarrio)
    if (cantReclamos !== undefined) {
      cantReclamos = cantReclamos.length
    } else {
      cantReclamos = 0
    }
    d.properties.DENUNCIAS = cantReclamos
  })

  /* Crear tabla de conteo de contactos */
  const barriosTabla = [ "PALERMO", "CABALLITO", "VILLA URQUIZA", "VILLA DEVOTO"];
  const conteoContactos = barriosTabla.map(barrio => {
    const contactos = reclamosPorBarrio.get(barrio);
    const cantidad = contactos ? contactos.length : 0;
    return { barrio, cantidad };
  });

  /* Crear contenedor principal */
  const container = d3.select('#chart_def_2').style("display", "flex");

  /* Agregar gráfico al contenedor */
  const chartDiv = container.append("div").style("flex-grow", 1);
  
  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    width: 550, // Increase the chart width
    height: 400, // Increase the chart height
    font: 'Poppins', // Set font family to P
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      scheme: 'YlGnBu',
      label: 'Cantidad de denuncias',
      legend: true,

    },
    marks: [
      Plot.geo(barrios, {
        fill: d => d.properties.DENUNCIAS,
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          fill: "white",
          stroke: "black",
          textAnchor: "center",
          dx: 4,
          filter: (d) => d.properties.DENUNCIAS > 1700
        })
      )
    ],
  });

  /* Agregar el gráfico al DOM */
  chartDiv.node().appendChild(chartMap);

/* Crear contenedor principal */
const containerr = d3.select('#chart_def_2').style("display", "flex").style("align-items", "center");

/* Agregar tabla al contenedor */
const tableDiv = containerr.append("div").style("flex-grow", 1);

/* Crear tabla en el HTML */
const table = tableDiv.append("table").style("margin", "auto");


  /* Encabezado de la tabla */
  table.append("thead")
    .append("tr")
    .selectAll("th")
    .data(["Barrio", "Cantidad de contactos"])
    .enter()
    .append("th")
    .text(d => d);

  /* Filas de la tabla */
  const rows = table.append("tbody")
    .selectAll("tr")
    .data(conteoContactos)
    .enter()
    .append("tr");

  /* Celdas de la tabla */
  rows.append("td")
    .text(d => d.barrio);
  rows.append("td")
    .text(d => d.cantidad);
});
