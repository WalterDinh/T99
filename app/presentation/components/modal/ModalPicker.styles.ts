import { StyleSheet } from 'react-native';
import { theme } from 'app/presentation/theme';
import IphoneXHelper from 'app/shared/helper/IPhoneXHelper';
import Dimensions from 'app/presentation/theme/Dimensions';

const PADDING = 16;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const HIGHLIGHT_COLOR = theme.color.textColor;
const FONT_FAMILY = theme.font.Regular;

export default StyleSheet.create({
    overlayStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.7)',
        // backgroundColor: 'white'
    },
    dataEmpty: {
        height: 400,
        alignItems: 'center',
    },
    optionContainer: {
        maxHeight: '60%',
        borderRadius: 8,
        width: '100%',
        padding: PADDING,
        // marginHorizontal: 12,
        paddingBottom:Dimensions.bottomPadding,
        backgroundColor: 'white',
  
    },

    cancelContainer: {
        alignSelf: 'stretch',
    },

    selectStyle: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: PADDING,
        borderRadius: BORDER_RADIUS,
    },

    selectTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAMILY,
    },

    cancelStyle: {
        // borderRadius: BORDER_RADIUS,
        // backgroundColor: 'rgba(255,255,255,0.8)',
        backgroundColor: 'white',
        padding: PADDING,
    },

    cancelTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAMILY,
    },

    optionStyle: {
        padding: PADDING,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.color.borderColor,
    },

    optionTextStyle: {
        fontSize: FONT_SIZE,
        color: HIGHLIGHT_COLOR,
        fontFamily: FONT_FAMILY,
    },

    sectionStyle: {
        padding: PADDING * 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    sectionTextStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAMILY,
    },
});


export const modalPickerAssetStyles = StyleSheet.create({
    overlayStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'white'
    },
    dataEmpty: {
        paddingTop: PADDING * 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionContainer: {
        height: '90%',
        borderRadius: 20,
        
        padding: PADDING,
        marginHorizontal: 16,
        marginBottom: IphoneXHelper.isIphoneX()
        ? IphoneXHelper.getBottomSpace()
        : PADDING,
        // backgroundColor: 'white',
        backgroundColor: 'rgba(229, 229, 229, 1)',
        paddingBottom: IphoneXHelper.isIphoneX()
            ? IphoneXHelper.getBottomSpace()
            : PADDING,
    },

    cancelContainer: {
        alignSelf: 'stretch',
    },

    selectStyle: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: PADDING,
        borderRadius: BORDER_RADIUS,
    },

    selectTextStyle: {
        // textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAMILY,
    },

    cancelStyle: {
        // borderRadius: BORDER_RADIUS,
        // backgroundColor: 'rgba(255,255,255,0.8)',
        backgroundColor: 'white',
        padding: PADDING,
    },

    cancelTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAMILY,
    },

    optionStyle: {
        flexDirection: 'row',
        padding: PADDING,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.color.backgroundColorVariant,
    },
    optionChildStyle: {
        padding: PADDING,
        alignItems: 'center',
        marginHorizontal: 16,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.color.backgroundColorVariant,
    },

    optionTextStyle: {
        // textAlign: 'center',
        fontSize: FONT_SIZE,
        color: HIGHLIGHT_COLOR,
        fontFamily: FONT_FAMILY,
    },

    sectionStyle: {
        padding: PADDING * 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    sectionTextStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAMILY,
    },
});

