import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HeadImage } from '../SettingUser';
import { Colors } from 'app/presentation/theme';
import styled from 'styled-components';
import images from 'app/assets/images';
import FormContract from './FormContract';
import { getString } from 'app/presentation/localization';
import { useNavigation } from '@react-navigation/native';

const ContractManagementScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <HeadImage />
            <ScrollView style={styles.content}>
                <FormContract
                    source={images.Icons.documentText}
                    title={getString('borrowingContract')}
                    onPress={() => navigation.navigate('BorrowingContract')}
                />
                <FormContract
                    source={images.Icons.convertCube3D}
                    title={getString('investmentContractManagement')}
                    onPress={() => navigation.navigate('InvestmentList')}
                />
            </ScrollView>
        </View>
    );
};

export default ContractManagementScreen;

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
