console.log('Background script is running')

const DEFAULT_TIME = 1500
const DEFAULT_TIME_OPTION = 25

chrome.alarms.create('pomodoroTimer', {
  periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'pomodoroTimer') {
    chrome.storage.local.get(['timer', 'isRunning'], (res) => {
      if (res.isRunning) {
        let timer = res.timer - 1

        if (timer <= 0) {
          timer = 0
          chrome.storage.local.set({ isRunning: false })

          chrome.notifications.create('timerEnd', {
            type: 'basic',
            iconUrl: '../../public/img/logo.png',
            title: 'Pomodoro Timer',
            message: 'Time is up!',
          })
        }
        chrome.storage.local.set({ timer })
      }
    })
  }
})

function initializeDefaults() {
  chrome.storage.local.get(['timer', 'isRunning', 'timeOption'], (res) => {
    chrome.storage.local.set({
      timer: 'timer' in res ? res.timer : DEFAULT_TIME,
      timeOption: 'timeOption' in res ? res.timeOption : DEFAULT_TIME_OPTION,
      isRunning: 'isRunning' in res ? res.isRunning : false,
    })
  })
}

initializeDefaults()
