import {
    ImageSourcePropType,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import { Colors } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import images from 'app/assets/images';
import styled from 'styled-components';
import { getString } from 'app/presentation/localization';

interface IProps {
    bankName?: string;
    source?: ImageSourcePropType;
    accountNameValue?: string;
    accountNumberValue?: string;
    onPressBankName?: () => void;
    color?: string;
    fontFamily?: string;
    styleContainer?: StyleProp<ViewStyle>;
    disabled?: boolean;
    isDefault?: boolean;
}
const ItemAccount = (props: IProps) => {
    const {
        bankName,
        source,
        accountNameValue,
        accountNumberValue,
        onPressBankName,
        color,
        fontFamily,
        styleContainer,
        disabled,
        isDefault,
    } = props;
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPressBankName}
            style={[styles.formItem, styleContainer]}
        >
            <View style={styles.formBankName}>
                <View style={styles.formImageBank}>
                    <ImageRenderer
                        source={source || images.Icons.imageBank2}
                        style={{ width: 32, height: 32 }}
                    />
                </View>
                <View style={styles.formTextBank}>
                    <View>
                        <TextPrimary
                            style={[
                                styles.textBankName,
                                { color: color, fontFamily: fontFamily },
                            ]}
                        >
                            {bankName}
                        </TextPrimary>
                    </View>
                </View>
                {isDefault && (
                    <View style={styles.formSubTextBankName}>
                        <TextPrimary style={styles.textSub}>
                            {getString('default')}
                        </TextPrimary>
                    </View>
                )}
            </View>
            <View style={styles.formInfoAccount}>
                <View>
                    <TextPrimary style={styles.textAccount}>
                        {getString('accountName')}
                    </TextPrimary>
                </View>
                <TextPrimary
                    numberOfLines={1}
                    style={[
                        styles.textAccountValue,
                        { color: Colors.neutral.s400, flex: 2 },
                    ]}
                >
                    {accountNameValue}
                </TextPrimary>
            </View>
            <View style={styles.formAccountNumber}>
                <TextPrimary style={styles.textAccount}>
                    {getString('accountNumber')}
                </TextPrimary>
                <TextPrimary
                    numberOfLines={1}
                    style={[
                        styles.textAccountValue,
                        { color: Colors.neutral.s400, flex: 2 },
                    ]}
                >
                    {accountNumberValue}
                </TextPrimary>
            </View>
        </TouchableOpacity>
    );
};

export default ItemAccount;
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    formItem: {
        backgroundColor: Colors.neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderRadius: Dimensions.moderateScale(8),
        borderWidth: 1,
        borderColor: Colors.neutral.grayScale2,
    },
    formBankName: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Dimensions.moderateScale(11),
    },
    formImageBank: {
        marginRight: Dimensions.moderateScale(8),
    },
    formTextBank: {
        flex: 1,
        marginRight: Dimensions.moderateScale(8),
    },
    textBankName: {
        color: Colors.secondary.brand,
    },
    textSub: {
        fontSize: Dimensions.moderateScale(12),
        color: Colors.primary.s600,
    },
    formInfoAccount: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: Dimensions.moderateScale(12),
        borderColor: Colors.neutral.grayScale2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textAccount: {
        fontSize: Dimensions.moderateScale(15),
        flex: 1,
    },
    formAccountNumber: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Dimensions.moderateScale(11),
    },
    textAccountValue: {
        paddingLeft: Dimensions.moderateScale(32),
        textAlign: 'right',
    },
    formSubTextBankName: {
        backgroundColor: 'rgba(229, 32, 53, 0.2)',
        borderRadius: Dimensions.moderateScale(26),
        paddingHorizontal: Dimensions.moderateScale(12),
        paddingVertical: Dimensions.moderateScale(6),
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.moderateScale(28),
    },
});
