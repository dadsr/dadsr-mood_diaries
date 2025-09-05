import React, { JSX } from 'react';
import { View, Text, StyleSheet, I18nManager, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DistortionThought } from '../models/DistortionThought';
import { DistortionsThoughtKey } from "../models/consts/DistortionsThoughtsConst";
import { COLORS } from "../styles/themConstants";

interface DistortionsProps {
    distortionThoughts: DistortionThought[];
}

export default function DistortionThoughtCard({ distortionThoughts }: DistortionsProps): JSX.Element {
    const { t } = useTranslation();

    if (distortionThoughts.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    {t("distortionCard.no_distortions_text", { defaultValue: "No distortion thoughts found" })}
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            {distortionThoughts.map((distortionThought, index) => {
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
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
        lineHeight: 24,
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
