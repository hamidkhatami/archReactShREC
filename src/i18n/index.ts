import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import faTranslation from "./locales/fa/translation.json";
import enTranslation from "./locales/en/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: faTranslation },
      en: { translation: enTranslation }
    },
    lng: "fa",        // زبان پیش‌فرض
    fallbackLng: "fa",
    interpolation: { escapeValue: false }
  });

export default i18n;
