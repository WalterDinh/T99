import Clipboard from '@react-native-community/clipboard';
import { getString } from 'app/presentation/localization';
import { Images, theme } from 'app/presentation/theme';
import { neutral, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import {
    ImageURISource,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import ImageRenderer from '../image/ImageRenderer';
import TextPrimary from '../text/TextPrimary';
interface IItemBank {
    accName?: string;
    cityName?: string;
    accountNumber?: number | string;
    styleItemBank?: ViewStyle;
    nameBank?: string;
    source?: ImageURISource;
}
const ItemBank = (props: IItemBank) => {
    const {
        accName,
        cityName,
        accountNumber,
        nameBank,
        styleItemBank,
        source,
    } = props;
    const copyToClipboard = () => {
        Clipboard.setString(`${accountNumber!}`);
    };
    return (
        <View style={[styles.container, styleItemBank]}>
            <View>
                <ImageRenderer source={source} style={styles.img} />
            </View>
            <View style={styles.content}>
                <TextPrimary style={styles.bank}>{nameBank}</TextPrimary>
                <TextPrimary style={styles.title}>
                    {getString('accountName')}{' '}
                    <TextPrimary style={styles.title}>{accName}</TextPrimary>
                </TextPrimary>
                <View style={{ marginVertical: Dimensions.moderateScale(4) }}>
                    <TextPrimary style={styles.title}>
                        {getString('branch')}:{' '}
                        <TextPrimary style={styles.title}>
                            {cityName}
                        </TextPrimary>{' '}
                    </TextPrimary>
                </View>
                <TouchableOpacity
                    onPress={copyToClipboard}
                    style={styles.copyText}
                >
                    <View style={styles.copyRightText}>
                        <TextPrimary style={styles.title}>
                            {getString('stk')}:{' '}
                        </TextPrimary>
                        <TextPrimary style={styles.titleAccountNumber}>
                            {accountNumber}
                        </TextPrimary>
                    </View>
                    <ImageRenderer
                        style={styles.imgIcon}
                        source={Images.Icons.CopyOutlinedRed}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default ItemBank;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: neutral.white,
        borderRadius: Dimensions.Spacing.small,
        borderWidth: 1,
        borderColor: neutral.s175,
        paddingVertical: Dimensions.Spacing.large,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    content: {
        flex: 1,
    },
    img: {
        height: Dimensions.Spacing.extraHuge,
        width: Dimensions.Spacing.extraHuge,
        marginRight: Dimensions.Spacing.small,
    },
    bank: {
        color: secondary.brand,
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.medium,
        marginBottom: Dimensions.moderateScale(4),
    },
    title: {
        fontSize: Dimensions.moderateScale(12),
        fontFamily: theme.font.Regular,
        lineHeight: Dimensions.moderateScale(16),
    },
    titleAccountNumber: {
        color: secondary.brand,
        fontSize: Dimensions.moderateScale(12),
    },
    imgIcon: {
        height: Dimensions.Spacing.large,
        width: Dimensions.Spacing.large,
    },
    copyText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    copyRightText: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
    },
});
