import DataCardCommonModel from 'app/models/common/DataCardCommonModel';
import { theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import {
    CheckModeHeader,
    CheckStatusActive,
    CheckStatusText,
} from 'app/shared/constants';
import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components';
import ButtonSignNow from '../../button/ButtonSignNow';
import LineItem from '../../items/LineItem';
import HeaderCard from './cardHeader';
interface CommonCard {
    disabledButtonSignNow?: boolean;
    onPress?: () => void;
    headerTitleTopHalf?: string;
    headerTitleBottomHalf?: string;
    headerStatus?: CheckStatusText | CheckStatusActive;
    headerImage?: any;
    stylesTitle?: TextStyle;
    dataCard?: Array<DataCardCommonModel>;
    onPressButtonSignNow?: () => void;
    checkMode?: CheckModeHeader;
    titleHeaderStatus?: string;
    styleCommonCard?: StyleProp<ViewStyle>;
    disabled?: boolean;
    customTextTitle?: StyleProp<TextStyle>;
    customStyleHeaderCardContainer?: StyleProp<ViewStyle>;
    customStyleTitleBottomHalf?: StyleProp<TextStyle>;
}
const CommonCard = (props: CommonCard) => {
    const {
        disabledButtonSignNow,
        onPressButtonSignNow,
        onPress,
        headerTitleTopHalf,
        headerTitleBottomHalf,
        dataCard,
        headerStatus,
        titleHeaderStatus,
        headerImage,
        stylesTitle,
        checkMode,
        styleCommonCard,
        disabled,
        customTextTitle,
        customStyleHeaderCardContainer,
    } = props;

    return (
        <CommonCardContainer
            disabled={disabled}
            style={styleCommonCard}
            onPress={onPress}
        >
            {(!!headerTitleTopHalf || !!headerTitleBottomHalf) && (
                <HeaderCard
                    status={headerStatus}
                    titleTopHalf={headerTitleTopHalf}
                    titleBottomHalf={headerTitleBottomHalf}
                    titleActive={titleHeaderStatus}
                    image={headerImage}
                    stylesTitle={stylesTitle}
                    checkMode={checkMode}
                    customTextTitle={customTextTitle}
                    customStyleHeaderCardContainer={
                        customStyleHeaderCardContainer
                    }
                />
            )}

            {(dataCard || []).map((el, index) => (
                <LineItem key={index} isFirstItem={index === 0} {...el} />
            ))}
            {!!onPressButtonSignNow && (
                <ButtonSignNow
                    disabled={disabledButtonSignNow}
                    onPress={onPressButtonSignNow}
                />
            )}
        </CommonCardContainer>
    );
};
const CommonCardContainer = styled.TouchableOpacity`
    /* padding-top: ${Dimensions.Spacing.semiSmall};
    padding-bottom: ${Dimensions.Spacing.tiny}; */
    padding-left: ${Dimensions.moderateScale(22)};
    padding-right: ${Dimensions.moderateScale(22)};
    font-family: ${theme.font.Regular};
    border-radius: ${Dimensions.Spacing.small};
    background-color: ${neutral.white};
`;
export default CommonCard;
