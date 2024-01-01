import { StyleSheet, View } from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import { ScrollView } from 'react-native-gesture-handler';
import Dimensions from 'app/presentation/theme/Dimensions';
import styled from 'styled-components';

const PdfContractScreen = () => {
    const source = {
        uri: 'https://www.africau.edu/images/default/sample.pdf',
        cache: true,
    };
    return (
        <ScrollView nestedScrollEnabled style={styles.container}>
            <View>
                <Pdf source={source} style={styles.pdf} />
            </View>
        </ScrollView>
    );
};

export default PdfContractScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        height: Dimensions.screenHeight() - 100,
        width: Dimensions.screenWidth() - 22,
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingTop: Dimensions.moderateScale(16),
    },
});
