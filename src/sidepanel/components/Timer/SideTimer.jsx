import React, { useState, useEffect } from 'react'
import './SideTimer.css'

export default function SideTimer() {
  const [time, setTime] = useState(1500)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    // Lấy giá trị ban đầu từ storage
    chrome.storage.local.get(['timer', 'isRunning'], (res) => {
      setTime(res.timer || 1500)
      setIsRunning(res.isRunning || false)
    })

    // Listen change from storage
    const handleStorageChange = (changes) => {
      if (changes.timer) {
        setTime(changes.timer.newValue)
      }
      if (changes.isRunning) {
        setIsRunning(changes.isRunning.newValue)
      }
      if (changes.timeOption) {
        const newTimeOption = changes.timeOption.newValue * 60
        setTime(newTimeOption)
        chrome.storage.local.set({ timer: newTimeOption, isRunning: false })
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange)

    // listen message from popup to reset timer
    const handleMessage = (message) => {
      if (message.action === 'resetTimer') {
        chrome.storage.local.get(['timer', 'isRunning'], (res) => {
          setTime(res.timer || 1500)
          setIsRunning(res.isRunning || false)
        })
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div>
      <h3 className="mt-4 fw-semibold fs-4">{formatTime(time)}</h3>
      <p className="mt-3" style={{ fontSize: '12px', color: '#5d5f60b9' }}>
        Status: {isRunning ? 'Running' : 'Paused'}
      </p>
    </div>
  )
}
