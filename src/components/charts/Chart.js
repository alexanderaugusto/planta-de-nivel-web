import React from 'react'
import Plot from 'react-plotly.js';

const jsonX = require('json-loader../../../dataX.json')
const jsonY = require('json-loader../../../dataY.json')

function Chart() {
  const data = [
    {
      x: jsonX,
      y: jsonY,
      type: 'scatter',
      mode: 'lines',
      marker: { color: 'red' },
      name: 'Curva',
    },
    {
      x: [4.4],
      y: [1.100399],
      type: 'scatter',
      mode: 'markers',
      marker: { size: 10, color: 'blue' },
      name: 'Máximo Overshoot',
    }
  ]

  const layout = {
    title: 'Gráfico - Planta de Nível',
    uirevision: 'true',
    xaxis: { autorange: true },
    yaxis: { autorange: true },
    hovermode: 'closest'
  }

  return (
    <>
      <Plot
        data={data}
        layout={layout}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  )
}

export default Chart