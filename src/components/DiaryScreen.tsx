import {JSX, useCallback, useState} from "react";
import {FAB} from "react-native-paper";
import {router, useFocusEffect} from "expo-router";
import {SafeAreaView, ScrollView as DefaultScrollView, Text, View } from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import services from "../services/Services";
import {Case} from "../models/Case";
import {globalStyles} from "../styles/globalStyles";
import CaseCard from "./CaseCard";
import {useTranslation} from "react-i18next";


type DiaryProps = {
    diary:number;
};

export default function DiaryScreen({ diary }: DiaryProps): JSX.Element {
    const {t} = useTranslation();

    console.log("DiaryScreen ",diary);
    const insets = useSafeAreaInsets();
    const [cases, setCases] = useState<Case[]>([]);

    useFocusEffect (
        useCallback(() => {
            console.log("FirstDiary focused, fetching cases...");
            services.getCases(diary).then((fetchedCases: Case[]) => {
                setCases(fetchedCases)
            })
        },[])
    );

    const addNewCase = () => {
        console.log('add new case');
        router.push({ pathname: '/editCase', params: { diary:diary, id: 0 } });

    };


    return (
             <SafeAreaView  style = {[globalStyles.container, {
                paddingTop: Math.max(insets.top + 8,20),
                paddingBottom: Math.max(insets.bottom - 25,20)}]}>

                <Text style = {globalStyles.heading}>{t("diary.events list")}:</Text>

                <DefaultScrollView  style = {globalStyles.scrollView}>
                    {cases.length > 0 ?(
                        cases.map(c => <CaseCard key={c.id} diary={diary} case={c} />)
                    ): (
                        <View style = {globalStyles.card}>
                            <Text style={globalStyles.text}>{t("diary.no events found.")}</Text>
                            <Text style={globalStyles.text}>{t("diary.click Add Event to get started.")}</Text>
                        </View>
                    )}
                </DefaultScrollView >
                <FAB
                    icon="plus"
                    color= "#fff"
                    size="medium"
                    onPress={addNewCase}
                    style={globalStyles.fab}
                />


            </SafeAreaView >
    );

}

