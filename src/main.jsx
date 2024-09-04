import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TimerContext from './Pages/CAD PANAL/TimerContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TimerContext>
    <App />
    </TimerContext>
  </React.StrictMode>,
)
