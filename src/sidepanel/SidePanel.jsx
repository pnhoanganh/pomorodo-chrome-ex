import { useState, useEffect } from 'react'
import Header from './components/SideHeader/Header'
import SideTimer from './components/SideTimer/SideTimer'
import ToDoList from './components/SideTasksList/ToDoList'
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
