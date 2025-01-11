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
        const newTime = (res.timer || 1500) - 1
        chrome.runtime.sendMessage({ action: 'secondSound' })
        if (newTime <= 0) {
          chrome.storage.local.set({ timer: 0, isRunning: false })
          chrome.runtime.sendMessage({ action: 'timerEnd' })
          chrome.notifications.create('timerEnd' + Math.floor(Math.random() * 100), {
            type: 'basic',
            iconUrl: 'icons/96.png',
            title: 'Pomodoro Timer',
            message: 'Time is up!',
          })
        } else {
          chrome.storage.local.set({ timer: newTime })
        }
      }
    })
  }
})

function initializeDefaults() {
  chrome.storage.local.get(['timer', 'isRunning', 'timeOption', 'breakFlag'], (res) => {
    chrome.storage.local.set({
      timer: 'timer' in res ? res.timer : DEFAULT_TIME,
      timeOption: 'timeOption' in res ? res.timeOption : DEFAULT_TIME_OPTION,
      isRunning: 'isRunning' in res ? res.isRunning : false,
      breakFlag: 'breakFlag' in res ? res.breakFlag : true,
    })
  })
}

initializeDefaults()

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'test') {
//     chrome.runtime.sendMessage({ action: 'testSound' })
//     sendResponse({ status: 'sent' })
//   }
//   return true
// })
