import { Images } from 'app/presentation/theme';
import {
    secondary
} from 'app/presentation/theme/Colors';
import {
    CheckModeHeader, CheckStatusActive, CheckStatusText
} from 'app/shared/constants';
import React from 'react';
import {
    StyleProp,
    StyleSheet, TextStyle,
    View,
    ViewStyle
} from 'react-native';
import ImageRenderer from '../../image/ImageRenderer';
import StatusActive from '../../items/StatusActive';
import TextPrimary from '../../text/TextPrimary';
import { styles } from './styleCardHeader';

interface IHeaderCard {
    titleTopHalf?: string;
    titleBottomHalf?: string;
    status?: CheckStatusText | CheckStatusActive;
    image?: any;
    stylesTitle?: StyleProp<TextStyle>;
    checkMode?: CheckModeHeader;
    titleActive?: string;
    customTextTitle?: StyleProp<TextStyle>;
    customStyleHeaderCardContainer?: StyleProp<ViewStyle>;
}

const HeaderCard = (props: IHeaderCard) => {
    const {
        titleTopHalf,
        titleBottomHalf,
        status,
        image,
        stylesTitle,
        titleActive,
        checkMode,
        customTextTitle,
        customStyleHeaderCardContainer
    } = props;

    const renderStyleMode = () => {
        switch (checkMode) {
            case CheckModeHeader.Bank:
                return {
                    headerCardContainer: styles.flexDirection,
                    viewContent: styles.bankViewContent,
                    title: {},
                    textTitle: {},
                    status: {},
                    titleBottomHalf: styles.bankTitleBottomHalf,
                    headerCardImg: styles.bankHeaderCardImg,
                };
            case CheckModeHeader.TwoActive:
                return {
                    headerCardContainer: styles.twoActiveHeaderCardContainer,
                    headerCardImg: {},
                    viewContent: styles.flex,
                    title: {
                        styles: styles.twoActiveHead,
                    },
                    textTitle: {
                        color: secondary.brand,
                    },
                    titleBottomHalf: styles.defaultTitleBottomHalf,
                    status: {},
                };
            case CheckModeHeader.IdAndTitle:
                return {
                    headerCardImg: {},
                    headerCardContainer: styles.flexDirection,
                    viewContent: styles.idAndTitleviewContent,
                    title: {},

                    textTitle: styles.idAndTitleTextTitle,
                    status: {},
                    titleBottomHalf: styles.defaultTitleBottomHalf,
                };
            case CheckModeHeader.Outline:
                return {
                    headerCardImg: {},
                    headerCardContainer: styles.outlineHeaderCardContainer,
                    viewContent: styles.outlineViewContent,
                    title: {
                        styles: styles.outlineHead,
                    },
                    textTitle: styles.outlineTextTitle,
                    status: {},
                    titleBottomHalf: styles.defaultTitleBottomHalf,
                };
            default:
                return {
                    headerCardImg: {},
                    headerCardContainer: styles.defaultHeaderCardContainer,
                    viewContent: styles.defaultViewContent,
                    title: {
                        styles: styles.defaultHead,
                    },

                    textTitle: styles.defaultTextTitle,
                    status: {},
                    titleBottomHalf: styles.defaultTitleBottomHalf,
                };
        }
    };

    const _styleTitleTopHalf = StyleSheet.flatten([
        renderStyleMode()?.title.styles,
        stylesTitle,
    ]);

    return (
        <View
            style={[renderStyleMode()?.headerCardContainer, customStyleHeaderCardContainer ] }
        >
            {image && (
                <ImageRenderer
                    style={renderStyleMode()?.headerCardImg}
                    source={image ? image : Images.Default.Base}
                />
            )}
            <View style={renderStyleMode()?.viewContent}>
                {titleTopHalf && (
                    <View style={{ alignItems: 'baseline' }}>
                        <View style={_styleTitleTopHalf}>
                            <TextPrimary
                                style={[
                                    renderStyleMode()?.textTitle,
                                    customTextTitle,
                                ]}
                            >
                                {titleTopHalf}
                            </TextPrimary>
                        </View>
                    </View>
                )}
                {titleBottomHalf && (
                    <TextPrimary
                        style={renderStyleMode()?.titleBottomHalf}
                    >
                        {titleBottomHalf}
                    </TextPrimary>
                )}
            </View>
            {status && <StatusActive title={titleActive} status={status} />}
        </View>
    );
};

export default HeaderCard;
