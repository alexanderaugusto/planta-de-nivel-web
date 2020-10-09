import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Chart } from './components'
import { formatNumber } from './utils/util'
import api from './services/api'

import './App.css'

function App() {
  const [sp, setSp] = useState(1)
  const [mp, setMp] = useState(0.2)
  const [ts, setTs] = useState(70)
  const [data, setData] = useState({
    malhaAberta: {},
    malhaFechada: {},
    malhaFechadaGanhoProporcional: {},
    malhaFechadaControlador: {},
    original: {},
    originalMinimoQuadrado: {}
  })
  const [selected, setSelected] = useState("malhaAberta")

  const getInitialData = useCallback(async () => {
    const data = {
      sp: 1,
      overshoot: 0.2,
      ts: 70
    }

    await api.post('/', data)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const getData = async () => {
    const data = {
      sp,
      overshoot: mp,
      ts
    }

    await api.post('/', data)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const plotMalhaAberta = useCallback(() => {
    const chartData = [
      {
        x: data.malhaAberta.valoresX,
        y: data.malhaAberta.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' },
        name: 'Malha Aberta',
      }
    ]

    return (
      <Chart
        className="answers-chart"
        title="Malha Aberta"
        data={chartData}
      />
    )
  }, [data.malhaAberta])

  const plotMalhaFechada = useCallback(() => {
    const chartData = [
      {
        x: data.malhaFechada.valoresX,
        y: data.malhaFechada.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' },
        name: 'Malha Fechada',
      }
    ]

    return (
      <Chart
        className="answers-chart"
        title="Malha Fechada"
        data={chartData}
      />
    )
  }, [data.malhaFechada])

  const plotMalhaFechadaGanhoProporcional = useCallback(() => {
    const chartData = [
      {
        x: data.malhaFechadaGanhoProporcional.valoresX,
        y: data.malhaFechadaGanhoProporcional.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' },
        name: 'Ganho Proporcional',
      },
      {
        x: [data.malhaFechadaGanhoProporcional.overshootX],
        y: [data.malhaFechadaGanhoProporcional.overshootY],
        type: 'scatter',
        mode: 'markers',
        marker: { size: 10, color: 'blue' },
        name: 'Máximo Overshoot',
      }
    ]

    return (
      <Chart
        className="answers-chart"
        title="Malha Fechada com Ganho Proporcional"
        data={chartData}
      />
    )
  }, [data.malhaFechadaGanhoProporcional])

  const plotMalhaFechadaControlador = useCallback(() => {
    const chartData = [
      {
        x: data.malhaFechadaControlador.valoresX,
        y: data.malhaFechadaControlador.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' },
        name: 'Controlador PI',
      },
      {
        x: [data.malhaFechadaControlador.overshootX],
        y: [data.malhaFechadaControlador.overshootY],
        type: 'scatter',
        mode: 'markers',
        marker: { size: 10, color: 'blue' },
        name: 'Máximo Overshoot',
      }
    ]

    return (
      <Chart
        className="answers-chart"
        title="Malha Fechada com Controlador PI"
        data={chartData}
      />
    )
  }, [data.malhaFechadaControlador])

  const plotOriginal = useCallback(() => {
    const chartData = [
      {
        x: data.original.valoresX,
        y: data.original.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' },
        name: 'Original',
      },
      {
        x: data.originalMinimoQuadrado.valoresX,
        y: data.originalMinimoQuadrado.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'green' },
        name: 'Aproximação por Mínimos Quadrados',
      }
    ]

    return (
      <Chart
        className="answers-chart"
        title="Original com Mínimos Quadrados"
        data={chartData}
      />
    )
  }, [data.original, data.originalMinimoQuadrado])

  useEffect(() => {
    getInitialData()
  }, [getInitialData])

  console.log(data)

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
              <p>{formatNumber(data.malhaFechadaControlador.overshoot) + "%"}</p>
              <h2>Overshoot</h2>
            </div>
          </div>
          <div className="container error-container">
            <div className="icon">
              <i className="fas fa-exclamation-circle" />
            </div>
            <div className="title">
              <p>{formatNumber(data.malhaFechadaControlador.erro)}</p>
              <h2>Erro em regime permanente</h2>
            </div>
          </div>
          <div className="container accommodation-value-container">
            <div className="icon">
              <i className="fas fa-chart-line" />
            </div>
            <div className="title">
              <p>{formatNumber(data.malhaFechadaControlador.valorAcomodacao)}</p>
              <h2>Valor de acomodação</h2>
            </div>
          </div>
          <div className="container accommodation-time-container">
            <div className="icon">
              <i className="fas fa-clock" />
            </div>
            <div className="title">
              <p>{formatNumber(data.malhaFechadaControlador.tempoAcomodacao) + "s"}</p>
              <h2>Tempo de acomodação</h2>
            </div>
          </div>

          <div className="container values-container">
            <h2>Valores escolhidos</h2>

            <form onSubmit={(e) => {
              e.preventDefault()
              getData({ mp, ts })
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
              <button type="button" onClick={() => setSelected("malhaAberta")}> Malha aberta </button>
              <button type="button" onClick={() => setSelected("malhaFechada")}> Malha fechada </button>
              <button type="button" onClick={() => setSelected("malhaFechadaGanhoProporcional")}> Malha fechada com ganho </button>
              <button type="button" onClick={() => setSelected("malhaFechadaControlador")}> Malha fechada com controlador </button>
            </div>

            {useMemo(() => {
              if (selected === "malhaAberta")
                return plotMalhaAberta()
              else if (selected === "malhaFechada")
                return plotMalhaFechada()
              else if (selected === "malhaFechadaGanhoProporcional")
                return plotMalhaFechadaGanhoProporcional()
              else
                return plotMalhaFechadaControlador()
            }, [plotMalhaAberta, plotMalhaFechada, plotMalhaFechadaGanhoProporcional, plotMalhaFechadaControlador, selected])}
          </div>

          <div className="cotainer reservatory-container">

          </div>

          <div className="original-container">
            {useMemo(() => plotOriginal(), [plotOriginal])}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
