import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

import './global.css';

ReactDOM.createRoot(document.getElementById('feedget')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
