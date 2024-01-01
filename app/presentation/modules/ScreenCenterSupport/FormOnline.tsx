import images from 'app/assets/images';
import { TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import { theme } from 'app/presentation/theme';
import { neutral, primary, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { OnlineContact } from 'app/shared/constants';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
interface IFormOnline {
    onPressOnline: (type: string) => void;
}

const widthBlock = Math.floor(
    (Dimensions.screenWidth() - Dimensions.moderateScale(64)) / 3,
);

const FormOnline = (props: IFormOnline) => {
    const { onPressOnline } = props;
    const dataOnline = [
        {
            icon: images.Icons.Hotline,
            title: getString('hotline'),
            styleTitle: styles.valueItem,
            styleItem: styles.item,
            type: OnlineContact.Phone,
        },
        {
            icon: images.Icons.SmsTracking,
            title: getString('email2'),
            styleTitle: styles.valueItem,
            styleItem: styles.item,
            type: OnlineContact.Email,
        },
        {
            icon: images.Icons.global,
            title: getString('website2'),
            styleTitle: styles.valueItem,
            styleItem: styles.item,
            type: OnlineContact.Website,
        },
    ];
    return (
        <View style={styles.container}>
            <TextPrimary style={styles.title}>
                {getString('online')}
            </TextPrimary>

            <View style={styles.containerItem}>
                {dataOnline.map((elm: any, index: any) => {
                    return (
                        <TouchableOpacity
                            onPress={() => onPressOnline(elm?.type)}
                            style={elm?.styleItem}
                        >
                            <ImageIconCircle
                                source={elm?.icon}
                                style={{ width: 24, height: 24 }}
                            />
                            <TextPrimary style={elm.styleTitle}>
                                {elm?.title}
                            </TextPrimary>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default FormOnline;
const ImageIconCircle = styled.Image``;

const styles = StyleSheet.create({
    container: {
        paddingBottom: Dimensions.moderateScale(20),
    },
    containerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        textTransform: 'uppercase',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.moderateScale(18),
        color: primary.brand,
        marginBottom: Dimensions.moderateScale(15),
    },
    item: {
        width: widthBlock,
        minHeight: Dimensions.moderateScale(89),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: neutral.s175,
        borderRadius: 10,
        paddingHorizontal: Dimensions.Spacing.semiSmall,
    },
    valueItem: {
        marginTop: Dimensions.moderateScale(10),
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        textAlign: 'right',
        color: secondary.brand,
    },
});
