import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <div className="glass-card">
        <div className="logos">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        
        <h1 className="title">Vite + React</h1>
        <p className="subtitle">
          Experience lightning-fast development with a beautiful modern UI.
        </p>

        <div className="card">
          <button className="action-button" onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          <p className="counter-display">
            Click the button to test interactive state.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
