import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Colors, theme } from 'app/presentation/theme';

interface IProps {
    title: string;
    source: object;
    onPress?: () => void;
    styleContainer?: StyleProp<ViewStyle>;
    borderColor?: string;
    fontFamily?: string;
    fontSize?: number;
    disabled?: boolean;
}
const FormContract = (props: IProps) => {
    const {
        title,
        source,
        onPress,
        styleContainer,
        borderColor,
        fontFamily,
        fontSize,
        disabled
    } = props;
    return (
        <TouchableOpacity
            style={[
                styles.formContent,
                styleContainer,
                !!borderColor && { borderColor: borderColor }
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <ImageIconCircle
                style={{ width: 32, height: 32 }}
                source={source}
            />
            <Text
                style={[
                    styles.title,
                    { fontFamily: fontFamily, fontSize: fontSize },
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default FormContract;
const ImageIconCircle = styled.Image``;

const styles = StyleSheet.create({
    formContent: {
        paddingVertical: Dimensions.moderateScale(16),
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: Dimensions.moderateScale(16),
        marginHorizontal: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(16),
        borderColor: Colors.neutral.s190,
    },
    title: {
        paddingTop: Dimensions.moderateScale(14),
        lineHeight: Dimensions.moderateScale(18),
        fontFamily: theme.font.Medium,
        color: theme.color.textColor,
        fontSize: Dimensions.moderateScale(14),
    },
});
