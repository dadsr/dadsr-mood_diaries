import {Control, Controller} from "react-hook-form";
import {CaseFormValues, EmotionOption} from "../models/Types";
import {EmotionKey, EmotionsConst} from "../models/consts/EmotionsConst";
import {I18nManager, StyleSheet, View, Text} from "react-native";
import {Emotion} from "../models/Emotion";
import Slider from "@react-native-community/slider";
import {MultiSelect} from 'react-native-element-dropdown';
import {COLORS} from "../styles/themConstants";
import {useTranslation} from "react-i18next";
import {nbsp} from "../styles/globalStyles";
import {JSX} from "react";


interface EmotionsSelectorProps {
    diary: number;
    control: Control<CaseFormValues>;
    name: "emotions";
}

export function EmotionsSelector({diary, control, name}: EmotionsSelectorProps): JSX.Element {
    console.log("EmotionsSelector");

    const {t} = useTranslation();

    const emotionOptions: EmotionOption[] = Object.entries(EmotionsConst).map(([key, emotion]) => ({
        value: key as EmotionKey,
        label: emotion.displayName,
        intensity: 50
    }));

    // Function to render markings for slider
    const renderSliderMarkings = () => {
        const markings = [];
        for (let i = 0; i <= 100; i += 10) {
            markings.push(
                <View key={i} style={[styles.sliderMark, { left: `${i}%` }]}>
                    <View style={styles.markLine} />
                </View>
            );
        }
        return markings;
    };


    return (

        <View style={styles.container}>
            <Text style={styles.heading}>{t('emotionsSelector.emotions')}{':'+ nbsp}</Text>
            <Controller
                name={name}
                control={control}
                render={({field}) => {
                    const selectValue: EmotionOption[] = Array.isArray(field.value) ?
                        field.value
                            .filter((emotion: Emotion) => emotion.getEmotion !== null && emotion.getEmotion !== undefined)
                            .map((emotion: Emotion) => (
                                {
                                    value: emotion.getEmotion as EmotionKey,
                                    label: EmotionsConst[emotion.getEmotion as EmotionKey].displayName,
                                    intensity: emotion.getIntensity
                                }
                            )) : [];

                    return (
                        <View>
                            <View style={styles.selectorContainer}>
                                <MultiSelect
                                    selectedTextStyle={styles.multiSelectPlaceholder}
                                    inputSearchStyle={styles.multiSelectSearch}
                                    iconStyle={styles.multiSelectIcon}
                                    data={emotionOptions}
                                    labelField="label"
                                    valueField="value"
                                    value={selectValue.map(option => option.value)}
                                    onChange={(selectedItems) => {
                                        const emotions = selectedItems.map((item: any) => {
                                            const existingEmotion = selectValue.find(option => option.value === item);

                                            return new Emotion(
                                                item,
                                                existingEmotion ? existingEmotion.intensity : 50
                                            );
                                        });
                                        field.onChange(emotions);
                                    }}
                                    placeholder={t('emotionsSelector.choose an emotion')}
                                    search
                                    searchPlaceholder={t('emotionsSelector.search')}
                                />
                            </View>

                            {/* Intensity sliders for selected emotions */}
                            {selectValue.map((option: EmotionOption) => (
                                <View key={option.value} style={styles.sliderContainer}>
                                    <Text style={styles.emotionLabel}>{option.label}</Text>

                                    <View key={option.value} style={styles.sliderWithMarkings} >
                                        <View style={styles.markingsContainer}>
                                            {renderSliderMarkings()}
                                        </View>

                                        <Slider
                                            style={styles.slider}
                                            minimumValue={0}
                                            maximumValue={100}
                                            step={10}
                                            value={option.intensity}
                                            onValueChange={(value) => {
                                                const updated = field.value.map((emotion: Emotion) =>
                                                    emotion.getEmotion === option.value
                                                        ? new Emotion(option.value, parseInt(value.toString()))
                                                        : emotion
                                                );
                                                field.onChange(updated);
                                            }}
                                            minimumTrackTintColor="#007AFF"
                                            maximumTrackTintColor="#CCCCCC"
                                        />
                                    </View>
                                    <Text style={styles.intensityValue}>{option.intensity}%</Text>
                                </View>
                            ))}
                        </View>
                    );
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 20,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    heading:{
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    },

    sliderMark:{
        position: 'absolute',
        alignItems: 'center',
        transform: [{ translateX: -5 }], // Center the mark
    },

    markLine:{
        width: 1,
        height: 6,
        backgroundColor: '#666',
        marginBottom: 2,
    },

    selectorContainer:{
        fontSize: 8,
        color: '#666',
        textAlign: 'center',
        minWidth: 10,
    },

    multiSelectPlaceholder:{
        fontSize:18,
        color: COLORS.text,
    },

    multiSelectSearch:{
        height: 50,
        fontSize: 18,
        textAlign:  I18nManager.isRTL ? 'right' : 'left',
    },

    multiSelectIcon:{
        width: 20,
        height: 20,
    },

    sliderContainer:{
        flexDirection: 'column', // Changed from row to column
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        marginVertical: 5,
        zIndex: 1,
        backgroundColor: COLORS.background,
    },

    emotionLabel:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'right',
    },

    sliderWithMarkings:{
        position: 'relative',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        marginVertical: 10,
        zIndex: 1,
    },

    markingsContainer:{
        position: 'absolute',
        top: 15, // Position markings below the slider track
        left: 15, // Account for slider padding
        right: 15, // Account for slider padding
        height: 30,
        zIndex: 1,
        pointerEvents: 'none',
    },

    slider:{
        width: '100%',
        height: 40,
        zIndex: 2,
    },

    intensityValue:{
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        fontWeight: 'bold',
    }

});

