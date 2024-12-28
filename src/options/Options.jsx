import { useState, useEffect } from 'react'
import './Options.css'

export const Options = () => {
  const [hourInput, setHourInput] = useState(25)

  const validHour = (value) => {
    if (value < 1 || value > 60 || isNaN(value)) {
      return 25
    }
    return value
  }

  const handleInputChange = (e) => {
    const value = Number(e.target.value)
    if (e.target.value === '') {
      setHourInput('')
    } else if (value >= 1 && value <= 60) {
      setHourInput(value)
    }
  }

  const saveHour = () => {
    const validValue = validHour(Number(hourInput) || 25)
    setHourInput(validValue)
    localStorage.setItem('pomodoroHour', validValue)

    if (chrome?.storage?.local) {
      chrome.storage.local.set({ timeOption: validValue })
    }
    alert(
      `Default time saved as ${validValue} minutes. Remember to RESET the timer before starting.`,
    )
  }

  useEffect(() => {
    const savedHourValue = Number(localStorage.getItem('pomodoroHour')) || 25

    if (chrome?.storage?.local) {
      chrome.storage.local.get('timeOption', (res) => {
        const timeOption = res.timeOption || savedHourValue
        setHourInput(timeOption)
      })
    } else {
      setHourInput(savedHourValue)
    }
  }, [])

  return (
    <main className="d-flex flex-column align-items-center">
      <h2 className="my-3 fs-2 lh-base text-uppercase">Pomodoro Timer</h2>
      <h3 className="fs-4">Setting Page</h3>

      <div className="input-group mt-4 changeHour-input">
        <p>Default time in minutes (1 ➡️ 60)</p>
        <input
          type="number"
          className="form-control border-0"
          min="1"
          max="60"
          value={hourInput}
          onChange={handleInputChange}
          placeholder="Set time (1-60)"
          aria-label="Set default pomodoro time in minutes"
        />
        <button onClick={saveHour} className="btn btn-primary" type="button">
          Save
        </button>
      </div>
    </main>
  )
}

export default Options
