import React, { useState } from 'react'
import { Chart } from './components'
import './App.css'

function App() {
  const [sp, setSp] = useState(0.2)
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
              send({ mp, ts })
            }}>
              <div className="input-container">
                <label>Amplitude degrau unitário</label>
                <input
                  type="number"
                  placeholder="Novo valor..."
                  value={sp}
                  onChange={(e) => setSp(e.target.value)}
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
                <label>Tempo de acomodação esperado</label>
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

          <div className="answers-container">
            <div className='options-buttons'>
              <button type="button"> Malha Aberta </button>
              <button type="button"> Malha Fechada </button>
              <button type="button"> Malha Fechada com ganho </button>
              <button type="button"> Comparativo </button>
            </div>

            <Chart
              className="answers-chart"
              title="Gráfico - Controlador PI"
            />
          </div>

          <div className="cotainer reservatory-container">

          </div>

          <Chart
            className="original-chart"
            title="Gráfico - Original"
            original={true}
            buttonOptions={true}
          />
        </div>
      </div>
    </div>
  )
}

export default App
