import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonEs from './locales/es/common.json'
import formsEs from './locales/es/forms.json'

void i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  ns: ['common', 'forms'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  resources: {
    es: {
      common: commonEs,
      forms: formsEs,
    },
  },
})

export default i18n
