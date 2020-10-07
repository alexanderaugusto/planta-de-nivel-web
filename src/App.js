import React, { useState } from 'react'
import { Chart } from './components'
import './App.css'

function App() {
  const [kp, setKp] = useState(48)
  const [ki, setKi] = useState(20)
  const [mp, setMp] = useState(0.2)
  const [ts, setTs] = useState(70)

  const send = (data) => {
    console.log(data)
  }

  return (
    <div className="dashboard-app">
      <div className="app">
        <h1>Overview</h1>

        <div className="grid-layout">
          <div className="container overshoot-container">
            <div className="icon">
              <i className="fab fa-think-peaks" />
            </div>
            <div className="title">
              <p>19%</p>
              <h2>Overshoot</h2>
            </div>
          </div>
          <div className="container error-container">
            <div className="icon">
              <i className="fas fa-exclamation-circle" />
            </div>
            <div className="title">
              <p>0</p>
              <h2>Erro em regime permanente</h2>
            </div>
          </div>
          <div className="container accommodation-value-container">
            <div className="icon">
              <i className="fas fa-chart-line" />
            </div>
            <div className="title">
              <p>0.98</p>
              <h2>Valor de acomodação</h2>
            </div>
          </div>
          <div className="container accommodation-time-container">
            <div className="icon">
              <i className="fas fa-clock" />
            </div>
            <div className="title">
              <p>71s</p>
              <h2>Tempo de acomodação</h2>
            </div>
          </div>
          <div className="container values-container">
            <h2>Valores escolhidos</h2>

            <form onSubmit={(e) => {
              e.preventDefault()
              send({ kp, ki, mp, ts })
            }}>
              <div className="input-container">
                <label>Ganho proporcional</label>
                <input
                  type="number"
                  placeholder="Novo valor..."
                  value={kp}
                  onChange={(e) => setKp(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label>Ganho integral</label>
                <input
                  type="number"
                  placeholder="Novo valor..."
                  value={ki}
                  onChange={(e) => setKi(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label>Máximo overshoot</label>
                <input
                  type="number"
                  placeholder="Novo valor..."
                  value={mp}
                  onChange={(e) => setMp(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label>Tempo de acomodação recomendado</label>
                <input
                  type="number"
                  placeholder="Novo valor..."
                  value={ts}
                  onChange={(e) => setTs(e.target.value)}
                />
              </div>
              <button type="submit">
                Enviar
            </button>
            </form>
          </div>
          <div className="cotainer reservatory-container">

          </div>
          {/* <div className="kp-container">
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
          </div> */}
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
