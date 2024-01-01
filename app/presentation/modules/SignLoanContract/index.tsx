import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Pdf from 'react-native-pdf';
import { Colors, theme } from 'app/presentation/theme';
import { TextPrimary } from 'app/presentation/components';
import { ScrollView } from 'react-native-gesture-handler';
import Dimensions from 'app/presentation/theme/Dimensions';
import SignContractScreen from '../ManageFileHome/SignContract';
import SignatureScreen, {
    SignatureViewRef,
} from 'react-native-signature-canvas';
import { getString } from 'app/presentation/localization';
import styled from 'styled-components';
import images from 'app/assets/images';
import { useNavigation } from '@react-navigation/native';

const SignLoanContractScreen = () => {
    const navigation = useNavigation();
    const source = {
        uri: 'https://www.africau.edu/images/default/sample.pdf',
        cache: true,
    };
    return (
        <ScrollView nestedScrollEnabled style={styles.container}>
            <View>
                <Pdf source={source} style={styles.pdf} />
            </View>
            <View style={{ marginBottom: Dimensions.bottomPadding }}>
                <View
                    style={[
                        styles.borrower,
                        {
                            marginTop: Dimensions.moderateScale(24),
                            height: 150,
                        },
                    ]}
                >
                    <TextPrimary style={styles.textBorrower}>
                        {getString('borrower')}
                    </TextPrimary>
                    <View style={styles.content}>
                        <Button
                            title={getString('pleaseSignHere')}
                            color={Colors.neutral.s250}
                            onPress={() => navigation.navigate('SignContract')}
                        />
                    </View>
                </View>
                <View style={styles.borrower}>
                    <TextPrimary style={styles.textBorrower}>
                        {getString('lenders')}
                    </TextPrimary>
                    <ImageIconCircle
                        source={images.Icons.sign}
                        style={{
                            width: 111,
                            height: 90,
                            alignSelf: 'center',
                            marginBottom: Dimensions.moderateScale(8),
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default SignLoanContractScreen;
const ImageIconCircle = styled.Image``;

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
    borrower: {
        marginHorizontal: Dimensions.moderateScale(22),
        backgroundColor: 'white',
        marginTop: Dimensions.moderateScale(12),
        borderRadius: Dimensions.moderateScale(8),
    },
    textBorrower: {
        alignSelf: 'center',
        fontSize: Dimensions.moderateScale(17),
        paddingTop: Dimensions.moderateScale(16),
        paddingBottom: Dimensions.moderateScale(8),
        fontFamily: theme.font.Medium,
    },
    content: {
        flex: 1,
        borderColor: theme.color.borderColor,
        borderWidth: 1,
        borderRadius: Dimensions.moderateScale(8),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Dimensions.moderateScale(22),
        marginBottom: Dimensions.moderateScale(16),
    },
    textInSign: {
        position: 'absolute',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraLarge,
        color: Colors.neutral.s250,
    },
});
