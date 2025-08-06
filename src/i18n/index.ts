import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import translationEn from './locales/en.json';
import translationHe from './locales/he.json';

const resources = {
    en: { translation: translationEn },
    he: { translation: translationHe },
};

const locale =
    Localization.getLocales && Localization.getLocales().length > 0
        ? Localization.getLocales()[0].languageTag
        : 'en';

i18n
    .use(initReactI18next)
    .init({
        resources,
        // lng: locale,
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false
        },

        returnEmptyString: false,
        react: {
            useSuspense: false,
        },
    });

export default i18n;
