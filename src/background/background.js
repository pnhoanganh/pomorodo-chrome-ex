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
        console.log(timer)
        if (timer <= 0) {
          timer = 0
          chrome.notifications.create('timerEnd' + Math.floor(Math.random() * 100), {
            type: 'basic',
            iconUrl: 'icons/96.png',
            title: 'Pomodoro Timer',
            message: 'Time is up!',
          })
          chrome.runtime.sendMessage({ action: 'testSound' })
          chrome.storage.local.set({ isRunning: false })
        }
        chrome.storage.local.set({ timer })
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
//     sendResponse(chrome.runtime.sendMessage({ action: 'testSound' }))
//   }
// })
