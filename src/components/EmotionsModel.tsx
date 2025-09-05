import {
    I18nManager,
    ImageBackground,
    ImageSourcePropType,
    Modal,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View
} from "react-native";
import {globalStyles} from "../styles/globalStyles";
import {Text} from "react-native-paper";
import React, {JSX, useState} from "react";
import {Emotion} from "../models/Emotion";
import {useTranslation} from "react-i18next";
import {COLORS} from "../styles/themConstants";
import Slider from '@react-native-community/slider';


interface modelProps {
    diary: number;
    emotions: Emotion[] | null;
}

export default function EmotionsModel({diary, emotions}: modelProps): JSX.Element {

    const {t} = useTranslation();

    const [isModalVisible, setIsModalVisible] = useState(true);

    const closeModel = () => {
        setIsModalVisible(false);
        console.log("closeModel");
    };

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



    return (
        <SafeAreaView>
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
                   <View style={styles.container}>
                    {/* <ImageBackground source={modelImg} style={styles.backgroundImage}> */}
                        <ScrollView>
                          {(!emotions || emotions.length === 0) ? 
                          (
                                 <Text> {t("case.No items to display")} </Text>
                          ) : (
                               emotions.map((emotion: Emotion, index: number) => (
                                   <View key={index} style={styles.emotionContainer}>
                                     <View style={styles.emotionHeader}>
                                         <Text style={styles.emotionName}>
                                          {t(`emotions.${emotion.getEmotion}`, { defaultValue: emotion.getEmotion })}
                                        </Text>
                                    <View style={styles.intensityBadge}>
                                      <Text style={styles.intensityBadgeText}>
                                        {emotion.getIntensity}%
                                      </Text>
                                    </View>
                                  </View>

                                  <View style={styles.sliderContainer}>
                                    <View style={styles.sliderTrackContainer}>
                                      <Slider
                                        style={[styles.slider, { transform: I18nManager.isRTL ? [{ rotateY: '180deg' }] : [] }]}
                                        minimumValue={0}
                                        maximumValue={100}
                                        value={emotion.getIntensity}
                                        disabled={true}
                                      />
                                      <View style={styles.markingsContainer}>
                                        {renderSliderMarkings()}
                                      </View>
                                    </View>
                                  </View>
                                </View>
                                ))
                            )
                          }
                        </ScrollView>
                    {/* </ImageBackground> */}
                   </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={globalStyles.button} onPress={ closeModel }>
                        <Text style={globalStyles.buttonText}>{t("navigation.back")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
       </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:"column",
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 20,
    },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
     minHeight: 800,
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
        flex: 1,
        padding: 2,
        backgroundColor: COLORS.modelBackground,
    },
    buttonContainer: {
        alignItems: 'center',
        paddingBottom: 20,
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