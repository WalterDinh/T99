import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import {
    applyOpacity,
    neutral,
    primary,
    secondary,
    success,
    warning,
} from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckStatusActive } from 'app/shared/constants';
import React from 'react';
import { TextStyle } from 'react-native';
import styled from 'styled-components';

interface IStatusActive {
    status?: CheckStatusActive;
    title?: string;
    style?: TextStyle;
    styleTitle?: TextStyle;
    styleIn?: TextStyle;
    renderContentRight?: any;
}

const StatusActive = (props: IStatusActive) => {
    const { status, title, style, styleTitle, styleIn, renderContentRight } =
        props;
    const renderStatus = () => {
        switch (status) {
            case CheckStatusActive.Success:
                return {
                    backgroundColor: `${applyOpacity(success.brand, 0.05)}`,
                    color: `${applyOpacity(success.brand, 1)}`,
                    border: 'none',
                };
            case CheckStatusActive.OutlineSuccess:
                return {
                    backgroundColor: 'none',
                    color: `${applyOpacity(success.brand, 1)}`,
                    border: `1px solid ${applyOpacity(success.brand, 0.2)}`,
                };
            case CheckStatusActive.Warning:
                return {
                    backgroundColor: `${applyOpacity('#FFF1B8', 0.5)}`,
                    color: warning.brand,
                    border: 'none',
                };
            case CheckStatusActive.OutlineWarning:
                return {
                    backgroundColor: 'none',
                    color: warning.brand,
                    border: `1px solid ${applyOpacity('#FFF1B8', 0.5)}`,
                };

            case CheckStatusActive.Error:
                return {
                    backgroundColor: `${applyOpacity('#E52035', 0.2)}`,
                    color: primary.brand,
                    border: 'none',
                };
            case CheckStatusActive.OutlineError:
                return {
                    backgroundColor: 'none',
                    color: primary.brand,
                    border: `1px solid  ${applyOpacity('#E52035', 0.2)}`,
                };
            case CheckStatusActive.Gray:
                return {
                    backgroundColor: `${applyOpacity('#DDDDE4', 1)}`,
                    color: neutral.black,
                    border: 'none',
                };
            case CheckStatusActive.HalfGray:
                return {
                    backgroundColor: `${applyOpacity('#DDDDE4', 0.5)}`,
                    color: secondary.brand,
                    border: 'none',
                };
            case CheckStatusActive.Red:
                return {
                    backgroundColor: `${applyOpacity('#D2232A', 1)}`,
                    color: neutral.white,
                    border: 'none',
                };
            case CheckStatusActive.Green:
                return {
                    backgroundColor: `${applyOpacity('#6AA84F', 1)}`,
                    color: neutral.white,
                    border: 'none',
                };
            case CheckStatusActive.OutlineGray:
                return {
                    backgroundColor: 'none',
                    color: neutral.s400,
                    border: `${applyOpacity('#DDDDE4', 0.5)}`,
                };
            case CheckStatusActive.OutlineDefault:
                return {
                    backgroundColor: 'none',
                    color: secondary.brand,
                    border: `${applyOpacity('#DDDDE3', 1)}`,
                };
            case CheckStatusActive.GreenFillSuccess:
                return {
                    backgroundColor: success.brand,
                    color: neutral.white,
                    border: 'none',
                };
            case CheckStatusActive.GreenBackgroundWhite:
                return {
                    backgroundColor: neutral.white,
                    color: success.brand,
                    border: `1px solid ${applyOpacity(success.brand, 0.2)}`,
                };
            case CheckStatusActive.RedBackgroundWhite:
                return {
                    backgroundColor: neutral.white,
                    color: primary.brand,
                    border: `1px solid ${applyOpacity('#E52035', 0.2)}`,
                };
            case CheckStatusActive.textCompleted:
                return {
                    color: '#0E8C40',

                    border: 'none',
                };
            case CheckStatusActive.textIndebtedness:
                return {
                    color: '#D5D925',
                    border: 'none',
                };
            case CheckStatusActive.textLiquidated:
                return {
                    color: '#0E8C40',
                    border: 'none',
                };
            case CheckStatusActive.textOverdue:
                return {
                    color: '#D02029',
                    border: 'none',
                };
            case CheckStatusActive.textWaitingForLiquidation:
                return {
                    color: '#1066E8',
                    border: 'none',
                };
            default:
                return {
                    backgroundColor: `${applyOpacity('#DDDDE3', 0.5)}`,
                    color: secondary.brand,
                    border: 'none',
                };
        }
    };

    const renderStatusOwe = () => {
        switch (renderContentRight) {
            case CheckStatusActive.textCompleted:
                return getString('Completed');
            case CheckStatusActive.textIndebtedness:
                return getString('Indebtedness');
            case CheckStatusActive.textLiquidated:
                return getString('Liquidated');
            case CheckStatusActive.textOverdue:
                return getString('Overdue');
            case CheckStatusActive.textWaitingForLiquidation:
                return getString('WaitingForLiquidation');
            default:
                break;
        }
    };

    const ViewContainer = styled.View`
        align-items: baseline;
    `;
    const StatusActiveContainer = styled.View`
        border-radius: ${Dimensions.moderateScale(26)};
        padding-top: ${Dimensions.moderateScale(7)};
        padding-bottom: ${Dimensions.moderateScale(7)};
        padding-left: ${Dimensions.moderateScale(13)};
        padding-right: ${Dimensions.moderateScale(13)};
        background-color: ${renderStatus().backgroundColor};
        border: ${renderStatus().border};
        renderContentRight: ${renderStatusOwe()};
    `;
    const StatusActiveTitle = styled.Text`
        font-family: ${theme.font.Regular};
        font-size: ${!!renderStatus()?.backgroundColor
            ? Dimensions.FontSize.small
            : Dimensions.FontSize.large};
        color: ${renderStatus().color};
    `;

    return (
        <ViewContainer style={style}>
            <StatusActiveContainer style={styleIn}>
                <StatusActiveTitle style={styleTitle}>
                    {title}
                </StatusActiveTitle>
            </StatusActiveContainer>
        </ViewContainer>
    );
};

export default StatusActive;
