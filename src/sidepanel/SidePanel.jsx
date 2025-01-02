import { useState, useEffect } from 'react'
import Header from '../popup/components/Header'
import SideTimer from './components/Timer/SideTimer'
import './SidePanel.css'

export const SidePanel = () => {
  return (
    <main>
      <Header></Header>
      <SideTimer></SideTimer>
    </main>
  )
}

export default SidePanel
