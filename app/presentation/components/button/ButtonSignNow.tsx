import images from 'app/assets/images';
import { getString } from 'app/presentation/localization';
import { primary, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import styled from 'styled-components';

interface IButtonSignNow {
    onPress?: () => void;
    disabled?: boolean;
}
const ButtonSignNow = (props: IButtonSignNow) => {
    //! State
    const { onPress, disabled } = props;
    //! Styled
    const ButtonSignNowContainer = styled.TouchableOpacity`
        margin-top: ${Dimensions.Spacing.tiny};
        background-color: ${secondary.whiteGray};
        border-radius: ${Dimensions.Spacing.tiny};
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-top: ${Dimensions.moderateScale(9)};
        padding-bottom: ${Dimensions.moderateScale(9)};
        opacity: ${disabled ? 0.5 : 1};
    `;
    const Title = styled.Text`
        color: ${primary.brand};
        font-size: ${Dimensions.FontSize.medium};
        margin-right: ${Dimensions.moderateScale(9)};
    `;
    const IconButton = styled.Image`
        width: ${Dimensions.Spacing.larger};
        height: ${Dimensions.Spacing.larger};
    `;
    //! Render
    return (
        <ButtonSignNowContainer disabled={disabled} onPress={onPress}>
            <Title>{getString('signNow')}</Title>
            <IconButton source={images.Icons.RightIcon} />
        </ButtonSignNowContainer>
    );
};
export default ButtonSignNow;
