import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Toolbar.css'

const tabs = [
  { id: 'timer', label: 'Timer', path: '/timer' },
  { id: 'task', label: 'To do list', path: '/task' },
  { id: 'note', label: 'Take note', path: '/note' },
]

function Toolbar() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('timer')

  useEffect(() => {
    const currentPath = location.pathname.slice(1) || 'timer'
    setActiveTab(currentPath)
  }, [location])

  return (
    <div id="toolbar">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          href={`/popup.html#${tab.path}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${activeTab === tab.id ? 'active-tab' : 'inactive-tab'}`}
        >
          {tab.label}
        </a>
      ))}
    </div>
  )
}

export default Toolbar
