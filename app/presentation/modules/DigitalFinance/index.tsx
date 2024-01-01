import { StackNavigationProp } from '@react-navigation/stack';
import Img from 'app/assets/images/index';
import InfoUserHeader from 'app/presentation/components/infouser/InfoUserHeader';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Images, theme } from 'app/presentation/theme';
import { StatusToast } from 'app/shared/constants';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import DigitalFinancelBlock from './OtherFeature/DigitalFinancelBlock';
import Utilities from './OtherFeature/Utilities';
import { styles } from './styles';
//! Data
import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { BaseModal } from 'app/presentation/components/modal/ModalBase';
import { useGetUser } from 'app/presentation/hooks/useGetUser';
import VerifyUserEkycDataModel from 'app/models/ekyc/VerifyUserEkycDataModel';
import { useSelector } from 'react-redux';
import CustomerSelectors from 'app/presentation/redux/selectors/customer';


const dataBlock = [
    {
        imgUrl: Img.Backgrounds.BackgroundGolferPackage,
        title: getString('t99Golf'),
        nameBtn: 'Chi tiết',
        onPressBtn: () => {
            Toast.show({
                type: StatusToast.Warning,
                text2: getString('featureImproving'),
            })
        },
    },
    {
        imgUrl: Img.Backgrounds.BackgroundRealEstate,
        title: getString('t99RealEstate'),
        nameBtn: 'Chi tiết',
        onPressBtn: () => {
            Toast.show({
                type: StatusToast.Warning,
                text2: getString('featureImproving'),
            })
        },
    },
    {
        imgUrl: Img.Backgrounds.BackgroundBannerPledge,
        title: getString('t99Pledge'),
        nameBtn: 'Chi tiết',
        onPressBtn: () => {
            Toast.show({
                type: StatusToast.Warning,
                text2: getString('featureImproving'),
            })
        },
    },
];
//! Interface
interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'DigitalFinance'>;

}
const index = (props: IProps) => {
    //! State
    const { navigation } = props;
    const userName = useGetUser()?.user?.fullName || '';
    const id=useGetUser()?.user?.cif||'';
    const [openModalIdentityVerification, setOpenModalIdentityVerification] =
        useState(false);
    
    const avatar = useGetUser()?.user?.avatar || '';

    //! Function
    const handleClickDigitalFinancelBlock = (type: string) => {
        switch (type) {
            case 'golf':
                navigation.navigate('T99golferStack');
                // navigation.navigate('DisbursementStack');
                break;
            case 'pawn':
                navigation.navigate('T99pawnStack');
                break;
            case 'invest':
                navigation.navigate('T99investStack');
                break;
            case 'saving':
                Toast.show({
                    type: StatusToast.Warning ,
                    text2: getString('featureImproving'),
                })
                // navigation.navigate('DisbursementStack');
                break;
            default:
                navigation.navigate('T99investStack');
                break;
        }
    }
    const onShowModalVerification = () => {
        // setOpenModalImageOption(true);
        setOpenModalIdentityVerification(true)
    };


    const onHideModalVerification = () => {
        setOpenModalIdentityVerification(false);
    };
    const handleClickSignup = () => {
        navigation.navigate('EkycStack');
        onHideModalVerification();
    };
    //! Render
    return (
        <>
        <SafeAreaView
            edges={['top']}
            style={{
                flex: 1,
                backgroundColor: theme.color.backgroundColorVariant,
            }}
        >
            <View style={styles.container}>
                <InfoUserHeader
                    name={userName}
                    id={id}
                    sourceAvatar={avatar}
                    onClickAvatar={() => 
                        navigation.navigate('InformationVerification')
                    }
                    onPressIconLeft={() => navigation.navigate('AppTab')}
                    onPressIconRight={() => navigation.navigate('Notifications')}
                    sourceIconLeft={Img.Icons.Back}
                    unread
                    // notiType={NotiType.Error}
                    // titleNoti="Bạn có 03 hợp đồng vay quá hạn"
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        
                        backgroundColor:
                            theme.color.backgroundColorSecondaryVariant,
                    }}
                    contentContainerStyle={{flexGrow:1,}}
                    showsHorizontalScrollIndicator={false}
                >
                    <DigitalFinancelBlock onPress={handleClickDigitalFinancelBlock} title={getString('digitalFinance')} />
                    <Utilities
                        title={getString('featuredProducts')}
                        dataBlock={dataBlock}
                    />
                </ScrollView>
            </View>

        </SafeAreaView>
        <BaseModal
        onHideModal={onHideModalVerification}
        onShowModal={onShowModalVerification}
        isVisible={openModalIdentityVerification}
        containerStyle={{ justifyContent: 'center' }}
    >
        <View style={styles.containerModal}>
            <View>
                <ImageRenderer
                    style={styles.imgModal}
                    source={Images.Icons.EkycActive}
                />
            </View>
            <TextPrimary style={styles.titleModal}>
                {getString('identityVerification')}
            </TextPrimary>
            <TextPrimary style={styles.noteModal}>
                {getString('pleaseIdentityInformation')}
            </TextPrimary>
            <AppButton
                onPress={handleClickSignup}
                name={getString('signup')}
            />
        </View>
    </BaseModal>
    </>
    );
};

export default index;
