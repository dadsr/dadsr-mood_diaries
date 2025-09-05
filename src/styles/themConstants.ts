export const COLORS = {
    primary: '#98A1BC',
    secondary: '#555879',
    accent: '#DED3C4',
    textLight: '#456882',
    black: '#000000',



    label: '#1B3C53',
    input:'#fff',
    inputBorder:'#ddd',

    cardBackground: '#BCA88D',
    cardBorder: '#143D60',
    text: '#1B3C53',
    textSecondary: '#1B3C53',
    titleText: '#000000',
    white: '#FFFFFF',
    button: '#555879',
    buttonText: '#FFFFFF',
    success: '#4CD964',
    warning:'#FFC107',
    error: '#FF3B30',
    modelBackground: '#DED3C4',
    modelHeader: '#456882',
    footer: '#DED3C4',
    footerBorder: '#555879',
    todo: 'rgba(242,117,0,0.68)',
};

export const THEME_CONSTANTS = {
    SPACING: {
        XS: 4,
        SM: 8,
        MD: 10,
        LG: 12,
        XL: 14,
    },
    BORDER_RADIUS: {
        SM: 4,
        MD: 8,
        LG: 12,
        XL: 16,
    },
    ELEVATION: {
        NONE: 0,
        LOW: 2,
        MEDIUM: 4,
        HIGH: 8,
    },
    TYPOGRAPHY: {
        SIZES: {
            XS: 12,
            SM: 14,
            MD: 16,
            LG: 18,
            XL: 20,
            XXL: 24,
            XXXL: 40,
            XXXXL: 100,
        },
        WEIGHTS: {
            LIGHT: '300' as const,
            REGULAR: '400' as const,
            MEDIUM: '500' as const,
            BOLD: '700' as const,
        },
        FAMILIES: {
            REGULAR: 'System', // A safe default
            BOLD: 'Roboto-Bold', // Example custom font
            MONO: 'Courier New', // Example custom font
        },

        HEADING: {
            H1: {
                fontFamily: 'Roboto-Bold',
                fontSize: 40,
                fontWeight: '700' as const,
            },
            H2: {
                fontFamily: 'Roboto-Bold',
                fontSize: 24,
                fontWeight: '700' as const,
            },
            H3: {
                fontFamily: 'System',
                fontSize: 20,
                fontWeight: '500' as const,
            },
            H4: {
                fontFamily: 'System',
                fontSize: 18,
                fontWeight: '500' as const,
            },
        },
        BODY: {
            LARGE: {
                fontFamily: 'System',
                fontSize: 16,
                fontWeight: '400' as const,
            },
            REGULAR: {
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '400' as const,
            },
            SMALL: {
                fontFamily: 'System',
                fontSize: 12,
                fontWeight: '300' as const,
            },
        },
        // --- END OF ADDED SECTION ---
    },
} as const;

// This export remains the same
export const { TYPOGRAPHY, SPACING, BORDER_RADIUS, ELEVATION } = THEME_CONSTANTS;

