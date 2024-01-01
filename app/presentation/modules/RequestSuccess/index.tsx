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
import { TextPrimary } from 'app/presentation/components';

const width = Dimensions.screenWidth();
const height = Dimensions.screenHeight();
const RequestSuccess = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: Colors.neutral.white }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground
                    source={images.Backgrounds.Background}
                    resizeMode="cover"
                    style={styles.imageBackground}
                >
                    <View style={styles.formContent}>
                        <DoneScreen
                            source={images.Icons.imageRequestSuccess}
                            title={getString('requestSuccess')}
                            styleTitle={{ width: 260 }}
                            children={
                                <View
                                    style={{
                                        width: width,
                                        paddingTop:
                                            Dimensions.moderateScale(12),
                                    }}
                                >
                                    <CommonCard
                                        disabled
                                        styleCommonCard={{
                                            paddingTop:
                                                Dimensions.moderateScale(12),
                                        }}
                                        dataCard={[
                                            {
                                                title: getString('profileCode'),
                                                value: 'HS0012312312',
                                            },
                                            {
                                                title: getString('requestDate'),
                                                value: '29/06/2022',
                                            },
                                        ]}
                                    />
                                </View>
                            }
                            titleContent={getString(
                                'yourRequestProcessedByT99',
                            )}
                            styleTitleContent={styles.textSub}
                        />
                    </View>
                    <View style={{paddingHorizontal:Dimensions.moderateScale(22)}}>
                        <AppButton
                            type={ButtonType.SquareRed}
                            name={getString('backToHome')}
                            textStyle={{
                                fontSize: 17,
                                fontFamily: theme.font.Medium,
                            }}
                            styleBtn={{
                                borderRadius: Dimensions.moderateScale(22),
                                marginBottom: Dimensions.bottomPadding,
                                paddingVertical: Dimensions.moderateScale(12),
                            }}
                            onPress={() => navigation.navigate('Home')}
                        />
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    );
};

export default RequestSuccess;

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    formContent: {
        flex: 1,
        marginTop: Dimensions.topPadding,
        marginHorizontal: Dimensions.moderateScale(32),
    },
    textSub: {
        fontSize: Dimensions.moderateScale(17),
        fontFamily: theme.font.Regular,
        color: Colors.neutral.s400,
        textAlign: 'center',
        lineHeight: Dimensions.moderateScale(24),
    },
});
