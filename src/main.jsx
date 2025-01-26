import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './style/index.css'

const currentTheme = localStorage.currentTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

document.documentElement.classList.toggle('dark', currentTheme === 'dark')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)
