import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Images } from 'app/presentation/theme';
import DoneScreen from 'app/presentation/components/donescreen';
import { getString } from 'app/presentation/localization';
import Dimensions from 'app/presentation/theme/Dimensions';

const NotiUnlockScreen = () => {
    return (
        <View style={styles.container}>
            <DoneScreen
                styleTitle={styles.styleTitle}
                titleContent={getString('productsAndAll')}
                source={Images.Icons.ImageUnLock}
                title={getString('toUse')}
                styleContainer={{
                    paddingTop: Dimensions.moderateScale(16),
                    paddingHorizontal: Dimensions.moderateScale(16),
                    paddingBottom: Dimensions.moderateScale(16),
                }}
            />
        </View>
    );
};

export default NotiUnlockScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.neutral.white,
        marginHorizontal: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(12),
        marginBottom: Dimensions.moderateScale(24),
    },
    styleTitle: {
        fontSize: Dimensions.FontSize.extraHuge,
        textAlign: 'center',
    },
});
