import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';

interface IProps {
    titleBorrowing?: string;
    borrowingValue?: string;
    paidValue?: string;
    debtValue?: string;
}
const FormBorrowingStatus = (props: IProps) => {
    const { titleBorrowing, borrowingValue, paidValue, debtValue } = props;
    return (
        <View style={styles.container}>
            <TextPrimary style={styles.titleBorrowing}>
                {titleBorrowing}
            </TextPrimary>
            <View style={styles.formItem}>
                <TextPrimary style={styles.text}>
                    {getString('allBorrowing')}
                </TextPrimary>
                <TextPrimary style={styles.value}>{borrowingValue}</TextPrimary>
            </View>
            <View style={styles.formItem}>
                <TextPrimary style={styles.text}>
                    {getString('paid')}
                </TextPrimary>
                <TextPrimary
                    style={[styles.value, { color: Colors.success.brand }]}
                >
                    {paidValue}
                </TextPrimary>
            </View>
            <View style={styles.formItem}>
                <TextPrimary style={styles.text}>
                    {getString('debt')}
                </TextPrimary>
                <TextPrimary
                    style={[styles.value, { color: Colors.primary.s600 }]}
                >
                    {debtValue}
                </TextPrimary>
            </View>
        </View>
    );
};

export default FormBorrowingStatus;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        marginBottom: Dimensions.moderateScale(8),
    },
    titleBorrowing: {
        fontSize: Dimensions.moderateScale(12),
        fontWeight: theme.f,
        paddingVertical: Dimensions.moderateScale(16),
        lineHeight: Dimensions.moderateScale(22),
    },
    formItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: Colors.neutral.grayScale2,
        paddingVertical: Dimensions.moderateScale(12),
    },
    text: {
        fontSize: Dimensions.moderateScale(15),
    },
    value: {
        fontSize: Dimensions.moderateScale(15),
        fontFamily: theme.font.Bold,
    },
});
