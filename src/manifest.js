import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json' assert { type: 'json' }

const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'icons/16.png',
    32: 'icons/32.png',
    96: 'icons/96.png',
    128: 'icons/128.png',
    196: 'icons/196.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'icons/32.png',
    default_title: 'Pomodoro Timer',
  },
  options_page: 'options.html',

  background: {
    service_worker: 'src/background/background.js',
    type: 'module',
  },
  side_panel: {
    default_path: 'sidepanel.html',
  },
  web_accessible_resources: [
    {
      resources: [
        'audio/Pomodoro_break.mp3',
        'audio/Pomodoro_button-sound.mp3',
        'audio/tick.wav',
        'icons/16.png',
        'icons/32.png',
        'icons/96.png',
        'icons/128.png',
        'icons/196.png',
      ],
      matches: ['<all_urls>'],
    },
  ],
  // content_scripts: [
  //   {
  //     matches: ['http://*/*', 'https://*/*'],
  //     js: ['src/contentScript/contentScript.js'],
  //   },
  // ],

  permissions: ['alarms', 'storage', 'notifications', 'sidePanel', 'tabs'],
  host_permissions: ['*://*/*'],
})
