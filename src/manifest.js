import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json' assert { type: 'json' }

const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo.png',
    32: 'img/logo.png',
    48: 'img/logo.png',
    128: 'img/logo.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo.png',
    default_title: 'Pomodoro Timer',
  },
  options_page: 'options.html',

  background: {
    service_worker: 'src/background/background.js',
    type: 'module',
  },
  // content_scripts: [
  //   {
  //     matches: ['http://*/*', 'https://*/*'],
  //     js: ['src/contentScript/contentScript.js'],
  //   },
  // ],

  permissions: ['alarms', 'storage', 'notifications'],
})
