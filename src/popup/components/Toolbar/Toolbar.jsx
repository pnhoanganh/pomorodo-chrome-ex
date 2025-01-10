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
    <div id="toolbar" className="d-flex mb-4 p-2 rounded justify-content-between">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          to={tab.path}
          aria-current={activeTab === tab.id ? 'page' : undefined}
          className={`btn ${activeTab === tab.id ? 'active-tab' : 'inactive-tab'}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}

export default Toolbar
