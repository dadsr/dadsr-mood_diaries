import {JSX, useCallback, useState} from "react";
import {FAB} from "react-native-paper";
import {router, useFocusEffect} from "expo-router";
import {
    FlatList,
    I18nManager,
    SafeAreaView,
    ScrollView as DefaultScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import services from "../services/Services";
import {Case} from "../models/Case";
import {globalStyles} from "../styles/globalStyles";
import CaseCard from "./CaseCard";
import {useTranslation} from "react-i18next";
import {COLORS, TYPOGRAPHY} from "../styles/themConstants";


type DiaryProps = {
    diary:number;
};

export default function DiaryScreen({ diary }: DiaryProps): JSX.Element {
    console.log("DiaryScreen ",diary);

    const {t} = useTranslation();

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

    const renderCase = ({ item }: { item: Case }) => (
        <CaseCard diary={diary} case={item} />
    );

    const ListEmptyComponent = () => (
        <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsTextHeader}>{t("diary.no events found.")}</Text>
            <Text style={styles.noEventsText}>{t("diary.click Add Event to get started.")}</Text>
        </View>
    );

    const addNewCase = () => {
        console.log('add new case');
        router.push({ pathname: '/editCase', params: { diary:diary, id: 0 } });

    };


    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={cases}
                renderItem={renderCase}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <Text style={styles.heading}>{t("diary.events list")}:</Text>
                }
                ListEmptyComponent={ListEmptyComponent}
                contentContainerStyle={styles.listContentContainer}
            />

            <FAB
                icon="plus"
                color= {COLORS.white}
                size="medium"
                onPress={addNewCase}
                style={[styles.fab,{ bottom: insets.bottom - 15 }]}
            />

        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    listContentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },

    heading: {
        ...TYPOGRAPHY.HEADING.H2,
        width: '100%',
        paddingHorizontal: 16,
        marginVertical: 16,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    noEventsContainer: {
        marginTop: '40%',
        padding: 20,
        backgroundColor: COLORS.cardBackground,
        borderColor: COLORS.cardBorder,
        borderWidth: 2,
        borderRadius: 15,
        alignItems: 'center',
    },

    noEventsTextHeader: {
        ...TYPOGRAPHY.HEADING.H4,
        marginBottom: 12,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    noEventsText: {
        ...TYPOGRAPHY.BODY.LARGE,
        color: COLORS.textSecondary,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    fab: {
        position: "absolute",
        [I18nManager.isRTL ? "left" : "right"]: 16,
        backgroundColor: COLORS.button,
    }

});
