import {
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
    ImageStyle,
    TextStyle,
} from 'react-native';
import React from 'react';
import { Dimensions, theme } from 'app/presentation/theme';
import ImageRenderer from '../image/ImageRenderer';
import Img from '../../../assets/images';
import TextPrimary from '../text/TextPrimary';

interface IProps {
    title?: string;
    time?: string;
    titleHeader?: string;
    titleContent?: string | React.ReactElement<Text>;
    titleContent2?: string | React.ReactElement<Text>;
    source?: string | number | object;
    children?: React.ReactElement<View>;
    styleContainer?: StyleProp<ViewStyle>;
    styleTitleHeader?: StyleProp<TextStyle>;
    styleTitleTime?: StyleProp<ViewStyle>;
    styleTitle?: StyleProp<TextStyle>;
    styleTitleContent?: StyleProp<ViewStyle>;
    styleImg?: StyleProp<ImageStyle>;
}

const DoneScreen = (props: IProps) => {
    const {
        titleHeader,
        title,
        time,
        titleContent,
        titleContent2,
        source,
        children,
        styleContainer,
        styleTitleHeader,
        styleTitleTime,
        styleImg,
        styleTitle,
        styleTitleContent,
    } = props;
    return (
        <View style={[doneScreenStyles.container, styleContainer]}>
            {!!titleHeader && (
                <TextPrimary
                    style={[doneScreenStyles.titleHeader, styleTitleHeader]}
                >
                    {titleHeader}
                </TextPrimary>
            )}
            <ImageRenderer
                style={[doneScreenStyles.background, styleImg]}
                source={source || Img.Icons.ChangePasswordDone}
            />
            {!!time && (
                <TextPrimary
                    style={[doneScreenStyles.descriptionTime, styleTitleTime]}
                >
                    {time}
                </TextPrimary>
            )}
            {!!title && (
                <TextPrimary
                    style={[doneScreenStyles.title, styleTitle]}
                    numberOfLines={3}
                >
                    {title}
                </TextPrimary>
            )}
            {typeof titleContent === 'string' ? (
                <TextPrimary
                    style={[doneScreenStyles.description, styleTitleContent]}
                >
                    {titleContent}
                </TextPrimary>
            ) : (
                titleContent
            )}
            {!!titleContent2 && (
                <TextPrimary
                    style={[doneScreenStyles.description, styleTitleContent]}
                >
                    {titleContent2}
                </TextPrimary>
            )}
            {children}
        </View>
    );
};

export default DoneScreen;

const doneScreenStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    background: {
        height: Dimensions.screenWidth() * 0.45,
        width: Dimensions.screenWidth() * 0.45,
        marginBottom: Dimensions.Spacing.large,
    },
    titleHeader: {
        marginTop: Dimensions.Spacing.large,
        fontFamily: theme.font.Regular,
        color: theme.color.textColor,
        fontSize: Dimensions.moderateScale(25),
        textAlign: 'center',
        marginBottom: Dimensions.moderateScale(39),
    },
    title: {
        marginTop: Dimensions.Spacing.large,
        fontFamily: theme.font.Regular,
        color: theme.color.colorSecondary,
        fontSize: Dimensions.FontSize.extraExtraHuge,
        textAlign: 'center',
    },
    description: {
        marginTop: Dimensions.Spacing.large,
        fontFamily: theme.font.Regular,
        color: theme.color.labelColor,
        fontSize: Dimensions.FontSize.large,
        textAlign: 'center',
    },
    descriptionTime: {
        marginTop: Dimensions.Spacing.small,
        fontFamily: theme.font.Regular,
        color: theme.color.labelColor,
        fontSize: Dimensions.FontSize.large,
        textAlign: 'center',
    },
});
