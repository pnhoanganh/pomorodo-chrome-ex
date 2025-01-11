import React, { useState, useEffect } from 'react'
import BtnSound from '../../../assets/audio/Pomodoro_button-sound.mp3'
import BreakSound from '../../../assets/audio/Pomodoro_break.mp3'
import './Timer.css'

export default function Timer() {
  const btnSound = new Audio(BtnSound)
  const breakSound = new Audio(BreakSound)
  const [time, setTime] = useState(1500)
  const [isRunning, setIsRunning] = useState(false)

  const startTimer = () => {
    btnSound.play()
    chrome.storage.local.set({ isRunning: true })
  }

  const pauseTimer = () => {
    btnSound.play()
    chrome.storage.local.set({ isRunning: false })
  }

  const resetTimer = () => {
    btnSound.play()
    chrome.storage.local.get(['timeOption'], (res) => {
      const defaultTime = res.timeOption ? res.timeOption * 60 : 1500
      chrome.storage.local.set({ timer: defaultTime, isRunning: false })
    })
  }

  useEffect(() => {
    chrome.storage.local.get(['timer', 'isRunning'], (res) => {
      setTime(res.timer || 1500)
      setIsRunning(res.isRunning || false)
    })

    const handleStorageChange = (changes) => {
      if (changes.timer) {
        setTime(changes.timer.newValue)
      }
      if (changes.isRunning) {
        setIsRunning(changes.isRunning.newValue)
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange)
    return () => chrome.storage.onChanged.removeListener(handleStorageChange)
  }, [])

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'timerEnd') {
        breakSound.play()
      }
    })
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // const test = () => {
  //   breakSound.play()
  // }

  return (
    <section>
      <p className="mt-3" style={{ fontSize: '12px', color: '#5d5f60b9' }}>
        Status: {isRunning ? 'Running' : 'Paused'}
      </p>
      <h3 className="mb-4 fw-semibold">{formatTime(time)}</h3>
      <div className="btn-container d-flex justify-content-center">
        <button onClick={startTimer} className="btn btn-success lh-sm">
          Start
        </button>
        <button onClick={pauseTimer} className="btn btn-danger lh-sm">
          Pause
        </button>
        <button onClick={resetTimer} className="btn btn-primary lh-sm">
          Reset
        </button>
        {/* <button onClick={test} className="btn btn-secondary btn-sm lh-sm">
          Test
        </button> */}
      </div>
    </section>
  )
}
