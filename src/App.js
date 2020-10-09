import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Chart, PageLoading } from './components'
import { formatNumber } from './utils/util'
import api from './services/api'

import './App.css'

function App() {
  const [sp, setSp] = useState(1)
  const [mp, setMp] = useState(0.1)
  const [ts, setTs] = useState(70)
  const [answer, setAnswer] = useState({
    malhaAberta: {},
    malhaFechada: {},
    malhaFechadaGanhoProporcional: {},
    malhaFechadaControlador: {},
    original: {},
    originalMinimoQuadrado: {}
  })
  const [selected, setSelected] = useState("malhaFechadaControlador")
  const [loading, setLoading] = useState(false)

  const getInitialData = useCallback(async () => {
    const data = {
      sp: 1,
      overshoot: 0.1,
      ts: 70
    }

    setLoading(true)

    await api.post('/', data)
      .then((res) => {
        setAnswer(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    setLoading(false)
  }, [])

  const getData = async () => {
    const data = {
      sp: parseFloat(sp),
      overshoot: parseFloat(mp),
      ts: parseFloat(ts)
    }

    setLoading(true)

    await api.post('/', data)
      .then((res) => {
        setAnswer(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    setLoading(false)
  }

  const plotMalhaAberta = useCallback(() => {
    const data = [
      {
        x: answer.malhaAberta.valoresX,
        y: answer.malhaAberta.valoresY,
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
        data={data}
      />
    )
  }, [answer.malhaAberta])

  const plotMalhaFechada = useCallback(() => {
    const data = [
      {
        x: answer.malhaFechada.valoresX,
        y: answer.malhaFechada.valoresY,
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
        data={data}
      />
    )
  }, [answer.malhaFechada])

  const plotMalhaFechadaGanhoProporcional = useCallback(() => {
    const data = [
      {
        x: answer.malhaFechadaGanhoProporcional.valoresX,
        y: answer.malhaFechadaGanhoProporcional.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' },
        name: 'Ganho Proporcional',
      },
      !answer.malhaFechadaGanhoProporcional.overshoot ? {} : {
        x: [answer.malhaFechadaGanhoProporcional.overshootX],
        y: [answer.malhaFechadaGanhoProporcional.overshootY],
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
        data={data}
      />
    )
  }, [answer.malhaFechadaGanhoProporcional])

  const plotMalhaFechadaControlador = useCallback(() => {
    const data = [
      {
        x: answer.malhaFechadaControlador.valoresX,
        y: answer.malhaFechadaControlador.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' },
        name: 'Controlador PI',
      },
      {
        x: [answer.malhaFechadaControlador.overshootX],
        y: [answer.malhaFechadaControlador.overshootY],
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
        data={data}
      />
    )
  }, [answer.malhaFechadaControlador])

  const plotComparative = useCallback(() => {
    const data = [
      {
        x: answer.malhaAberta.valoresX,
        y: answer.malhaAberta.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' },
        name: 'Malha Aberta',
      },
      {
        x: answer.malhaFechada.valoresX,
        y: answer.malhaFechada.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'green' },
        name: 'Malha Fechada',
      },
      {
        x: answer.malhaFechadaGanhoProporcional.valoresX,
        y: answer.malhaFechadaGanhoProporcional.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'blue' },
        name: 'Ganho Proporcional',
      },
      {
        x: answer.malhaFechadaControlador.valoresX,
        y: answer.malhaFechadaControlador.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'purple' },
        name: 'Controlador PI',
      }
    ]

    return (
      <Chart
        className="answers-chart"
        title="Original com Mínimos Quadrados"
        data={data}
      />
    )
  }, [answer.malhaAberta, answer.malhaFechada, answer.malhaFechadaControlador, answer.malhaFechadaGanhoProporcional])

  const plotOriginal = useCallback(() => {
    const data = [
      {
        x: answer.original.valoresX,
        y: answer.original.valoresY,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' },
        name: 'Original',
      },
      {
        x: answer.originalMinimoQuadrado.valoresX,
        y: answer.originalMinimoQuadrado.valoresY,
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
        data={data}
      />
    )
  }, [answer.original, answer.originalMinimoQuadrado])

  useEffect(() => {
    getInitialData()
  }, [getInitialData])

  return (
    <div className="dashboard-app">
      <PageLoading loading={loading} />

      <div className="app">
        <h1>Overview</h1>

        <div className="grid-layout">
          <div className="container overshoot-container">
            <div className="icon">
              <i className="fab fa-think-peaks" />
            </div>
            <div className="title">
              <p>{formatNumber(answer.malhaFechadaControlador.overshoot) + "%"}</p>
              <h2>Overshoot</h2>
            </div>
          </div>
          <div className="container error-container">
            <div className="icon">
              <i className="fas fa-exclamation-circle" />
            </div>
            <div className="title">
              <p>{formatNumber(answer.malhaFechadaControlador.erro)}</p>
              <h2>Erro em regime permanente</h2>
            </div>
          </div>
          <div className="container accommodation-value-container">
            <div className="icon">
              <i className="fas fa-chart-line" />
            </div>
            <div className="title">
              <p>{formatNumber(answer.malhaFechadaControlador.valorAcomodacao)}</p>
              <h2>Valor de acomodação</h2>
            </div>
          </div>
          <div className="container accommodation-time-container">
            <div className="icon">
              <i className="fas fa-clock" />
            </div>
            <div className="title">
              <p>{formatNumber(answer.malhaFechadaControlador.tempoAcomodacao) + "s"}</p>
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
              <button
                type="button"
                className={selected === "malhaAberta" ? "option-selected" : ""}
                onClick={() => setSelected("malhaAberta")}>
                Malha aberta
              </button>
              <button
                type="button"
                className={selected === "malhaFechada" ? "option-selected" : ""}
                onClick={() => setSelected("malhaFechada")}>
                Malha fechada
              </button>
              <button
                type="button"
                className={selected === "malhaFechadaGanhoProporcional" ? "option-selected" : ""}
                onClick={() => setSelected("malhaFechadaGanhoProporcional")}>
                Malha fechada com ganho
               </button>
              <button
                type="button"
                className={selected === "malhaFechadaControlador" ? "option-selected" : ""}
                onClick={() => setSelected("malhaFechadaControlador")}>
                Malha fechada com controlador
              </button>
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

          <div className="comparative-container">
            {useMemo(() => plotComparative(), [plotComparative])}
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
