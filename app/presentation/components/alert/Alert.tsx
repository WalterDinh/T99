import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import { Colors, Images, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import React from 'react';
import {
    ImageStyle,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

interface Iprops {
    note: string;
    type?: StatusToast;
    notice?: string | React.ReactNode;
    styleContainer?: StyleProp<ViewStyle>;
    styleImg?: StyleProp<ImageStyle>;
    styleContent?: StyleProp<ViewStyle>;
    styleNote?: StyleProp<ViewStyle>;
    styleNotice?: StyleProp<ViewStyle>;
}
const Alert = (props: Iprops) => {
    const {
        note,
        notice,
        styleContainer,
        styleImg,
        styleContent,
        styleNote,
        styleNotice,
        type = StatusToast.Warning,
    } = props;

    const renderIcon = (typeToast: StatusToast) => {
        switch (typeToast) {
            case StatusToast.Success:
                return Images.Icons.vector3;
            case StatusToast.Error:
                return Images.Icons.vector2;
            default:
                return Images.Icons.vector;
        }
    };

    const renderColor = (typeToast: StatusToast) => {
        switch (typeToast) {
            case StatusToast.Success:
                return Colors.success.brand;
            case StatusToast.Error:
                return Colors.danger.brand;
            default:
                return Colors.warning.brand;
        }
    };

    const renderBackgroundColor = (typeToast: StatusToast) => {
        switch (typeToast) {
            case StatusToast.Success:
                return '#f8fbf6';
            case StatusToast.Error:
                return '#fff6f5';
            default:
                return '#fffefb';
        }
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: renderBackgroundColor(type) },
                styleContainer,
            ]}
        >
            <ImageRenderer
                style={[styles.img, styleImg]}
                source={renderIcon(type)}
            />
            <View style={[styles.content, styleContent]}>
                <TextPrimary
                    style={[
                        styles.note,
                        { color: renderColor(type) },
                        styleNote,
                    ]}
                >
                    {note}
                </TextPrimary>
                {typeof notice === 'string' ? (
                    <TextPrimary style={[styles.notice, styleNotice]}>
                        {notice}
                    </TextPrimary>
                ) : (
                    notice
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 241, 184, 0.2)',
        borderRadius: Dimensions.Spacing.small,
        paddingVertical: Dimensions.Spacing.medium,
        paddingHorizontal: Dimensions.Spacing.medium,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Dimensions.Spacing.small,
    },
    img: {
        height: Dimensions.Spacing.extraLarge,
        width: Dimensions.Spacing.extraLarge,
    },
    content: {
        flex: 1,
        marginLeft: Dimensions.Spacing.medium,
    },
    note: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.extraLarge,
        color: theme.color.warningColor,
        lineHeight: Dimensions.moderateScale(22),
    },
    notice: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(22),
        color: theme.color.labelColor,
    },
});
export default Alert;
