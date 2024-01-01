import {Platform, TextStyle} from 'react-native';
// import * as Colors from './colors';
import Dimensions from './Dimensions';

export const fontSize = {
    ...Dimensions.FontSize
}

export const fontFamily = {
    Medium: Platform.OS === 'ios' ? 'TestSohne-Kraftig' : 'Sohne-Medium',
    Regular: Platform.OS === 'ios' ? 'TestSohne-Buch' : 'Sohne-Regular',
    SemiBold: Platform.OS === 'ios' ? 'TestSohne-Halbfett' : 'Sohne-SemiBold',
    Bold: Platform.OS === 'ios' ? 'TestSohne-Dreiviertelfett' : 'Sohne-Bold',
    ExtraBold: Platform.OS === 'ios' ? 'TestSohne-Extrafett' : 'Sohne-ExtraBold',
    Light: Platform.OS === 'ios' ? 'TestSohne-Leicht' : 'Sohne-Light',
}

type LetterSpacing = 'x30' | 'x40'
export const letterSpacing: Record<LetterSpacing, number> = {
    x30: 2,
    x40: 3,
}

type LineHeight = 'x10' | 'x20' | 'x30' | 'x40' | 'x50' | 'x60' | 'x70'
export const lineHeight: Record<LineHeight, TextStyle> = {
    x10: {
        lineHeight: 20,
    },
    x20: {
        lineHeight: 22,
    },
    x30: {
        lineHeight: 24,
    },
    x40: {
        lineHeight: 26,
    },
    x50: {
        lineHeight: 32,
    },
    x60: {
        lineHeight: 38,
    },
    x70: {
        lineHeight: 44,
    },
}

const headerFont: TextStyle = {
    fontWeight: 'bold',
    fontFamily: fontFamily.Bold,
}

type Header = 'small' | 'medium' | 'large' | 'extraLarge' | 'extraExtraLarge' | 'extraExtraExtraLarge' | 'huge' | 'extraHuge' | 'extraExtraHuge' | 'giant'
export const header: Record<Header, TextStyle> = {
    small: {
        fontSize: fontSize.small,
        ...headerFont,
        ...lineHeight.x10,
    },
    medium: {
        fontSize: fontSize.medium,
        ...headerFont,
        ...lineHeight.x20,
    },
    large: {
        fontSize: fontSize.large,
        ...headerFont,
        ...lineHeight.x30,
    },
    extraLarge: {
        fontSize: fontSize.extraLarge,
        ...headerFont,
        ...lineHeight.x40,
    },
    extraExtraLarge: {
        fontSize: fontSize.extraExtraLarge,
        ...headerFont,
        ...lineHeight.x50,
    },
    extraExtraExtraLarge: {
        fontSize: fontSize.extraExtraExtraLarge,
        ...headerFont,
        ...lineHeight.x60,
    },
    huge: {
        fontSize: fontSize.huge,
        ...headerFont,
        ...lineHeight.x70,
    },
    extraHuge: {
        fontSize: fontSize.extraHuge,
        ...headerFont,
        ...lineHeight.x70,
    },
    extraExtraHuge: {
        fontSize: fontSize.extraExtraHuge,
        ...headerFont,
        ...lineHeight.x70,
    },
    giant: {
        fontSize: fontSize.giant,
        ...headerFont,
        ...lineHeight.x70,
    }
}

// type Subheader = 'x10' | 'x20' | 'x30' | 'x40' | 'x50'
// export const subheader: Record<Subheader, TextStyle> = {
//     x10: {
//         ...fontSize.x10,
//         ...lineHeight.x10,
//         ...fontWeight.semibold,
//     },
//     x20: {
//         ...fontSize.x20,
//         ...lineHeight.x20,
//         ...fontWeight.semibold,
//     },
//     x30: {
//         ...fontSize.x30,
//         ...lineHeight.x30,
//         ...fontWeight.semibold,
//     },
//     x40: {
//         ...fontSize.x40,
//         ...lineHeight.x40,
//         ...fontWeight.semibold,
//     },
//     x50: {
//         ...fontSize.x50,
//         ...lineHeight.x50,
//         ...fontWeight.semibold,
//     },
// }

// type Body = 'x10' | 'x20' | 'x30' | 'x40' | 'x50'
// export const body: Record<Body, TextStyle> = {
//     x10: {
//         ...fontSize.x10,
//         ...lineHeight.x10,
//         ...fontWeight.regular,
//         color: Colors.neutral.s800,
//     },
//     x20: {
//         ...fontSize.x20,
//         ...lineHeight.x20,
//         ...fontWeight.regular,
//         color: Colors.neutral.s800,
//     },
//     x30: {
//         ...fontSize.x30,
//         ...lineHeight.x30,
//         ...fontWeight.regular,
//         color: Colors.neutral.s800,
//     },
//     x40: {
//         ...fontSize.x40,
//         ...lineHeight.x40,
//         ...fontWeight.regular,
//         color: Colors.neutral.s800,
//     },
//     x50: {
//         ...fontSize.x50,
//         ...lineHeight.x50,
//         ...fontWeight.regular,
//         color: Colors.neutral.s800,
//     },
// }