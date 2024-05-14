/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import i18n from './plugins/i18n'

// Composables
import { createApp } from 'vue'

const app = createApp(App).use(i18n)

registerPlugins(app)

app.mount('#app')
