import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextPrimary } from 'app/presentation/components';
import { Colors, Dimensions, theme } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';
import UtilitiesVarious from './UtilitiesVarious';
import RegisterVarious from './RegisterVarious';

const VariousAndUtilitiesScreen = () => {
    return (
        <View style={styles.container}>
            <TextPrimary style={styles.titleHeader}>
                {getString('variousAndRichUtilities')}
            </TextPrimary>
            <UtilitiesVarious
                disabled
            />
            <View style={styles.formSubTitle}>
                <TextPrimary style={styles.titleSub}>
                    {getString('smartSupport2')}
                </TextPrimary>
            </View>
            <RegisterVarious />
        </View>
    );
};

export default VariousAndUtilitiesScreen;

const styles = StyleSheet.create({
    container: {
        borderRadius: Dimensions.moderateScale(12),
        backgroundColor: Colors.neutral.white,
        marginHorizontal: Dimensions.moderateScale(16),
        marginBottom: Dimensions.moderateScale(32),
    },
    titleHeader: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.moderateScale(20),
        alignSelf: 'center',
        paddingTop: Dimensions.moderateScale(16),
    },
    formSubTitle: {
        alignItems: 'center',
        marginTop: Dimensions.moderateScale(26),
    },
    titleSub: {
        paddingHorizontal: Dimensions.moderateScale(16),
        color: Colors.neutral.s400,
        textAlign: 'center',
        fontSize: Dimensions.moderateScale(15),
    },
});
