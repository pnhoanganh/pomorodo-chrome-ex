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
    chrome.storage.local.set({ isRunning: true }, () => {
      setIsRunning(true)
    })
  }

  const pauseTimer = () => {
    btnSound.play()
    chrome.storage.local.set({ isRunning: false }, () => {
      setIsRunning(false)
    })
  }

  const resetTimer = () => {
    btnSound.play()
    chrome.storage.local.get(['timeOption'], (res) => {
      const defaultTime = res.timeOption ? res.timeOption * 60 : 1500
      chrome.storage.local.set({ timer: defaultTime, isRunning: false }, () => {
        setTime(defaultTime)
        setIsRunning(false)

        chrome.runtime.sendMessage({ action: 'resetTimer' })
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

  // useEffect(() => {
  //   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //     if (request.action === 'testSound') {
  //       console.log('testSound')
  //       breakSound.play()
  //     }
  //   })
  // }, [])

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'testSound') {
      console.log('testSound')
      breakSound.play()
    }
  })

  // const test = () => {
  //   chrome.runtime.sendMessage({ action: 'test' })
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
