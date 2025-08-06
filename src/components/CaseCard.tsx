import React, {JSX, useState} from "react";
import {Card, Text, Button } from "react-native-paper";
import {Case} from "../models/Case";
import {router} from "expo-router";
import services from "../services/Services";
import {globalStyles} from "../styles/globalStyles";
import {ImageBackground, TouchableOpacity, View} from "react-native";
import {background} from "../../assets";
import {Emotion} from "../models/Emotion";
import CaseModel from "./CaseModel";
import {useTranslation} from "react-i18next";

interface caseProps {
    diary: number;
    case: Case;
}

export default function CaseCard(props: caseProps): JSX.Element {
    const {t} = useTranslation();
    console.log("CaseCard");
    const {diary: diary,case: item } = props
    const [isFeelingsModalVisible, setIsFeelingsModalVisible] = useState(false);
    const [isThoughtsModalVisible, setIsThoughtsModalVisible] = useState(false);

    const openFeelingsModal = () => setIsFeelingsModalVisible(true);
    const closeFeelingsModal = () => setIsFeelingsModalVisible(false);

    const openThoughtsModal = () => setIsThoughtsModalVisible(true);
    const closeThoughtsModal = () => setIsThoughtsModalVisible(false);


    const editCase = () => {
        router.push({ pathname: '/editCase', params: {diary: diary, id: item.id } });
    };


    const deleteCase = () => {
        services.deleteCase(diary, item.id);
        console.log("deleteCase");

        switch(diary) {
            case 1:
                router.replace('/(tabs)/firstDiary');
                break;

            case 2:
                router.replace('/(tabs)/secondDiary');
                break;

            case 3:{
                router.replace('/(tabs)/thirdDiary');
                break;
            }

        }
    };

    return (
        <Card >

            <Card.Title
                title={ item.caseName }
                subtitle={ item.caseDate.toLocaleDateString('he-IL') }
            />
            <Card.Content>

                <Text style={ globalStyles.text } > {t("case.description")}: {item.caseDescription} </Text>
                <Text style={ globalStyles.text } > {t("case.thought")}: {item.thought} </Text>

                <TouchableOpacity style={globalStyles.modelOpener} onPress={openFeelingsModal}>
                    <Text style={globalStyles.text} > {t("case.emotions display")} </Text>
                </TouchableOpacity>

                {isFeelingsModalVisible && (
                    <CaseModel diary = {diary} items = {item.emotions} background = {background} />
                )}


                {diary === 1 &&(
                    <>
                        <Text style={globalStyles.text} >{t("case.behavior")}: {item.behavior}</Text>
                        <Text style={globalStyles.text} >{t("case.symptoms")}: {item.symptoms}</Text>
                    </>
                )}

            </Card.Content>

            <Card.Actions style={globalStyles.actionsButtonsContainer}>

                < Button style={globalStyles.actionsButtons} onPress={editCase} > {t("case.actions.edit")} </Button>
                < Button style={globalStyles.actionsButtons} onPress={deleteCase} >{t("case.actions.delete")} </Button>

            </Card.Actions>

        </Card>
    );

}


