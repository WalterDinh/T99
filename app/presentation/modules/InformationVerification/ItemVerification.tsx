import { TextPrimary } from 'app/presentation/components';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { Image, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import styled from 'styled-components';
interface IItemVerification extends TouchableOpacityProps {
    title?: string;
    iconLeft?: any;
    onPress?: () => void;
    source?: any;
    styleIconRight?: any;
    styleIconLeft?: any;
}
const ItemVerification = (props: IItemVerification) => {
    const { title, iconLeft, onPress, source, styleIconRight, styleIconLeft, ...restProps } =
        props;
    return (
        <Container {...restProps} onPress={onPress}>
            <Image style={[styles.iconLeft, styleIconLeft]} source={iconLeft} />
            <View style={styles.content}>
                <TextPrimary style={styles.title}>{title}</TextPrimary>
                <Image style={styleIconRight} source={source} />
            </View>
        </Container>
    );
};
const Container = styled.TouchableOpacity`
flex: 1;
padding-top: ${Dimensions.moderateScale(13)};
padding-bottom: ${Dimensions.moderateScale(13)};
padding-left: ${Dimensions.moderateScale(18)};
padding-right: ${Dimensions.moderateScale(18)};
border-width: 1;
border-color: ${neutral.s175};
border-radius: ${Dimensions.moderateScale(25)};
flex-direction: row;
align-items: center;
justify-content: space-between;
`;
const styles = StyleSheet.create({
    iconLeft: {
        width: Dimensions.Spacing.extraLarge,
        height: Dimensions.Spacing.extraLarge,
    },
    iconRight: {
        width: Dimensions.moderateScale(7),
        height: Dimensions.moderateScale(11),
    },
    content: {
        marginLeft: Dimensions.moderateScale(18),
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(22),
        letterSpacing: -0.28,
        color: neutral.black,
    },
});
export default ItemVerification;
