import React, { useState, useEffect } from 'react'

export default function Timer() {
  const [time, setTime] = useState(1500)
  const [isRunning, setIsRunning] = useState(false)

  const startTimer = () => {
    chrome.storage.local.set({ isRunning: true }, () => {
      setIsRunning(true)
    })
  }

  const pauseTimer = () => {
    chrome.storage.local.set({ isRunning: false }, () => {
      setIsRunning(false)
    })
  }

  const resetTimer = () => {
    chrome.storage.local.get(['timeOption'], (res) => {
      const defaultTime = res.timeOption ? res.timeOption * 60 : 1500
      chrome.storage.local.set({ timer: defaultTime, isRunning: false }, () => {
        setTime(defaultTime)
        setIsRunning(false)
      })
    })
  }

  useEffect(() => {
    chrome.storage.local.get(['timer', 'timeOption', 'isRunning'], (res) => {
      const defaultTime = res.timeOption ? res.timeOption * 60 : 1500
      const currentTime = res.timer !== undefined ? res.timer : defaultTime
      setTime(currentTime)
      setIsRunning(res.isRunning || false)
    })

    const interval = setInterval(() => {
      chrome.storage.local.get(['isRunning', 'timer'], (res) => {
        if (res.isRunning) {
          const newTime = res.timer || 1500
          if (newTime >= 0) {
            chrome.storage.local.set({ timer: newTime })
            setTime(newTime)
          } else {
            chrome.storage.local.set({ isRunning: false })
            setIsRunning(false)
            alert('Time is up!')
          }
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleStorageChange = (changes) => {
      if (changes.timeOption) {
        const newTimeOption = changes.timeOption.newValue * 60
        setTime(newTimeOption)
        chrome.storage.local.set({ timer: newTimeOption, isRunning: false })
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange)
    return () => chrome.storage.onChanged.removeListener(handleStorageChange)
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // const testing = () => {

  // }

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
        {/* <button onClick={testing} className="btn btn-secondary btn-sm lh-sm">
          Test
        </button> */}
      </div>
    </>
  )
}
