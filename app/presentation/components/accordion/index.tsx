import { getString } from 'app/presentation/localization';
import { Colors, Images, theme } from 'app/presentation/theme';
import { neutral, primary, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React, { useMemo } from 'react';
import {
    ImageStyle,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppButton, ButtonType } from '../appbutton/AppButton';
import ImageRenderer from '../image/ImageRenderer';
import TextPrimary from '../text/TextPrimary';
import generalSelector from 'app/presentation/redux/selectors/general';
import { listOnlinePayment } from 'app/presentation/modules/InformationVerification/constant';

interface IAccordion {
    onPress?: () => void;
    name?: string;
    wallet?: string;
    iconLeft?: StyleProp<ImageStyle>;
}
const Accordion = (props: IAccordion) => {
    const { onPress, name, iconLeft } = props;
    const { paymentsReducer } = useSelector(
        generalSelector.selectPaymentReducer,
    );
    const onlinePaymentType = paymentsReducer?.data;
    const walletData = useMemo(
        () => listOnlinePayment.find((e) => e.type === onlinePaymentType),
        [paymentsReducer],
    );
    const walletName = walletData?.title;
    const iconLeftIcon = walletData?.icon;

    return (
        <View style={styles.container}>
            <AppButton
                iconStyle={styles.icon}
                textStyle={styles.txtStyle}
                styleBtn={styles.btnStyle}
                iconLeft={iconLeft}
                name={name}
                type={ButtonType.SquareBorderGray}
                disabled
            />
            <TouchableOpacity onPress={onPress} style={styles.changeWallet}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <ImageRenderer
                        style={{
                            height: 32,
                            width: 32,
                            marginRight: Dimensions.Spacing.small,
                        }}
                        source={iconLeftIcon}
                    />
                    <TextPrimary style={styles.title}>{walletName}</TextPrimary>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TextPrimary style={styles.textItem}>
                        {getString('convert')}
                    </TextPrimary>
                    <ImageRenderer
                        style={styles.image}
                        source={Images.Icons.RightIcon}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default Accordion;
const styles = StyleSheet.create({
    container: {
        borderColor: secondary.s600,
        borderWidth: 1,
        borderRadius: Dimensions.Spacing.small,
        paddingHorizontal: Dimensions.Spacing.large,
        paddingVertical: Dimensions.Spacing.medium,
    },
    changeWallet: {
        flexDirection: 'row',
        marginTop: Dimensions.moderateScale(15),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Dimensions.Spacing.small,
        backgroundColor: neutral.s175,
        borderRadius: Dimensions.Spacing.tiny,
        paddingHorizontal: Dimensions.Spacing.small,
    },
    image: {
        height: Dimensions.Spacing.large,
        width: Dimensions.Spacing.large,
    },
    textItem: {
        fontSize: Dimensions.FontSize.medium,
        color: primary.brand,
        fontFamily: theme.font.Medium,
        marginRight: 4,
    },
    title: {
        fontSize: Dimensions.FontSize.medium,
        color: secondary.brand,
        fontFamily: theme.font.Medium,
    },
    subTitle: {
        textAlign: 'center',
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        paddingVertical: Dimensions.Spacing.medium,
    },
    txtStyle: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.medium,
        flex: 1,
        marginLeft: Dimensions.Spacing.small,
        color: secondary.brand,
    },
    btnStyle: {
        paddingVertical: 0,
        borderWidth: 0,
        paddingHorizontal: 0,
    },
    btnStyleActive: {
        borderColor: Colors.secondary.s600,
    },
    txtStyleActive: {
        color: Colors.secondary.brand,
    },
    icon: {
        width: Dimensions.moderateScale(22),
        height: Dimensions.moderateScale(22),
    },
});
