import {ImageBackground, ImageSourcePropType, Modal, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../styles/globalStyles";
import {Text} from "react-native-paper";
import React, {JSX, useState} from "react";
import {Emotion} from "../models/Emotion";
import {useTranslation} from "react-i18next";

interface modelProps {
    diary: number;
    items: Emotion[];
    background: ImageSourcePropType;
}

export default function CaseModel({diary, items, background}: modelProps): JSX.Element {
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
            <ImageBackground
                source={background}
                style={globalStyles.background}
                resizeMode="cover"
            >
                <View style={globalStyles.container}>
                    <View style={globalStyles.heading}>
                        <Text style={globalStyles.heading}>{t("case.emotions")}:</Text>
                    </View>
                    <View style={globalStyles.modalContent}>
                        {/*<EmotionCard diary={diary} emotions={items as Emotion[]} />*/}
                    </View>
                    <View style={globalStyles.buttonContainer}>
                        <TouchableOpacity style={globalStyles.button} onPress={ closeModel }>
                            <Text style={globalStyles.buttonText}>{t("navigation.back")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </Modal>
    );
}
