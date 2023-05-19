d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale);

  d3.dsv(';', 'data/merge.csv', d3.autoType).then(data => {
    console.log(data.length);
    let chart_def_1 = Plot.plot({
      x: {
        type: 'time',
        // Ver formatos https://github.com/d3/d3-time-format
        label: 'Todo el año'
      },
      y: {
        grid: true,
        label: 'Cantidad de reclamos',
        tickFormat: 'd',
      },
      marks: [
        Plot.rectY(
          data,
          Plot.binX(
            {
              y: 'count',
              title: d => JSON.stringify(d),
            },
            {
              // https://github.com/d3/d3-time-format
              // Convierte a un date JS
              x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso),
              // https://github.com/d3/d3-time#timeMonth
              // Agrupamos en intervalo de meses
              thresholds: d3.timeMonth,
              // Agrupar por categoría
              groupBy: d => d.categoria,
            },
          ),
        ),
      ],
      color: {
        scheme: 'YlGnBu',
        legend: true,
  
      },
    });
    // Agregamos chart al div#chart de index.html
    d3.select('#chart_def_1').append(() => chart_def_1);
  });
});
