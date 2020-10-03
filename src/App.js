import React from 'react'
import { Chart, Header } from './components'
import './App.css'

function App() {
  return (
    <div className="dashboard-app">
      <Header />

      <div className="app">
        <h1>Overview</h1>

        <div className="grid-layout">
          <div className="kp-container">
            <h2>Ganho proporcional - KP</h2>
            <div className="value">
              <p>20</p>
              <div className="input-container">
                <input placeholder="Novo valor..." />
                <button>
                  Enviar
                </button>
              </div>
            </div>
          </div>
          <div className="ki-container">
            <h2>Ganho Integral - KI</h2>
            <div className="value">
              <p>48</p>
              <div className="input-container">
                <input placeholder="Novo valor..." />
                <button>
                  Enviar
                </button>
              </div>
            </div>
          </div>
          <div className="mp-container">
            <h2>Overshoot Máximo - MP</h2>
            <div className="value">
              <p>20%</p>
              <div className="input-container">
                <input placeholder="Novo valor..." />
                <button>
                  Enviar
                </button>
              </div>
            </div>
          </div>
          <div className="ts-container">
            <h2>Tempo de Acomodação - TS</h2>
            <div className="value">
              <p>70s</p>
              <div className="input-container">
                <input placeholder="Novo valor..." />
                <button>
                  Enviar
                </button>
              </div>
            </div>
          </div>
          <Chart
            className="original-chart"
            title="Gráfico - Original"
            original={true}
          />
          <Chart
            className="controller-chart"
            title="Gráfico - Controlador PI"
          />
        </div>
      </div>
    </div>
  )
}

export default App
