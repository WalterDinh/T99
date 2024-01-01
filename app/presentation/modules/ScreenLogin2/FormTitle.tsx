import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextPrimary } from 'app/presentation/components';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Colors } from 'app/presentation/theme';

interface IProps {
    title: string;
    subTitle: string;
}
const FormTitle = (props: IProps) => {
    const { title, subTitle } = props;
    return (
        <View style={styles.container}>
            <TextPrimary style={styles.styleTitle}>{title}</TextPrimary>
            <TextPrimary style={styles.subTitle}>{subTitle}</TextPrimary>
        </View>
    );
};

export default FormTitle;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Dimensions.moderateScale(20),
    },
    styleTitle: {
        fontSize: Dimensions.moderateScale(34),
        lineHeight: Dimensions.moderateScale(41),
        letterSpacing: 0.35,
        color: Colors.neutral.black,
        paddingBottom: Dimensions.moderateScale(12),
    },
    subTitle: {
        fontSize: Dimensions.moderateScale(15),
        lineHeight: Dimensions.moderateScale(22),
        letterSpacing: -0.28,
        color: Colors.neutral.s400,
    },
});
