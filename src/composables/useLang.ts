import { useI18n } from "vue-i18n";
import { onMounted } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";

export interface ILocale {
  name: string;
  iso: string;
}

export function useLang() {
  const { locale } = useI18n();
  const cookies = useCookies(["locale"]);

  const availableLocales: ILocale[] = [
    {
      name: "English",
      iso: "en",
    },
    {
      name: "Russian",
      iso: "ru",
    },
  ];

  const initLocale = () => {
    const selectedLocale = cookies.get("locale");
    if (selectedLocale) {
      locale.value = selectedLocale;
    }
  };

  const setLocale = (localeIso: string) => {
    console.log(localeIso);
    cookies.set("locale", localeIso);
    locale.value = localeIso;
  };

  onMounted(initLocale);

  return {
    locale,
    availableLocales,
    setLocale,
  };
}
