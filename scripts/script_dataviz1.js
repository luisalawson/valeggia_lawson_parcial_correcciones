d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale);

  d3.dsv(';', 'data/contactos_anuales.csv', d3.autoType).then(data => {
    const categoryColors = {
      'TRÁNSITO': '#2CA25F', // Blue color for TRÁNSITO category
      'LIMPIEZA Y RECOLECCIÓN': '#225EA8', // Orange color for LIMPIEZA Y RECOLECCIÓN category
      'ALUMBRADO': '#F5F5F5',
      'ARBOLADO Y ESPACIOS VERDES': '#F2F2F2',
      'BARRIOS EMERGENTES': '#EFEFEF',
      'CALLES Y VEREDAS': '#ECECEC',
      'CONTROL EDILICIO, OBRAS Y CATASTRO': '#EEEEEE',
      'DESARROLLO URBANO': '#EBEBEB',
      'EDUCACION': '#E8E8E8',
      'FISCALIZACIÓN ACTIVIDADES COMERCIALES': '#E5E5E5',
      'LOTBA': '#E2E2E2',
      'MEDIOS DE TRANSPORTE': '#DFDFDF',
      'ORDENAMIENTO DEL ESPACIO PÚBLICO': '#DCDCDC',
      'PLUVIALES': '#D9D9D9',
      'RECICLADO Y PROTECCIÓN AMBIENTAL': '#D6D6D6',
      'SALUD Y SERVICIOS SOCIALES': '#D3D3D3',
      'SEGURIDAD': '#D0D0D0',
      'TERRENO BALDÍO': '#CDCDCD',
      'TRÁMITES Y SERVICIOS': '#CACACA',
      'null': '#C7C7C7',
    };

    let chart_def_1 = Plot.plot({
      x: {
        type: 'time',
        label: '2021'
      },
      y: {
        grid: true,
        label: 'Cantidad de reclamos',
        tickFormat: 'd',
      },
      marks: [
        Plot.lineY(
          data.filter(d => d.categoria === 'TRÁNSITO' || d.categoria === 'LIMPIEZA Y RECOLECCIÓN'),
          Plot.binX(
            {
              y: 'count',
              title: (d) => JSON.stringify(d),
              
            },
            {
              x: (d) => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso),
              thresholds: d3.timeMonth,
              groupBy: (d) => d.categoria, // Group by categoria
              stroke: (d) => categoryColors[d.categoria],
            }
          ),
          {
            color: {
              //legend: true,
            },
          }
        ),
        Plot.lineY(
          data.filter(d => d.categoria !== 'TRÁNSITO' && d.categoria !== 'LIMPIEZA Y RECOLECCIÓN'),
          Plot.binX(
            {
              y: 'count',
              title: (d) => JSON.stringify(d),
              
            },
            {
              x: (d) => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso),
              thresholds: d3.timeMonth,
              groupBy: (d) => d.categoria, // Group by categoria
              stroke: (d) => categoryColors[d.categoria],
            }
          ),
          {
            color: {
              //legend: true,
            },
          }
        )
      ],
    });

    // Agregamos chart al div#chart_def_1 de index.html
    d3.select('#chart_def_1').append(() => chart_def_1);
  });
});
