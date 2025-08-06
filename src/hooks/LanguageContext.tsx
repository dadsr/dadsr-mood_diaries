import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert, I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from 'expo-updates';
import i18n from "i18next";



type LanguageContextType = {
    isHebrew: boolean;
    toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextType>({
    isHebrew: false,
    toggleLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);


/**********************************************************************************************************************/

type LanguageProviderProps = {
    children: ReactNode;
};

const STORAGE_KEY = "preferredLanguage";

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isHebrew, setIsHebrew] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const savedLang = await AsyncStorage.getItem(STORAGE_KEY);
                if (savedLang) {
                    await i18n.changeLanguage(savedLang);
                    setIsHebrew(savedLang.startsWith("he"));

                    I18nManager.allowRTL(savedLang.startsWith("he"));
                    I18nManager.forceRTL(savedLang.startsWith("he"));

                } else {
                    const currentLang = i18n.language || "en";
                    setIsHebrew(currentLang.startsWith("he"));

                    I18nManager.allowRTL(currentLang.startsWith("he"));
                    I18nManager.forceRTL(currentLang.startsWith("he"));
                }
                setIsReady(true);
            } catch (error) {
                console.error('Error loading language:', error);
                setIsReady(true);
            }
        })();
    }, []);


    const toggleLanguage = async () => {
        try {
            const newLang = isHebrew ? "he" : "en";
            await i18n.changeLanguage(newLang);
            await AsyncStorage.setItem(STORAGE_KEY, newLang);

            const willBeRTL = newLang.startsWith("en");
            if (I18nManager.isRTL !== willBeRTL) {
                // Change RTL/LTR config
                I18nManager.allowRTL(willBeRTL);
                I18nManager.forceRTL(willBeRTL);

                Alert.alert(
                    "Restart Required",
                    "The app needs to reload to apply the language direction.",
                    [
                        {
                            text: "OK",
                            onPress: async () => {
                                if (Updates && Updates.reloadAsync) {
                                    await Updates.reloadAsync(); // Expo app reload
                                } else {
                                    // Fallback: force reload via RN DevTools or similar
                                    console.warn("App reload is not supported");
                                }
                            },
                        },
                    ],
                    { cancelable: false }
                );
            }

            setIsHebrew(!isHebrew);
        } catch (error) {
            console.error('Error toggling language:', error);
        }
    };

    if (!isReady) {
        return null;//todo spinner
    }

    return (
        <LanguageContext.Provider value={{ isHebrew, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
/**********************************************************************************************************************/

