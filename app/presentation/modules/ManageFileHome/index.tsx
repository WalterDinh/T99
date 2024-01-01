import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HeadImage } from '../SettingUser';
import { Colors } from 'app/presentation/theme';
import images from 'app/assets/images';
import { getString } from 'app/presentation/localization';
import { useNavigation } from '@react-navigation/native';
import FormContract from '../ContractManagement/FormContract';

const ManageHomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <HeadImage />
            <ScrollView style={styles.content}>
                <FormContract
                    source={images.Icons.documentText}
                    title={getString('manageLoanAmount')}
                    onPress={() => navigation.navigate('ManageLoanAmount')}
                />
                <FormContract
                    source={images.Icons.convertCube3D}
                    title={getString('managementMobilizationRecords')}
                    onPress={() => navigation.navigate('InvestmentList')}
                />
            </ScrollView>
        </View>
    );
};

export default ManageHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        paddingTop: 16,
        backgroundColor: Colors.neutral.white,
    },
});
