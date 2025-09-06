import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { Alert, I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import i18n from 'i18next';

type LanguageContextType = {
    isHebrew: boolean;
    toggleLanguage: () => void;
};

type LanguageProviderProps = {
    children: ReactNode;
};

const STORAGE_KEY = 'preferredLanguage';

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
                console.log('🔄 Initializing language...');
                const savedLang = await AsyncStorage.getItem(STORAGE_KEY);
                console.log('💾 Saved language from storage:', savedLang);

                const selectedLang = savedLang ?? (i18n.language || 'he');

                if (!savedLang) {
                    await AsyncStorage.setItem(STORAGE_KEY, selectedLang);
                    console.log('💾 Saved default language to storage:', selectedLang);
                }

                await i18n.changeLanguage(selectedLang);
                console.log('🌐 i18n language changed to:', selectedLang);

                const isHebrewLang = selectedLang.startsWith('he');
                setIsHebrew(isHebrewLang);

                // Configure RTL for the current language
                I18nManager.allowRTL(isHebrewLang);
                I18nManager.forceRTL(isHebrewLang);
                console.log('➡️ RTL configured:', isHebrewLang);

                console.log('✅ Language initialization complete');
            } catch (error) {
                console.error('❌ Error initializing language:', error);
                try {
                    await AsyncStorage.setItem(STORAGE_KEY, 'he');
                    await i18n.changeLanguage('he');
                    setIsHebrew(false);
                } catch (fallbackError) {
                    console.error('❌ Error in fallback:', fallbackError);
                }
            } finally {
                setIsReady(true);
            }
        };

        initializeLanguage();
    }, []);

    const toggleLanguage = async () => {
        try {
            console.log('🔄 Starting language toggle...');
            console.log('📍 Current state - isHebrew:', isHebrew);

            const newLang = isHebrew ? 'en' : 'he';
            const newIsHebrew = !isHebrew;

            await i18n.changeLanguage(newLang);
            console.log('🌐 i18n language changed to:', newLang);

            await AsyncStorage.setItem(STORAGE_KEY, newLang);
            console.log('💾 Language saved to storage:', newLang);

            const needsRTL = newLang.startsWith('he');
            console.log('➡️ Needs RTL:', needsRTL, 'Current RTL:', I18nManager.isRTL);

            if (I18nManager.isRTL !== needsRTL) {
                // Update state optimistically so UI reflects the intent
                setIsHebrew(newIsHebrew);

                I18nManager.allowRTL(needsRTL);
                I18nManager.forceRTL(needsRTL);

                Alert.alert(
                    'Restart Required',
                    'The app needs to reload to apply the language direction changes.',
                    [
                        {
                            text: 'OK',
                            onPress: async () => {
                                try {
                                    if (Updates?.reloadAsync) {
                                        console.log('🔄 Reloading app...');
                                        await Updates.reloadAsync();
                                    } else {
                                        console.warn('⚠️ App reload is not supported in this environment');
                                    }
                                } catch (e) {
                                    console.warn('⚠️ Reload failed:', e);
                                }
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                console.log("✅ RTL state doesn't need to change, updating state only");
                setIsHebrew(newIsHebrew);
            }
        } catch (error) {
            console.error('❌ Error toggling language:', error);
            Alert.alert('Error', 'Failed to change language. Please try again.');
        }
    };

    if (!isReady) {
        console.log('⏳ Language context not ready yet...');
        return null; // TODO: render a Splash/Loader if desired
    }

    return (
        <LanguageContext.Provider value={{ isHebrew, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};




