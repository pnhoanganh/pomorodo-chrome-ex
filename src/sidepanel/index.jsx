import React from 'react'
import ReactDOM from 'react-dom/client'
import { SidePanel } from './SidePanel'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <SidePanel />
  </React.StrictMode>,
)
