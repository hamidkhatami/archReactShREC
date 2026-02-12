import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import faTranslation from "@/i18n/fa-translation.json";
import enTranslation from "@/i18n/en-translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
       fa: { translation: faTranslation },
      en: { translation: enTranslation }
    },
    lng: "fa",       
    fallbackLng: "fa",
    interpolation: { escapeValue: false }
  });

export default i18n;
