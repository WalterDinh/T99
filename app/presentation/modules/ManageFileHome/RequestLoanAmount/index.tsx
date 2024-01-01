import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import images from 'app/assets/images';
import { Colors, theme } from 'app/presentation/theme';
import DoneScreen from 'app/presentation/components/donescreen';
import CommonCard from 'app/presentation/components/card/CommonCard';
import Dimensions from 'app/presentation/theme/Dimensions';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { useNavigation } from '@react-navigation/native';
import { getString } from 'app/presentation/localization';

const width = Dimensions.screenWidth();
const height = Dimensions.screenHeight();
const RequestLoanAmount = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.neutral.white}}>
            <ImageBackground
                source={images.Backgrounds.Background}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.formContent}>
                    <DoneScreen
                        source={images.Icons.imageRequestSuccess}
                        title={getString('loanContractSuccessful')}
                        styleTitle={{ width: Dimensions.moderateScale(310) }}
                        children={
                            <View
                                style={{
                                    width: width,
                                    paddingTop: Dimensions.moderateScale(30),
                                }}
                            >
                                <CommonCard
                                    disabled
                                    dataCard={[
                                        {
                                            title: getString('contractCode'),
                                            value: 'HD0000012312312',
                                        },
                                        {
                                            title: getString('loanAmount'),
                                            value: '10.450.000 VNĐ',
                                        },
                                        {
                                            title: getString('dateInnitiated'),
                                            value: '29/06/2022',
                                        },
                                    ]}
                                />
                            </View>
                        }
                    />
                    <AppButton
                        type={ButtonType.SquareRed}
                        name={getString('backToHome')}
                        textStyle={{
                            fontSize: Dimensions.moderateScale(17),
                            fontFamily: theme.font.Medium,
                        }}
                        styleBtn={{
                            borderRadius: Dimensions.moderateScale(22),
                            marginBottom: Dimensions.bottomPadding,
                            marginTop: Dimensions.moderateScale(100),
                            paddingVertical: Dimensions.moderateScale(12),
                        }}
                        onPress={() => navigation.navigate('Home')}
                    />
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

export default RequestLoanAmount;

const styles = StyleSheet.create({
    imageBackground: {
        bottom:-30
    },
    formContent: {
        paddingTop: Dimensions.moderateScale(70),
        marginHorizontal: Dimensions.moderateScale(32),
        flex: 1,
    },
});
