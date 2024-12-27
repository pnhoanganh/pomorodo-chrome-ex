import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json' assert { type: 'json' }

const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/pomorodo.png',
    32: 'img/pomorodo.png',
    48: 'img/pomorodo.png',
    128: 'img/pomorodo.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/pomorodo.png',
  },
  options_page: 'options.html',

  background: {
    service_worker: 'src/background/background.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/contentScript.js'],
    },
  ],

  permissions: ['alarms', 'storage', 'notifications'],
})
