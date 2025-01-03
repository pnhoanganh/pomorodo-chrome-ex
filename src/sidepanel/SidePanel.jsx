import { useState, useEffect } from 'react'
import Header from '../popup/components/Header'
import SideTimer from './components/Timer/SideTimer'
import ToDoList from './components/ToDoList/ToDoList'
import './SidePanel.css'

export const SidePanel = () => {
  return (
    <main>
      <Header />
      <SideTimer />
      <ToDoList />
    </main>
  )
}

export default SidePanel
