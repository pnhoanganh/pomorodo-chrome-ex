console.log('background is running')

chrome.alarms.create('pomodoroTimer', {
  periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarms) => {
  if (alarms.name == 'pomodoroTimer') {
    chrome.storage.local.get(['timer', 'isRunning'], (res) => {
      if (res.isRunning) {
        let timer = res.timer - 1
        let isRunning = true
        chrome.storage.local.set({ timer, isRunning })
      }
    })
  }
})

chrome.storage.local.get(['timer', 'isRunning'], (res) => {
  chrome.storage.local.set({
    timer: 'timer' in res ? res.timer : 1500,
    isRunning: 'isRunning' in res ? res.isRunning : false,
  })
})
