import { useState, useEffect } from 'react'
import logo from '../../public/img/pomorodo.png'
import './Popup.css'
import Header from './components/Header'
import Timer from './components/Timer'
import TodoList from './components/TodoList'

export const Popup = () => {
  return (
    <main>
      <Header />
      <Timer />
      <TodoList />
    </main>
  )
}

export default Popup
