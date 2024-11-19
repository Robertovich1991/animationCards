import { Armenian, English, Russian } from "../translations";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";

const resources = {
  en: {
    translation: English
  },
  ru: {
    translation: Russian
  },
  am: {
    translation: Armenian
  }
}

i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false
    },
    lng: "en"
  });

export default i18next