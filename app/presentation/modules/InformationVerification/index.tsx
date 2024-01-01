import { StackNavigationProp } from '@react-navigation/stack';
import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import StatusActive from 'app/presentation/components/items/StatusActive';
import { getString } from 'app/presentation/localization';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Images, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native';
import styled from 'styled-components';
import Img from '../../../assets/images';
import { renderType, valueVerification } from './constant';
import ItemVerification from './ItemVerification';
import { styles } from './styles';
import { useGetUser } from 'app/presentation/hooks/useGetUser';
import { useSelector } from 'react-redux';
import CustomerSelectors from 'app/presentation/redux/selectors/customer';
import VerifyUserEkycDataModel from 'app/models/ekyc/VerifyUserEkycDataModel';

interface IProps {
    navigation: StackNavigationProp<
        AppStackParamList,
        'InformationVerification'
    >;
    loyalty: string;
}

const InformationVerification = (props: IProps) => {
    //! State
    const { navigation } = props;
    const [stepArr, setStepArr] = useState<Array<number>>([]);
    const loyalty: string = 'standard';
    const userName = useGetUser()?.user?.fullName || '';
    const imageAvt = useGetUser()?.user?.avatar || '';
    const id = useGetUser()?.user?.cif || '';

    const verifyUserDataReducer: VerifyUserEkycDataModel =
        useSelector(CustomerSelectors?.selectVerifyUserDataReducer)?.data || {};
    // //! Function

    const handleClickItemVerification = (type: any) => {
        if (type === 'electronicIdentityVerification') {
            navigation.navigate('EkycStack');
        }
        if (type === 'authenticGolfer') {
            navigation.navigate('GolferVerification');
        }
        if (type === 'confirmationOfResidence') {
            navigation.navigate('ConfirmationOfResidence');
        }
        if (type === 'assetVerification') {
            navigation.navigate('AssetAuthentication');
        }
        if (type === 'incomeVerification') {
            navigation.navigate('IncomeInformation');
        }
    };

    const ViewAvatar = styled.View`
        padding-left: ${Dimensions.moderateScale(22)};
        padding-right: ${Dimensions.moderateScale(22)};
        padding-top: ${Dimensions.Spacing.large};
        padding-bottom: ${Dimensions.Spacing.large};
        width: ${Dimensions.moderateScale(60)};
        height: ${Dimensions.moderateScale(60)};
        border-radius: ${Dimensions.moderateScale(50)};
        align-items: center;
        justify-content: center;
        background-color: ${renderType(loyalty)?.backgroundColor};
    `;

    //! Render
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={Img.Backgrounds.BackgroundAccountInfo}
                resizeMode="cover"
                style={styles.unconfirmedImageBackground}
            >
                <View style={styles.flexDirection}>
                    <ViewAvatar>
                        <View style={styles.unconfirmedTouchImage}>
                            <ImageRenderer
                                source={
                                    imageAvt
                                        ? imageAvt
                                        : Images.Icons.ProfileCircle
                                }
                                resizeMode="cover"
                                style={styles.avatar}
                            />
                        </View>
                    </ViewAvatar>
                    <View
                        style={
                            stepArr.length > 0
                                ? styles.contentHeaderTitle
                                : styles.unconfirmedContentHeaderTitle
                        }
                    >
                        <TextPrimary style={styles.name}>
                            {userName}
                        </TextPrimary>
                        <TextPrimary style={styles.id}>ID: {id}</TextPrimary>
                    </View>
                </View>
                <StatusActive
                    styleIn={{
                        backgroundColor: renderType(loyalty)?.backgroundColor,
                    }}
                    styleTitle={{
                        color: renderType(loyalty)?.color,
                        textTransform: 'uppercase',
                        fontFamily: theme.font.Medium,
                        fontSize: Dimensions.verticalScale(12),
                    }}
                    title={getString('t99Standard')}
                    style={{ marginTop: Dimensions.verticalScale(11) }}
                />
            </ImageBackground>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contentTitle}>
                        <TextPrimary style={styles.title}>
                            {getString('verifyYourAccount')}
                        </TextPrimary>
                        <TextPrimary
                            style={[
                                styles.title,
                                { fontFamily: theme.font.Medium },
                            ]}
                        >
                            {
                                Object.values(verifyUserDataReducer).filter(
                                    (elm) => elm,
                                ).length
                            }
                            /{valueVerification.length}{' '}
                        </TextPrimary>
                    </View>
                    <View style={styles.flexDirection}>
                        <ImageRenderer
                            style={styles.imgDashline}
                            source={Images.Icons.Dashline}
                        />
                        <View style={styles.flex}>
                            {valueVerification.map(
                                (elm: any, index: number) => {
                                    let isVerified = false;
                                    switch (elm.type) {
                                        case 'electronicIdentityVerification':
                                            isVerified = Boolean(
                                                verifyUserDataReducer?.isEkyc,
                                            );
                                            break;
                                        case 'authenticGolfer':
                                            isVerified = Boolean(
                                                verifyUserDataReducer?.verifyGolfer,
                                            );
                                            break;

                                        case 'confirmationOfResidence':
                                            isVerified = Boolean(
                                                verifyUserDataReducer?.verifyResidence,
                                            );
                                            break;

                                        case 'assetVerification':
                                            isVerified = Boolean(
                                                verifyUserDataReducer?.verifyAsset,
                                            );
                                            break;

                                        case 'incomeVerification':
                                            isVerified = Boolean(
                                                verifyUserDataReducer?.verifyIncome,
                                            );
                                            break;
                                    }
                                    return (
                                        <View style={styles.itemVerification}>
                                            <View
                                                style={
                                                    styles.viewItemVerification
                                                }
                                            />
                                            <ItemVerification
                                                disabled={isVerified}
                                                onPress={() =>
                                                    handleClickItemVerification(
                                                        elm?.type,
                                                    )
                                                }
                                                styleIconRight={
                                                    isVerified
                                                        ? styles.styleCheck
                                                        : styles.styleAngleRight
                                                }
                                                source={
                                                    isVerified
                                                        ? Images.Icons
                                                              .CheckmarkNoCircle
                                                        : Images.Icons
                                                              .VectorIcon
                                                }
                                                title={elm?.title}
                                                iconLeft={
                                                    isVerified
                                                        ? elm?.iconHaveStep
                                                        : elm?.icon
                                                }
                                            />
                                        </View>
                                    );
                                },
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default InformationVerification;
