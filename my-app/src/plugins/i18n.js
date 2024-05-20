import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
  globalInjection: true,
  messages: {
    en,
    es,
    fr,
  }
})

export default i18n