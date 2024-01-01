import { Images, theme } from 'app/presentation/theme';
import {
    neutral,
    primary,
    secondary,
    success,
} from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import {
    CheckStatusText,
    CurrencyCode,
    DateTimeFormat,
    PriceFormat,
} from 'app/shared/constants';
import CurrencyHelper from 'app/shared/helper/CurrencyHelper';
import dayjs from 'dayjs';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components';
import ImageRenderer from '../image/ImageRenderer';
import TextPrimary from '../text/TextPrimary';
import StatusActive from './StatusActive';

export interface ILineItem {
    styleTextInput?: StyleProp<ViewStyle>;
    status?: CheckStatusText;
    title?: string;
    fixTitle?: string;
    value?: string | Date | number;
    contentRight?: string;
    styleValue?: any;
    date?: boolean;
    currency?: boolean;
    styleTitle?: any;
    statusTitle?: any;
    isFirstItem?: boolean;
    angleRight?: boolean;
    angleDown?: boolean;
    format?: PriceFormat;
    onPressValue?: () => void;
}
const LineItem = (props: ILineItem) => {
    const {
        styleTextInput,
        status,
        title,
        value,
        contentRight,
        styleValue,
        statusTitle,
        date,
        currency,
        styleTitle,
        fixTitle,
        isFirstItem,
        angleRight,
        angleDown,
        onPressValue,
        format = PriceFormat.Comma,
    } = props;
    const formatValue = () => {
        if (date) {
            return dayjs(value).format(DateTimeFormat.FullDateForwardSlash);
        }
        if (currency) {
            return CurrencyHelper.getFormattedPriceVnd(
                Number(value || 0),
                CurrencyCode.VND,
                format,
            );
        }
        return value;
    };
    const isLongLeftTitle =
        title &&
        !!formatValue &&
        title?.length > formatValue?.toString().length;

    const convertStatus = () => {
        switch (status) {
            case CheckStatusText.Success:
                return success.brand;
            case CheckStatusText.Error:
                return primary.brand;
            case CheckStatusText.NeutralBlack:
                return neutral.black;
            case CheckStatusText.SecondaryBrand:
                return secondary.brand;
            default:
                return neutral.s400;
        }
    };

    const StyledView = styled.View`
        align-items: center;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        padding-top: ${Dimensions.Spacing.medium};
        padding-bottom: ${Dimensions.Spacing.medium};
        border-top-color: ${theme.color.grayBackgroundColor};
        border-top-width: ${isFirstItem ? 0 : 1};
        font-size: ${Dimensions.FontSize.large};
        letter-spacing: -0.28px;
        /* flex: 1; */
        /* width: ${Dimensions.screenWidth() - 44}; */
    `;

    const TextPrice = styled(TextPrimary)`
        color: ${convertStatus()};
        flex: ${!isLongLeftTitle ? 1 : undefined};
        text-align: ${!isLongLeftTitle ? 'right' : 'left'};
        font-size: ${Dimensions.FontSize.large};
        line-height: ${Dimensions.moderateScale(22)};
        font-family: ${theme.font.Regular};
        /* text-align: left; */
    `;

    const Title = styled(TextPrimary)`
        color: ${neutral.black};
        font-size: ${Dimensions.FontSize.large};
        min-width: 30%;
        max-width: 50%;
    `;
    return (
        <StyledView style={styleTextInput}>
            <Title style={styleTitle}>
                {fixTitle ? fixTitle : `${title}:`}
            </Title>
            {contentRight ? (
                <StatusActive title={contentRight} status={statusTitle} />
            ) : !!onPressValue ? (
                <TitleButton onPress={onPressValue}>
                    <TextPrice style={styleValue}>{formatValue()}</TextPrice>
                </TitleButton>
            ) : (
                <TextPrice style={styleValue}>{formatValue()}</TextPrice>
            )}
            {angleRight && (
                <ImageRenderer
                    style={{
                        height: Dimensions.moderateScale(10.49),
                        width: Dimensions.moderateScale(6.25),
                        paddingRight: Dimensions.moderateScale(22),
                    }}
                    source={Images.Icons.AngleRight}
                />
            )}
            {angleDown && (
                <ImageRenderer
                    style={{
                        height: Dimensions.moderateScale(6.25),
                        width: Dimensions.moderateScale(10.49),
                        paddingRight: Dimensions.moderateScale(22),
                    }}
                    source={Images.Icons.AngleDown}
                />
            )}
        </StyledView>
    );
};
const TitleButton = styled(TouchableOpacity)`
    border-radius: 12;
    border-width: 1;
    border-color: ${theme.color.colorPrimary};
    padding-left: 12;
    padding-right: 12;
    padding-top: 6;
    padding-bottom: 6;
`;
export default LineItem;
