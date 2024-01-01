import { TextPrimary } from 'app/presentation/components';
import { Images, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import {
    Image,
    StyleProp,
    StyleSheet, View,
    ViewStyle
} from 'react-native';
import styled from 'styled-components';
interface IItemMap {
    title?: string;
    subtitle?: string;
    onPress?: () => void;
    isLastItem?: boolean;
    itemMapStyle?: any;
    border?: boolean;
    containerStyle?: StyleProp<ViewStyle>
}
const ItemMap = (props: IItemMap) => {
    const { title, subtitle, onPress, isLastItem = 0, itemMapStyle, border, containerStyle } = props;

    const ItemMapContainer = styled.TouchableOpacity`
        flex-direction: row;
        background-color: 'white';
        padding-bottom: 19px;
        padding-top: ${border ? '19px' : '0px' } ;
        border-bottom-width: ${isLastItem ? '1px' : '0px'};
        margin-left: 22px;
        margin-right: 22px;
        border-bottom-color: ${border ? neutral.s175 : neutral.white} ;
    `;

    return (
        <ItemMapContainer style={[itemMapStyle, containerStyle]} onPress={onPress}>
            <View style={styles.bg}>
                <Image
                    style={styles.img}
                    source={Images.Icons.FilledLocation}
                />
            </View>
            <View style={{ flex: 1 }}>
                <TextPrimary style={styles.title}>{title}</TextPrimary>
                <TextPrimary style={styles.subtitle}>{subtitle}</TextPrimary>
            </View>
        </ItemMapContainer>
    );
};
const styles = StyleSheet.create({
    itemMap: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingBottom: Dimensions.moderateScale(19),
        borderBottomWidth: 1,
        marginHorizontal: 22,
        borderBottomColor: neutral.s175,
    },
    bg: {
        width: Dimensions.moderateScale(48),
        height: Dimensions.moderateScale(48),
        borderRadius: Dimensions.Spacing.extraLarge,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: neutral.s175,
        marginRight: Dimensions.moderateScale(18),
    },
    img: {
        height: Dimensions.moderateScale(21),
        width: Dimensions.moderateScale(15),
    },
    title: {
        color: neutral.black,
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.moderateScale(16),
        lineHeight: Dimensions.moderateScale(22),
    },
    subtitle: {
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(22),
        color: neutral.s400,
    },
});
export default ItemMap;
