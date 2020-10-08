import React, { memo } from 'react'
import Plot from 'react-plotly.js';

import './Chart.css'

const jsonX = require('json-loader../../../dataX.json')
const jsonY = require('json-loader../../../dataY.json')
const jsonOriginal = require('json-loader../../../dataOriginal.json')

function Chart({ className, title, original }) {
  console.log("Renderizou")
  const chartData = [
    {
      x: jsonX,
      y: original ? jsonOriginal : jsonY,
      type: 'scatter',
      mode: 'lines',
      marker: { color: 'red' },
      name: 'Ganho',
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
    title: {
      text: title
    },
    legend: {
      orientation: 'h'
    },
    uirevision: 'true',
    xaxis: { autorange: true },
    yaxis: { autorange: true },
    hovermode: 'closest'
  }

  return (
    <>
      <div className={className + " chart"}>        
        <Plot
          data={chartData}
          layout={layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  )
}

export default memo(Chart)