import React, { useEffect, useState } from 'react'

export default function Timer() {
  const [time, setTime] = useState(1500)

  const startTimer = () => {
    chrome.storage.local.set({ isRunning: true })
  }

  const pauseTimer = () => {
    chrome.storage.local.set({ isRunning: false })
  }

  const resetTimer = () => {
    chrome.storage.local.set({
      timer: 1500,
      isRunning: false,
    })
    setTime(1500)
  }

  const updateTime = () => {
    chrome.storage.local.get(['timer'], (res) => {
      setTime(res.timer || 1500)
    })
  }

  useEffect(() => {
    updateTime()

    const interval = setInterval(() => {
      chrome.storage.local.get(['isRunning'], (res) => {
        if (res.isRunning) {
          chrome.storage.local.get(['timer'], (res) => {
            const newTime = res.timer || 1500
            setTime(newTime)
            chrome.storage.local.set({ timer: newTime })
          })
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <>
      <h3 className="mt-4 fw-semibold">{formatTime(time)}</h3>
      <div className="btn-container d-flex justify-content-evenly">
        <button onClick={startTimer} className="btn btn-success btn-sm lh-sm">
          Start
        </button>
        <button onClick={pauseTimer} className="btn btn-danger btn-sm lh-sm">
          Pause
        </button>
        <button onClick={resetTimer} className="btn btn-primary btn-sm lh-sm">
          Reset
        </button>
      </div>
    </>
  )
}
