import { StackNavigationProp } from '@react-navigation/stack';
import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import MenuItem from 'app/presentation/components/items/MenuItem';
import StatusActive from 'app/presentation/components/items/StatusActive';
import { ChoseImageOptionsModal } from 'app/presentation/components/modal/ChoseImageOptionsModal';
import { getString } from 'app/presentation/localization';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Images } from 'app/presentation/theme';
import { primary } from 'app/presentation/theme/Colors';
import { CheckStatusActive, LinkNews, StatusToast } from 'app/shared/constants';
import React, { useState } from 'react';
import {
    ImageBackground,
    ImageSourcePropType,
    SafeAreaView,
    ScrollView,
    View,
} from 'react-native';
import ImagePicker, { Image as IImage } from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { settingArray } from './dataSetting';
import { styles } from './styles';
import { useGetUser } from 'app/presentation/hooks/useGetUser';
import { UploadAvatarUseCase } from 'app/domain/common/organization/UploadAvatarUseCase';
import CommonRepository from 'app/data/repository/common';
import Toast from 'react-native-toast-message';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { getProfile } from 'app/presentation/redux/actions/customer/user';
import VerifyUserEkycDataModel from 'app/models/ekyc/VerifyUserEkycDataModel';
import CustomerSelectors from 'app/presentation/redux/selectors/customer';
import { DeviceEventEmitter } from 'react-native';
import { EventActions } from 'app/shared/helper/EventEmitter';

