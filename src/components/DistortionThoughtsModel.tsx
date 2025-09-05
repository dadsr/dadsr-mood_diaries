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
import {useTranslation} from "react-i18next";
import {COLORS} from "../styles/themConstants";
import { modelImg } from "../../assets";
import { DistortionThought } from "../models/DistortionThought";
import { DistortionsThoughtKey } from "../models/consts/DistortionsThoughtsConst";



interface modelProps {
    diary: number;
    distortionThoughts: DistortionThought[] | null;
}

export default function DistortionThoughtsModel({diary, distortionThoughts}: modelProps): JSX.Element {

    const {t} = useTranslation();

    const [isModalVisible, setIsModalVisible] = useState(true);

    const closeModel = () => {
        setIsModalVisible(false);
        console.log("closeModel");
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
                        <Text style={styles.headingText}>{t("case.distortionThoughts")}:</Text>
                </View>

                <View style={styles.modalContent}>
                   <View style={styles.container}>
                    {/* <ImageBackground source={modelImg} style={styles.backgroundImage}> */}
                        <ScrollView>
                          {(!distortionThoughts || distortionThoughts.length === 0) ? 
                          (
                                 <Text> {t("case.no distortions to display")} </Text>
                          ) : (
                                distortionThoughts.map((distortionThought, index) => {
                                               const distortionKey: DistortionsThoughtKey | null = distortionThought.getDistortion;
                               
                                               if (!distortionKey) {
                                                   return null;
                                               }
                               
                                               const displayName: string = t(`distortions.${distortionKey}`, {
                                                   defaultValue: distortionKey
                                               });
                                               const description: string = t(`distortions.${distortionKey}_description`, {
                                                   defaultValue: 'No description available.'
                                               });
                               
                                               return (
                                                   <View key={index} style={styles.itemContainer}>
                                                       <View style={styles.itemHeader}>
                                                           <View style={styles.indexBadge}>
                                                               <Text style={styles.indexText}>{index + 1}</Text>
                                                           </View>
                                                           <Text style={styles.displayName}>{displayName}</Text>
                                                       </View>
                               
                                                       <Text style={styles.description}>{description}</Text>
                               
                                                       {/* Optional: Add severity indicator or other metadata */}
                                                       <View style={styles.metaContainer}>
                                                           <View style={styles.categoryBadge}>
                                                               <Text style={styles.categoryText}>
                                                                   {t("distortions.category", { defaultValue: "Cognitive Distortion" })}
                                                               </Text>
                                                           </View>
                                                       </View>
                                                   </View>
                                               );
                                           })
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
    itemContainer: {
         backgroundColor: COLORS.todo,
         borderRadius: 12,
         padding: 16,
         marginVertical: 6,
         borderWidth: 1,
         borderColor: COLORS.cardBorder,
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.1,
         shadowRadius: 4,
         elevation: 3,
     },
     itemHeader: {
         flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
         alignItems: 'center',
         marginBottom: 12,
     },
     indexBadge: {
         backgroundColor: COLORS.primary,
         borderRadius: 12,
         width: 24,
         height: 24,
         justifyContent: 'center',
         alignItems: 'center',
         marginRight: I18nManager.isRTL ? 0 : 12,
         marginLeft: I18nManager.isRTL ? 12 : 0,
     },
     indexText: {
         color: COLORS.titleText,
         fontSize: 12,
         fontWeight: 'bold',
     },
     displayName: {
         fontWeight: 'bold',
         fontSize: 18,
         color: COLORS.text,
         textAlign: I18nManager.isRTL ? 'right' : 'left',
         flex: 1,
     },
     description: {
         color: COLORS.todo,
         fontSize: 14,
         lineHeight: 20,
         textAlign: I18nManager.isRTL ? 'right' : 'left',
         marginBottom: 12,
     },
     metaContainer: {
         flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
         justifyContent: 'flex-end',
     },
     categoryBadge: {
         backgroundColor: COLORS.titleText,
         paddingHorizontal: 8,
         paddingVertical: 4,
         borderRadius: 8,
     },
     categoryText: {
         fontSize: 12,
         color: COLORS.titleText,
         fontWeight: '500',
     },
});