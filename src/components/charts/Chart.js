import React, { memo } from 'react'
import Plot from 'react-plotly.js'

import './Chart.css'

function Chart({ className, title, data }) {
  console.log("Renderizou")

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
          data={data}
          layout={layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  )
}

export default memo(Chart)