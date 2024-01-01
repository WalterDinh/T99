import {Platform, Dimensions, StatusBar} from 'react-native';
import {scale, verticalScale } from 'react-native-size-matters';
import IphoneXHelper from 'app/shared/helper/IPhoneXHelper';

const moderateScale = (size: number): number => size;

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + (StatusBar.currentHeight ?? 0);

export default {
    moderateScale,
    scale,
    verticalScale,
    IphoneXHelper,
    Spacing: {
        extraTiny: moderateScale(2),
        tiny: moderateScale(4),
        semiSmall: moderateScale(6),
        small: moderateScale(8),
        medium: moderateScale(12),
        large: moderateScale(16),
        larger: moderateScale(20),
        extraLarge: moderateScale(24),
        huge: moderateScale(28),
        extraHuge: moderateScale(32),
        extraHuge2: moderateScale(37),
        giant: moderateScale(40),
        extraGiant: moderateScale(48)
    },
    FontSize: {
        extraTiny: moderateScale(6),
        tiny: moderateScale(8),
        semiSmall: moderateScale(10),
        small: moderateScale(12),
        medium: moderateScale(14),
        large: moderateScale(15),
        extraLarge: moderateScale(17),
        extraExtraLarge: moderateScale(20),
        extraExtraExtraLarge: moderateScale(22),
        huge: moderateScale(24),
        extraHuge: moderateScale(26),
        extraExtraHuge: moderateScale(34),
        giant: moderateScale(40),
    },
    NavBar: {
        height: Platform.OS === 'ios' ? 64 : 56
    },
    Tabbar: {
        height: 63
    },
    topPadding: 28 + (IphoneXHelper.isIphoneX() ? 54 : 0),
    bottomPadding: IphoneXHelper.getBottomSpace() + 20,
    getStatusBarHeight: (safe: boolean) => {
        return Platform.select({
            ios: IphoneXHelper.ifIphoneX(safe ? 44 : 30, 20),
            android: StatusBar.currentHeight,
            default: 0
        });
    },
    androidBottomNavigationHeight: Platform.OS === 'android' ? navbarHeight : 0,
    screenWidth: () => Dimensions.get('window').width,
    screenHeight: () => Dimensions.get('window').height
};
