import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import { TextPrimary } from 'app/presentation/components';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Colors } from 'app/presentation/theme';

interface IProps {
    onPress?: () => void;
    title?: string;
    source?: object;
    borderTopWidth?: number;
    disabled?: boolean
}
const FormFooter = (props: IProps) => {
    const { onPress, title, source, borderTopWidth, disabled } = props;
    return (
        <View style={styles.formFooter}>
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                style={[styles.formItem, { borderTopWidth: borderTopWidth }]}
            >
                <TextPrimary>{title}</TextPrimary>
                <ImageIconCircle
                    style={{ width: 6, height: 10 }}
                    source={source}
                />
            </TouchableOpacity>
        </View>
    );
};

export default FormFooter;
const ImageIconCircle = styled.Image``;

const styles = StyleSheet.create({
    formFooter: {
        backgroundColor: Colors.neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    formItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Dimensions.moderateScale(12),
        borderBottomWidth: 1,
        borderColor: Colors.neutral.grayScale2,
    },
});
