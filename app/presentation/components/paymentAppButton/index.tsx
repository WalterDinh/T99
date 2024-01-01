import { getString } from 'app/presentation/localization';
import { Colors, Images, theme } from 'app/presentation/theme';
import { neutral, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Accordion from '../accordion';
import { AppButton, ButtonType } from '../appbutton/AppButton';
import ImageRenderer from '../image/ImageRenderer';
import TextPrimary from '../text/TextPrimary';
interface IPaymentAppButton {
    iconLeft?: number;
    isActive?: boolean;
    name?: string;
    onPress?: () => void;
}
const PaymentAppButton = (props: IPaymentAppButton) => {
    const { iconLeft, isActive, name, onPress } = props;
    return (
        <View>

        <AppButton
            iconStyle={styles.icon}
            textStyle={[styles.txtStyle, isActive && styles.txtStyleActive]}
            styleBtn={[styles.btnStyle, isActive && styles.btnStyleActive]}
            iconLeft={iconLeft}
            iconRight={isActive ? Images.Icons.CheckMarkNoBorder : undefined}
            name={name}
            type={ButtonType.SquareBorderGray}
            onPress={onPress}
        />
        {/* <Accordion /> */}
        </View>

    );
};
export default PaymentAppButton;
const styles = StyleSheet.create({
    image: {
        height: Dimensions.Spacing.large,
        width: Dimensions.Spacing.large,
    },
    title: {
        textAlign: 'center',
        fontSize: Dimensions.FontSize.extraExtraLarge,
    },
    subTitle: {
        textAlign: 'center',
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        paddingVertical: 12,
    },
    txtStyle: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.textColor,
        padding: Dimensions.Spacing.small,
        flex: 1,
    },
    btnStyle: {
        // backgroundColor: 'pink',
        borderColor: neutral.s175,
        marginTop: Dimensions.Spacing.medium,
        borderRadius: 8,
        justifyContent: 'flex-start',
        paddingHorizontal: 18,
    },
    btnStyleActive: {
        borderColor: Colors.secondary.s600,
    },
    txtStyleActive: {
        color: Colors.secondary.brand,
    },
    icon: { width: 22, height: 22 },
});