interface Iprops {
    idTest?: string;
    avatar?: ImageSourcePropType;
}
export const HeadImage = (props: Iprops) => {
    //! State
    const { idTest, avatar } = props;
    const userData = useGetUser()?.user;

    const userName = userData.fullName || '';
    const avatarData = userData?.avatar || avatar;
    const id = userData?.cif || ''; 
    const verifyUserDataReducer: VerifyUserEkycDataModel = useSelector(
        CustomerSelectors.selectVerifyUserDataReducer,
    ).data;
    const isEkyc = Boolean(verifyUserDataReducer?.isEkyc);
    const isCheck = isEkyc;

    return (
        <ImageBackground
            source={Images.Backgrounds.BackgroundInformationVerification as any}
            resizeMode="cover"
            style={styles.imageBackground}
            // {...rest}
        >
            <View style={styles.upload}>
                {/* <TouchableOpacity
                    style={styles.touchImage}
                    onPress={onShowModal}
                > */}
                <ImageRenderer
                    source={
                        avatarData ? avatarData : Images.Icons.ProfileCircle
                    }
                    resizeMode="cover"
                    style={
                        avatar ? styles?.uploadAvt : styles?.uploadDefaultImage
                    }
                />
                {/* <Image
                        style={styles.uploadDone}
                        source={Images.Icons.UploadAvatar}
                    /> */}
                {/* </TouchableOpacity> */}
            </View>
            <TextPrimary style={styles.name}>{userName}</TextPrimary>

            <TextPrimary style={styles.id}>ID: {id}</TextPrimary>
            {isCheck ? (
                <StatusActive
                    title={getString('profileVerified')}
                    status={CheckStatusActive.GreenBackgroundWhite}
                />
            ) : (
                <StatusActive
                    title={getString('profileNotVerified')}
                    status={CheckStatusActive.RedBackgroundWhite}
                />
            )}
        </ImageBackground>
    );
};
interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'InformationAccount'>;
}
const SettingUser = (props: IProps) => {
    //! State
    const { navigation } = props;
    const [imageAvt, setImageAvt] = useState<any>();
    const [openModalImageOption, setOpenModalImageOption] = useState(false);
    const dispatch = useDispatch();
    const idTest: string = '7127812';
    //! Function

    //! Function
    const uploadAvatar = (image: IImage) => {
        LoadingManager.setLoading(true);
        new UploadAvatarUseCase(new CommonRepository(), image)
            .execute()
            .then((res) => {
                if (res?.status === 200) {
                    Toast.show({
                        type: StatusToast.Success,
                        text2: getString('uploadAvatarSuccess'),
                    });
                    dispatch(getProfile());
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([`uploadAvatarFailed`]),
                    });
                }
            })
            .catch((err) => {
                setImageAvt(null);
                Toast.show({
                    type: StatusToast.Error,
                    text2: err?.message
                        ? getString([`errors.${err?.message}`])
                        : getString(['uploadAvatarFailed']),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };
    const onPressTakeLibrary = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: false,
            mediaType: 'photo',
        })
            .then((image) => {
                setImageAvt({ image, uri: image.path });
                uploadAvatar(image);
            })
            .finally(() => {
                setOpenModalImageOption(false);
            });
    };
    const onPressTakePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            mediaType: 'photo',
        })
            .then((img) => {
                setImageAvt({ img, uri: img.path });
                uploadAvatar(img);
            })
            .finally(() => {
                setOpenModalImageOption(false);
            });
    };
    const onHideModal = () => {
        setOpenModalImageOption(false);
    };
    const onShowModal = () => {
        setOpenModalImageOption(true);
    };
    const handleClickSetting = (type: any) => {
        switch (type) {
            case 'informationAccount':
                navigation.navigate('InformationAccount');
                break;
            case 'transactionHistory':
                navigation.navigate('TransactionHistory');
                break;
            case 'interestCalculator':
                navigation.navigate('CalculateProfitStackParamList');
                break;
            case 'nearestTransactionOffice':
                navigation.navigate('MapScreen');
                break;
            case 'changeAvatar':
                onShowModal();
                break;
            case 'beneficiaryAccount':
                navigation.navigate('BeneficiaryStack');
                break;
            case 'policyAndPrivacy':
                navigation.navigate('PrivacyAndPolicy');
                break;
            case 'supportCenter':
                navigation.navigate('CenterSupport');
                break;
            case 'changePassword':
                navigation.navigate('ChangePassword');
                break;
            case 'news':
                navigation.navigate('WebViewScreen', { url: LinkNews });
                break;
            case 'settingBiometric':
                navigation.navigate('BiometricScreen');
                break;

            case 'logout':
                DeviceEventEmitter.emit(EventActions.logout);
                break;
            default:
                break;
        }
    };
    //! Render
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: 'white' }} />
            <HeadImage avatar={imageAvt} idTest={idTest} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {settingArray?.map((item, idx) => {
                    const isLastElmSettingArr =
                        idx + 1 === settingArray?.length;
                    const isFirstElmSettingArr = idx === 0;
                    return (
                        <View
                            key={idx}
                            style={[
                                styles.containerSetting,
                                {
                                    paddingBottom: isLastElmSettingArr ? 23 : 0,
                                    borderTopRightRadius: isFirstElmSettingArr
                                        ? 8
                                        : 0,
                                    borderTopLeftRadius: isFirstElmSettingArr
                                        ? 8
                                        : 0,
                                },
                            ]}
                        >
                            <TextPrimary style={styles.containerTitle}>
                                {item?.title}
                            </TextPrimary>
                            <View style={styles.containerMenuitem}>
                                {item?.childrenValue?.map((elm, index) => {
                                    const typeLogOut = elm.type === 'logout';
                                    const isLastElm =
                                        item?.childrenValue?.length - 1 ===
                                        index;
                                    return (
                                        <MenuItem
                                            show={
                                                !idTest
                                                    ? elm?.isShow
                                                    : undefined
                                            }
                                            styleTitle={
                                                isLastElm && typeLogOut
                                                    ? { color: primary.s600 }
                                                    : undefined
                                            }
                                            key={elm?.type}
                                            title={elm?.label}
                                            iconLeft={elm?.iconLeft}
                                            source={Images.Icons.VectorIcon}
                                            onPressMenuItem={() =>
                                                handleClickSetting(elm?.type)
                                            }
                                            isLastItem={isLastElm}
                                        />
                                    );
                                })}
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

            <ChoseImageOptionsModal
                onHideModal={onHideModal}
                onPressTakePhoto={onPressTakePhoto}
                onPressTakeLibrary={onPressTakeLibrary}
                onShowModal={onShowModal}
                isVisible={openModalImageOption}
            />
        </View>
    );
};

export default SettingUser;
