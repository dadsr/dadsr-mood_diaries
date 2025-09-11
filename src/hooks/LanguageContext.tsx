import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert, I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import * as SplashScreen from "expo-splash-screen";
import i18n from "i18next";

type LanguageContextType = {
  isHebrew: boolean;
  toggleLanguage: () => void;
};

type LanguageProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = "preferredLanguage";
const RTL_FLAG_KEY = "rtlConfigured";

export const LanguageContext = createContext<LanguageContextType>({
  isHebrew: false,
  toggleLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isHebrew, setIsHebrew] = useState(false);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem(STORAGE_KEY);
        const selectedLang = savedLang ?? (i18n.language || "he");
        if (!savedLang) {
          await AsyncStorage.setItem(STORAGE_KEY, selectedLang);
        }

        await i18n.changeLanguage(selectedLang);
        const isHebrewLang = selectedLang.startsWith("he");
        setIsHebrew(isHebrewLang);

        const rtlConfigured = await AsyncStorage.getItem(RTL_FLAG_KEY);

        if (
          I18nManager.isRTL !== isHebrewLang &&
          ((isHebrewLang && rtlConfigured !== "rtl") ||
            (!isHebrewLang && rtlConfigured !== "ltr"))
        ) {
          I18nManager.allowRTL(isHebrewLang);
          I18nManager.forceRTL(isHebrewLang);
          await AsyncStorage.setItem(
            RTL_FLAG_KEY,
            isHebrewLang ? "rtl" : "ltr"
          );
          if (Updates?.reloadAsync) {
            await Updates.reloadAsync();
          }
          // todo only for development!  remove !!!!!!!!
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
          return; // ← No setIsReady(true) if you're reloading!
        }

        // --------- ⭐️ IF WE GET HERE, WE ARE READY! ⭐️ -------------
        await AsyncStorage.setItem(RTL_FLAG_KEY, isHebrewLang ? "rtl" : "ltr");
        setIsReady(true);
      } catch (error) {
        console.error("❌ Error initializing language or RTL:", error);
        setIsReady(true); // Always end with isReady = true in catch
      }
    };
    initializeLanguage();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  const toggleLanguage = async () => {
    try {
      const newLang = isHebrew ? "en" : "he";
      const newIsHebrew = !isHebrew;
      await i18n.changeLanguage(newLang);
      await AsyncStorage.setItem(STORAGE_KEY, newLang);
      const needsRTL = newLang.startsWith("he");
      const rtlConfigured = await AsyncStorage.getItem(RTL_FLAG_KEY);

      if (
        I18nManager.isRTL !== needsRTL &&
        ((needsRTL && rtlConfigured !== "rtl") ||
          (!needsRTL && rtlConfigured !== "ltr"))
      ) {
        I18nManager.allowRTL(needsRTL);
        I18nManager.forceRTL(needsRTL);
        await AsyncStorage.setItem(RTL_FLAG_KEY, needsRTL ? "rtl" : "ltr");
        Alert.alert(
          "Restart Required",
          "The app needs to reload to apply the language direction changes.",
          [
            {
              text: "OK",
              onPress: async () => {
                if (Updates?.reloadAsync) {
                  await Updates.reloadAsync();
                }
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        setIsHebrew(newIsHebrew);
        await AsyncStorage.setItem(RTL_FLAG_KEY, needsRTL ? "rtl" : "ltr");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to change language. Please try again.");
    }
  };

  if (!isReady) {
    return null;
  } 

  return (
    <LanguageContext.Provider value={{ isHebrew, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
