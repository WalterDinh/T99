import images from 'app/assets/images';
import { Colors, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import styled from 'styled-components';
import ContentRightCommon from './ContentRightCommon';
interface IMenuItem {
    title?: string;
    iconLeft?: any;
    styleIconLeft?: StyleProp<TextStyle>;
    styleIconRight?: TextStyle;
    onPressMenuItem?: () => void;
    value?: string;
    styleTextContentRightCommon?: StyleProp<TextStyle>;
    styleViewContentRightCommon?: StyleProp<TextStyle>;
    valueContentRightCommon?: string;
    source?: string;
    disabled?: boolean;
    isLastItem?: boolean;
    show?: boolean;
    styleTitle?: StyleProp<TextStyle>
}
const MenuItem = (props: IMenuItem) => {
    const {
        title,
        iconLeft,
        styleIconLeft,
        styleIconRight,
        onPressMenuItem,
        value,
        styleTextContentRightCommon,
        styleViewContentRightCommon,
        valueContentRightCommon,
        source,
        disabled,
        isLastItem = 0,
        show,
        styleTitle
    } = props;

    const ViewMenuItem = styled.TouchableOpacity`

background-color: ${neutral.white};
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom-color: ${Colors.neutral.s190};
        border-top-color: ${Colors.neutral.s190};
        border-bottom-width: ${isLastItem ? '1px' : '0px'};
        border-top-width: 1px;
        padding-top: ${Dimensions.Spacing.medium};
        padding-bottom: ${Dimensions.Spacing.medium};
    `;
    const StyledView = styled.View`
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    `;
    const IconRight = styled.Image`
        margin-right: ${iconLeft
            ? `${Dimensions.moderateScale(50)}`
            : `${Dimensions.moderateScale(10)}`};
    `;
    const IconLeft = styled.Image`
        width: ${Dimensions.Spacing.larger};
        height: ${Dimensions.Spacing.larger};
        margin-left: ${Dimensions.moderateScale(3)};
        margin-right: ${Dimensions.moderateScale(18)};
    `;
    const Title = styled.Text`
        color: ${neutral.black};
    `;
    const Value = styled.Text`
        color: ${neutral.grayScale4};
        font-size: ${Dimensions.FontSize.large};
    `;

    return (
        <>
        {!show && (<ViewMenuItem  onPress={onPressMenuItem} disabled={disabled}>
            {iconLeft && <IconLeft style={styleIconLeft} source={iconLeft} />}
            <StyledView>
                <Title style={styleTitle}>{title}</Title>
                <View style={styles.viewContentRight}>
                    {value && <Value>{value}</Value>}

                    {source && (
                        <IconRight style={styleIconRight} source={source} />
                    )}
                </View>
                {valueContentRightCommon && (
                    <ContentRightCommon
                        styleText={styleTextContentRightCommon}
                        styleView={styleViewContentRightCommon}
                        value={valueContentRightCommon}
                    />
                )}
            </StyledView>
        </ViewMenuItem>)}
        </>

         
    );
};
const styles = StyleSheet.create({
    viewContentRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default MenuItem;
