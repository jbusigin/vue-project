/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Themes
const modifiedLightTheme = {
  dark: false,
  colors: {
    background: '#f7f7f7', // original : #fff
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#116ab6', // original: #1867C0
    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    anchor: '#074c92',
    'ui-gray': '#777',
    'mid-gray': '#eee',
    'mid-gray2': '#bbb',
    'light-gray': '#f7f7f7',
    'lighter-gray': '#fafafa',
    'light-blue': '#e3f0f8',
    'brand-color-primary': '#002e6d', // one step dark blue
    'brand-color-secondary': '1ba5ff', // one step light blue
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  }
}

// Composables
import { createVuetify } from 'vuetify'

// Translations for Vuetify UI componenets
import { en, es, fr } from 'vuetify/locale'
import en_t from '@/locales/en' // translation file

export default createVuetify({
  theme: {
    defaultTheme: 'modifiedLightTheme',
    themes: {
      modifiedLightTheme
    }
  },
  locale: {
    locale: 'en',
    fallback: 'en_t',
    messages: { en, es, fr },
  },
})
