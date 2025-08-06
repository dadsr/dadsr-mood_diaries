import {SafeAreaView, View} from "react-native";
import { Switch, Text } from 'react-native-paper';
import {useTranslation} from "react-i18next";
import {useLanguage} from "../../src/hooks/LanguageContext";
import {globalStyles} from "../../src/styles/globalStyles";


export default function Settings() {
    const { t } = useTranslation();
    const { isHebrew, toggleLanguage } = useLanguage();



    return (
        <SafeAreaView style={globalStyles.safeAreaContainer} >
            {/* Language Switch */}
            <View style={globalStyles.switchContainer}>
                <Text >{t('settings.English')}</Text>
                <Switch
                    value={isHebrew}
                    onValueChange={toggleLanguage}
                    style={{ marginHorizontal: 10 }}
                />
                <Text>{t('settings.Hebrew')}</Text>
            </View>

        </SafeAreaView>
    )
}
