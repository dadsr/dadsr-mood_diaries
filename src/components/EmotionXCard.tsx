import React, { JSX } from "react";
import { globalStyles } from "../styles/globalStyles";
import { ImageBackground, View, Text, StyleSheet, ScrollView } from "react-native";
import { modelImg } from "../../assets";
import { Emotion } from "../models/Emotion";
import Slider from "@react-native-community/slider";
import { COLORS } from "../styles/themConstants";
import { useTranslation } from "react-i18next";

interface EmotionsProps {
  emotions?: Emotion[]; // Made optional with ?
}

export default function EmotionCard(props: EmotionsProps): JSX.Element {
  console.log("EmotionCard");
  const { t } = useTranslation();
  const { emotions = [] } = props;

  console.log("emotions - ", emotions.length);

  // Function to render markings for slider
  const renderSliderMarkings = () => {
    console.log("renderSliderMarkings");
    const markings = [];
    for (let i = 0; i <= 100; i += 20) {
      markings.push(
        <View key={i} style={[styles.sliderMark, { left: `${i}%` }]}>
          <View style={styles.markLine} />
          <Text style={styles.markText}>{i}</Text>
        </View>
      );
    }
    return markings;
  };

  const getIntensityColor = (intensity: number): string => {
    console.log("getIntensityColor");
    if (intensity <= 25) return '#4CAF50'; // Green
    if (intensity <= 50) return '#FF9800'; // Orange
    if (intensity <= 75) return '#F44336'; // Red
    return COLORS.primary; // Primary color for highest intensity
  };

  // Check if emotions is empty or undefined
  if (!emotions || emotions.length === 0) {
    console.log("emotions.length === 0");
    return (
      <View style={styles.container}>
        <ImageBackground source={modelImg} style={styles.backgroundImage}>
          <View style={styles.noEmotionsContainer}>
            <Text style={styles.noEmotionsText}>
              {t("emotionCard.no emotions text")}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
console.log(emotions);

  return (
    <View style={styles.container}>
      <ImageBackground source={modelImg} style={styles.backgroundImage}>
        <ScrollView>
          {emotions.map((emotion: Emotion, index: number) => (
            <View key={index} style={styles.emotionContainer}>
              <View style={styles.emotionHeader}>
                <Text style={styles.emotionName}>
                  {t(`emotions.${emotion.getEmotion}`, { defaultValue: emotion.getEmotion })}
                </Text>
                <View style={[styles.intensityBadge, { backgroundColor: getIntensityColor(emotion.getIntensity) }]}>
                  <Text style={styles.intensityBadgeText}>
                    {emotion.getIntensity}%
                  </Text>
                </View>
              </View>

              <View style={styles.sliderContainer}>
                <View style={styles.sliderTrackContainer}>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    value={emotion.getIntensity}
                    minimumTrackTintColor={getIntensityColor(emotion.getIntensity)}
                    maximumTrackTintColor="#E0E0E0"
                    thumbStyle={styles.sliderThumb}
                    thumbTintColor={getIntensityColor(emotion.getIntensity)}
                    disabled={true}
                  />
                  <View style={styles.markingsContainer}>
                    {renderSliderMarkings()}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

// ... rest of styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
     minHeight: 800,
  },
  noEmotionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,

  },
  noEmotionsText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS.text,
  },
  emotionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.titleText,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emotionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emotionName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  intensityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 60,
    alignItems: 'center',
  },
  intensityBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.titleText,
  },
  sliderContainer: {
    marginTop: 8,
  },
  sliderTrackContainer: {
    position: 'relative',
    height: 40,
  },
  markingsContainer: {
    position: 'absolute',
    top: 30,
    left: 12,
    right: 12,
    height: 20,
  },
  slider: {
    height: 40,
    marginHorizontal: 0,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderMark: {
    position: 'absolute',
    alignItems: 'center',
    marginLeft: -10,
  },
  markLine: {
    width: 2,
    height: 8,
    backgroundColor: COLORS.titleText,
    borderRadius: 1,
    marginBottom: 2,
  },
  markText: {
    fontSize: 10,
    color: COLORS.text,
    fontWeight: '500',
  },
});
