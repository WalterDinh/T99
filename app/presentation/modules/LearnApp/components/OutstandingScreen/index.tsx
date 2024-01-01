import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextPrimary } from 'app/presentation/components';
import FormContract from 'app/presentation/modules/ContractManagement/FormContract';
import images from 'app/assets/images';
import { Colors } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { getString } from 'app/presentation/localization';

const OutstandingForm = () => {
    return (
        <View style={styles.formOutstanding}>
            <TextPrimary style={styles.titleHeader}>
                {getString('outstandingFeatures')}
            </TextPrimary>
            <FormContract
                source={images.Icons.Flash}
                title={getString('smartSupport')}
                borderColor="#D2232A40"
                fontSize={15}
                disabled
            />
            <FormContract
                source={images.Icons.Shielddd}
                title={getString('safetyHighSecurity')}
                borderColor="#D2232A40"
                fontSize={15}
                disabled
            />
            <FormContract
                source={images.Icons.MobilePro}
                title={getString('simpleAndEasyOperation')}
                borderColor="#D2232A40"
                fontSize={15}
                disabled
            />
        </View>
    );
};

export default OutstandingForm;

const styles = StyleSheet.create({
    titleHeader: {
        paddingVertical: Dimensions.moderateScale(16),
        alignSelf: 'center',
        fontSize: Dimensions.moderateScale(20),
    },
    formOutstanding: {
        backgroundColor: Colors.neutral.white,
        marginTop: Dimensions.moderateScale(25),
        marginHorizontal: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(12),
    },
});
