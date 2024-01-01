import { StackNavigationProp } from '@react-navigation/stack';
import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import InfoUser, {
    AccountType,
} from 'app/presentation/components/infouser/InfoUser';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { getUserDataRequest } from 'app/presentation/redux/actions/customer/user';
import { Dimensions, theme } from 'app/presentation/theme';
import { LinkResort, LinkSim, StatusToast } from 'app/shared/constants';
import React, { useEffect } from 'react';
import {
    DeviceEventEmitter,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import Img from '../../../assets/images';
import { HomeCardBlock } from './components/HomeCardBlock';
import RegisterService from './components/OtherFeature/RegisterService';
import Utilities from './components/OtherFeature/Utilities';
import { PromoBanner } from './components/PromoBanner';
import { EventActions } from 'app/shared/helper/EventEmitter';
import CustomerRepository from 'app/data/repository/customer';
import { logoutUserSuccess } from 'app/presentation/redux/actions/customer/auth/auth';
import { getAccountBenefitRequest } from 'app/presentation/redux/actions/accountBenefits';

const dataPromo = [
    {
        imgUrl: Img.Backgrounds.PromoBanner,
    },
    {
        imgUrl: Img.Backgrounds.PromoBanner1,
    },
    {
        imgUrl: Img.Backgrounds.PromoBanner2,
    },
    {
        imgUrl: Img.Backgrounds.PromoBanner3,
    },
];
interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
}
const HomeScreen = (props: IProps) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserDataRequest());
        dispatch(getAccountBenefitRequest());
        const subscription = DeviceEventEmitter.addListener(
            EventActions.logout,
            () => {
                new CustomerRepository().logoutUser().then(() => {
                    dispatch(logoutUserSuccess());
                });
            },
        );
        return () => subscription.remove();
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <ImageRenderer
                    resizeMode="stretch"
                    source={Img.Carousel.BannerTopHome}
                    style={styles.imageHeader}
                />
                <InfoUser
                    onClickAvatar={() =>
                        navigation.navigate('InformationVerification')
                    }
                    // disabled
                    accountType={AccountType.Standard}
                    unread
                    style={{
                        marginTop: -Dimensions.Spacing.large,
                        marginHorizontal: Dimensions.Spacing.large,
                    }}
                    onPressIconRight={() =>
                        navigation.navigate('Notifications')
                    }
                />
                <View style={styles.homeCardBlock}>
                    <HomeCardBlock
                        title={getString('digitalFinance')}
                        icon={Img.Icons.MoneyHome}
                        background={Img.HomeCard.Block}
                        onPress={() => navigation.navigate('DigitalFinance')}
                    />
                    <HomeCardBlock
                        title={getString('digitalPayment')}
                        icon={Img.Icons.WalletAdd}
                        background={Img.HomeCard.Block2}
                        onPress={() => {
                            Toast.show({
                                type: StatusToast.Warning,
                                text2: getString('featureImproving'),
                            });
                        }}
                    />
                </View>
                <View style={styles.homeCardBlock}>
                    <HomeCardBlock
                        title={getString('digitalInsurance')}
                        icon={Img.Icons.InsuranceHome}
                        background={Img.HomeCard.Block3}
                        onPress={() => {
                            Toast.show({
                                type: StatusToast.Warning,
                                text2: getString('featureImproving'),
                            });
                        }}
                    />
                    <HomeCardBlock
                        title={getString('simNumber')}
                        icon={Img.Icons.SimCard}
                        background={Img.HomeCard.Block4}
                        onPress={() =>
                            navigation.navigate('WebViewScreen', {
                                url: LinkSim,
                            })
                        }
                    />
                </View>

                <PromoBanner dataImg={dataPromo} />

                <TouchableOpacity
                    onPress={() => {
                        Toast.show({
                            type: StatusToast.Warning,
                            text2: getString('featureImproving'),
                        });
                    }}
                >
                    <ImageBackground
                        resizeMode="stretch"
                        source={Img.Button.BackgroundButton}
                        style={styles.styleBtn}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <TextPrimary style={styles.titleBtn}>
                                {getString('investmentCooperation')}
                            </TextPrimary>
                            <ImageRenderer
                                source={Img.Icons.RightIconCircle}
                                style={styles.img}
                            />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <Utilities
                    title={getString('utilities')}
                    style={{ marginTop: Dimensions.Spacing.extraLarge }}
                    onClickPayments={() =>
                        navigation.navigate('ContractPayments')
                    }
                    onClickResort={() =>
                        navigation.navigate('WebViewScreen', {
                            url: LinkResort,
                        })
                    }
                    onClickBookGolf={() => {
                        Toast.show({
                            type: StatusToast.Warning,
                            text2: getString('featureImproving'),
                        });
                    }}
                    onClickFashionLuxury={() => {
                        Toast.show({
                            type: StatusToast.Warning,
                            text2: getString('featureImproving'),
                        });
                    }}
                    onClickLifeUtilities={() => {
                        Toast.show({
                            type: StatusToast.Warning,
                            text2: getString('featureImproving'),
                        });
                    }}
                />
                <RegisterService
                    navigation={navigation}
                    title={getString('registerService')}
                    style={{ marginTop: Dimensions.Spacing.small }}
                />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    imageHeader: {
        width: Dimensions.screenWidth(),
        height: Dimensions.moderateScale(210),
    },
    homeCardBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Dimensions.Spacing.large,
        marginTop: Dimensions.Spacing.large,
    },
    styleBtn: {
        justifyContent: 'center',
        marginTop: Dimensions.Spacing.extraHuge,
        marginHorizontal: Dimensions.Spacing.large,
        paddingVertical: Dimensions.Spacing.medium,
        paddingLeft: Dimensions.moderateScale(26),
        paddingRight: Dimensions.Spacing.medium,
        borderRadius: 40,

        shadowColor: theme.color.colorPrimary,

        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 30,

        elevation: 5,
    },
    img: {
        height: 36,
        width: 36,
    },
    titleBtn: {
        flex: 1,
        color: theme.color.textColorVariant,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraLarge,
        lineHeight: 25,
        letterSpacing: 0.38,
    },
});
