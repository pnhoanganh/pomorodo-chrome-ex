import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Timer from './components/Timer/Timer'
import TodoList from './components/TodoList/TodoList'
import './Popup.css'

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
