console.log('background is running')

chrome.alarms.create('poromodoTimer', {
  periodInMinutes: 1 / 60,
})
