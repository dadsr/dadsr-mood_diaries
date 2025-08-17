import {
    I18nManager,
    ImageBackground,
    ImageSourcePropType,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import {globalStyles} from "../styles/globalStyles";
import {Text} from "react-native-paper";
import React, {JSX, useState} from "react";
import {Emotion} from "../models/Emotion";
import {useTranslation} from "react-i18next";
import EmotionCard from "./EmotionCard";
import {COLORS} from "../styles/themConstants";

interface modelProps {
    diary: number;
    items: Emotion[];
}

export default function CaseModel({diary, items}: modelProps): JSX.Element {
    const {t} = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(true);
    const closeModel = () => {
        setIsModalVisible(false);
        console.log("closeModel");
    };


    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={ closeModel }
        >
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>{t("case.emotions")}:</Text>
                    </View>
                    <View style={styles.modalContent}>

                        {diary === 1 && (
                            <EmotionCard diary={diary} emotions={items as Emotion[]} />
                        )}

                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={globalStyles.button} onPress={ closeModel }>
                            <Text style={globalStyles.buttonText}>{t("navigation.back")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:"column",
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 20,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    heading: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    },
    headingText:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    modalContent:{
        padding: 10,
        backgroundColor: COLORS.background,
        borderWidth: 2,
        borderColor:'black',
    },
    buttonContainer: {
        alignItems: 'center',
    }
});
