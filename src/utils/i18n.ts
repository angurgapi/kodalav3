import { createI18n } from "vue-i18n";
import en from "@/locales/en";
import ru from "@/locales/ru";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: en,
    ru: ru,
  },
});

export const { t } = i18n.global;
export default i18n;
