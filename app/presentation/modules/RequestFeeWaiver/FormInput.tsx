import { Input, TextPrimary } from 'app/presentation/components';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface IProps {
    isRequire?: boolean;
    titleLeft?: string;

}
const FormInput = (props: IProps) => {
    const { isRequire, titleLeft, ...restProps } = props;

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <TextPrimary style={styles.text}>
                    {titleLeft}
                    {isRequire && (
                        <TextPrimary style={{ color: 'red' }}>*</TextPrimary>
                    )}
                </TextPrimary>
            </View>
            <View style={styles.formInput}>
                <View style={styles.input}>
                    <Input {...restProps} />
                </View>
                <View style={{ flex: 1 }} />
            </View>
            <TextPrimary />

        </View>
    );
};

export default FormInput;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Dimensions.moderateScale(10),
        paddingHorizontal: Dimensions.moderateScale(6),
    },
    text: {
        fontFamily: theme.font.Medium,
        color: Colors.neutral.s400,
    },
    formInput: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        borderColor: Colors.neutral.grayScale2,
        flex:1
    },
});
