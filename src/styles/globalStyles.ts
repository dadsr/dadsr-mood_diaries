import {StyleSheet, TextStyle} from 'react-native';


export const colors = {
    primary: '#4630EB',
    secondary: '#000020',
    accent: '#F3534A',
    background: '#f0f0f0',
    text: '#101010',
    textLight: '#606060',
    white: '#FFFFFF',
    black: '#000000',
    error: '#FF3B30',
    success: '#4CD964',
};

export const typography = {
    fontSizes: {
        small: 12,
        medium: 16,
        large: 20,
        xlarge: 24,
        xxlarge: 30,
    },
    fontWeights: {
        regular: 'normal',
        medium: '500',
        bold: 'bold',
    },
};

export const spacing = {
    xs: 2,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
    xxxxl: 56,
};

export const globalStyles = StyleSheet.create({
    // RTL specific styles
    rtlContainer: {
        flexDirection: 'row-reverse',
    },
    rtlText: {
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    // Common styles
    container: {
        flex: 1,
        padding: spacing.m,
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    view: {
        borderColor: '#000020',
        width: '100%',
        marginBottom: 16,
    },
    scrollView: {
        borderColor: '#000020',
        width: '100%',
        marginBottom: 5,
    },
    heading: {
        textAlign: 'right',
        writingDirection: 'rtl',
        fontSize: typography.fontSizes.xlarge,
        fontWeight: 'bold' as TextStyle['fontWeight'],
        color: colors.primary,
        marginBottom: spacing.m,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'right',
        color: '#333',
    },
    error: {
        color: 'red',
        marginBottom: 8
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
        height: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
    },

    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: colors.primary,
        margin: spacing.xs,
        padding: spacing.s,
        width: '70%',
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'right',
        writingDirection: 'rtl',
        color: colors.white,
        fontWeight: 'medium' as TextStyle['fontWeight'],

    },


    selectorContainer: {
        margin: 5,
        borderWidth:1,
        borderRadius: 8,
        borderColor:'#000',
        backgroundColor: colors.background,



    },

    multiSelectWrapper: {
        zIndex: 1000, // Ensure dropdown appears above other elements
        borderColor:'#000',
    },
    multiSelect:{

    },
    multiSelectContainer: {
        height: 50,
        borderColor: '#060000',
        borderWidth: 1,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        textAlign: 'right',
    },

    multiSelectPlaceholder: {
        fontSize: typography.fontSizes.large,
        color: colors.text,
    },

    multiSelectSelectedText: {
        fontSize: typography.fontSizes.large,
        color: colors.text,
        textAlign: 'right',
    },

    multiSelectSearch: {
        height: 50,
        fontSize: typography.fontSizes.large,
        textAlign: 'right',

    },

    multiSelectIcon: {
        width: 20,
        height: 20,

    },

    multiSelectItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: colors.background,

    },

    multiSelectItemText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'right',
    },

    select:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        writingDirection:"rtl",
    },


    sliderWithMarkings: {
        position: 'relative',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        marginVertical: 10,
        zIndex: 1,
    },

    markingsContainer: {
        position: 'absolute',
        top: 15, // Position markings below the slider track
        left: 15, // Account for slider padding
        right: 15, // Account for slider padding
        height: 30,
        zIndex: 1,
        pointerEvents: 'none',

    },

    sliderMark: {
        position: 'absolute',
        alignItems: 'center',
        transform: [{ translateX: -5 }], // Center the mark
    },

    markLine: {
        width: 1,
        height: 6,
        backgroundColor: '#666',
        marginBottom: 2,
    },

    markLabel: {
        fontSize: 8,
        color: '#666',
        textAlign: 'center',
        minWidth: 10,
    },

// Update your existing slider style
    slider: {
        width: '100%',
        height: 40,
        zIndex: 2, // Ensure slider is above markings


},

// Update sliderContainer for better layout
    sliderContainer: {
        flexDirection: 'column', // Changed from row to column
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        marginVertical: 5,
        zIndex: 1,
        backgroundColor: colors.background,
    },

    emotionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'right',
        // writingDirection: 'rtl',
    },

    intensityValue: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        fontWeight: 'bold',
    },

    modalContent:{
        flex:1,
        alignItems: 'stretch',
        borderWidth: 1,
        borderColor: '#010000',
        backgroundColor: '#000',
    },
    card: {
        borderWidth: spacing.xs,
        borderColor: colors.textLight,
        textAlign: 'right',
        writingDirection: 'rtl',
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: spacing.m,
        marginVertical: spacing.s,
        boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
        elevation: 3,
    },
    infoItem: {
        flexDirection: 'row-reverse',
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'flex-start',

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        width: 80,
    },
    value: {
        fontSize: 16,
        color: '#555',
        flex: 1,
    },
    link: {
        fontSize: typography.fontSizes.xlarge,
        color: '#007AFF',
        textDecorationLine: 'underline',
        paddingEnd: 10,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    modelOpener: {

        alignItems: 'center',
        fontSize : typography.fontSizes.xxlarge,
        fontWeight: 'bold',

    },
    fab: {
        position: 'absolute',
        margin: 2,
        right: 0,
        bottom: 0,
        zIndex: 2,
        backgroundColor: colors.primary,
    },

    actionsButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionsButtons: {
        backgroundColor: colors.primary,
        margin: spacing.xs,
        padding: spacing.s,
        width: '70%',
    },
    imageBackground:{
        flex: 1,
        width: '100%',
        height: '100%',
    },


    safeAreaContainer: {
        flex: 1,
        padding: spacing.xxxxl,

    },

    switchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
