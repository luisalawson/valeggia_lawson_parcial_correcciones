
d3.dsv(';', 'data/contactos_anuales.csv', d3.autoType).then(data => {
  const marzoAbril = data.filter(d => {
    const fecha = d.fecha_ingreso.split('/');
    const categoria = d.categoria;
    const mes = parseInt(fecha[1]);
    const barrio = d.domicilio_barrio
    return categoria === "LIMPIEZA Y RECOLECCIÓN" && (barrio === 'CABALLITO' || barrio === 'PALERMO') && (mes === 03 || mes === 04);
  });

  

  const chartMarzoAbril = Plot.plot({
    marginLeft: 60,
    marginRight: 60,
    grid: true,
    x: { label: null },
    fx: { label: null },
    y: { domain: [0, 2600] },
    color: { legend: true },
    marks: [
      Plot.barY(marzoAbril,
        Plot.groupX({ y: 'count' },
          {  fx:'domicilio_barrio',x: 'estado_del_contacto', fill: (d) => d.estado_del_contacto === 'Abierto' ? '#225EA8' : '#93B8E0' })
      ),
      Plot.frame()
    ]
  });


  d3.select('#chart_def_3').append(() => chartMarzoAbril);

});

