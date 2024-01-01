import { View } from 'react-native';
import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { EkycParamList } from 'app/presentation/navigation/routes/routeParams';
import { RouteProp } from '@react-navigation/native';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import Dimensions from 'app/presentation/theme/Dimensions';
import { FormSwitch } from 'app/presentation/components/switch/FormSwitch';
import CustomerKycUseCase from 'app/domain/customer/customer/CustomerKycUseCase';
import CustomerRepository from 'app/data/repository/customer';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { CustomerKycRequestModel } from 'app/models/ekyc/CustomerKycRequestModel';
import Toast from 'react-native-toast-message';
import { DateTimeFormat, StatusToast } from 'app/shared/constants';
import { ImageRenderer } from 'app/presentation/components';
import { useDispatch } from 'react-redux';
import {
    getProfile,
    getUserDataRequest,
} from 'app/presentation/redux/actions/customer/user';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalSelector from 'app/presentation/components/modal/ModalPicker';
import { ModalDatePicker } from 'app/presentation/components/modal/ModalDatePicker';
import dayjs from 'dayjs';
interface IProps {
    navigation: StackNavigationProp<EkycParamList, 'VerificationEkycResults'>;
    route: RouteProp<EkycParamList, 'VerificationEkycResults'>;
}
const dataGender = [
    { label: getString('male'), value: 1 },
    { label: getString('female'), value: 0 },
];
const VerificationResultsScreen = (props: IProps) => {
    const { route, navigation } = props;
    const { infoResult, compareResult, portraitImage } = route?.params;
    const dispatch = useDispatch();
    const [value, setValue] = useState(false);
    const isMatch = compareResult?.msg === 'MATCH';
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState({ label: '', value: -1 });
    const [expirationDate, setExpirationDate] = useState('');
    const [isVisible, setVisible] = useState(false);
    const [isShowDatePicker, setShowDatePicker] = useState(false);
    // console.log('infoResult', infoResult.post_code);

    const onHandleButton = () => {
        if (!isMatch) return navigation.goBack();

        const data = new CustomerKycRequestModel();
        data.birthOfDay = infoResult?.birth_day || '';
        data.validDate = infoResult?.issue_date || '';
        if (!!infoResult?.gender?.replace('-', '')) {
            data.gender = infoResult?.gender
                ?.toLocaleUpperCase()
                .includes('NAM')
                ? 1
                : 0;
        } else {
            if (gender.value === -1) {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString('genderIsRequire'),
                });
                return;
            }
            data.gender = gender.value;
        }
        if (!!infoResult?.valid_date?.replace('-', '')) {
            data.expiredDate =
                !!infoResult.valid_date && infoResult?.valid_date.length >= 6
                    ? infoResult?.valid_date
                    : '';
        } else {
            if (expirationDate == '') {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString('validDateIsRequire'),
                });
                return;
            }
            data.expiredDate = expirationDate;
        }
        LoadingManager.setLoading(true);
        data.isKyc = true;
        data.isSameRegistration = false;
        data.issuedBy = infoResult?.issue_place ?? '';
        data.name = infoResult?.name ?? '';
        data.numberIdentityDoc = infoResult.id ?? '';
        data.apartmentNumberRegistration = value
            ? infoResult?.recent_location ?? ''
            : address;
        data.originLocation = infoResult?.recent_location ?? '';
        data.typeIdentityDoc = infoResult?.card_type ?? '';
        data.avatar = portraitImage ?? '';
        data.nationality = infoResult?.nationality ?? '';

        new CustomerKycUseCase(new CustomerRepository(), data)
            .execute()
            .then((res) => {
                // console.log('resresresresres', res);
                if (res?.status === 200 && res?.data?.success) {
                    navigation.popToTop();
                    dispatch(getProfile());
                    dispatch(getUserDataRequest());
                    navigation.navigate('EkycSuccess');
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: res?.data?.message?.includes('MSG')
                            ? getString([
                                  `errors.${res?.data?.message}`,
                                  'errorMessageCommon',
                              ])
                            : res?.data?.message,
                    });
                }
            })
            .catch((error) => {
                // console.log('errorerrorerror', error);
                Toast.show({
                    type: StatusToast.Error,
                    text2: error?.data?.message?.includes('MSG')
                        ? getString([
                              `errors.${error?.data?.message}`,
                              'errorMessageCommon',
                          ])
                        : error?.data?.message,
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        margin: 16,
                        borderRadius: 8,
                        paddingVertical: 12,
                    }}
                >
                    {/* <ImageRenderer
                        style={{
                            width: 50,
                            height: 50,
                            alignSelf: 'center',
                            borderRadius: 25,
                        }}
                        resizeMode="cover"
                        source={{ uri: portraitImage }}
                    /> */}
                    <CommonCard
                        disabled
                        dataCard={[
                            {
                                title: getString('fullname'),
                                value: infoResult?.name,
                            },
                            {
                                title: getString('gender'),
                                value:
                                    infoResult?.gender?.replace('-', '') ||
                                    gender.label ||
                                    getString('select'),
                                onPressValue: !!infoResult?.gender?.replace(
                                    '-',
                                    '',
                                )
                                    ? undefined
                                    : () => {
                                          setVisible(true);
                                      },
                            },
                            {
                                title: getString('dob'),
                                value: infoResult?.birth_day,
                            },
                        ]}
                    />
                </View>

                <View style={{ backgroundColor: 'white' }}>
                    <CommonCard
                        disabled
                        dataCard={[
                            {
                                title: getString('liveness'),
                                value: compareResult?.msg,
                            },
                            {
                                title: getString('resultsCompare'),
                                value: compareResult?.result,
                            },

                            {
                                title: getString('cardType'),
                                value: infoResult?.card_type,
                            },
                            {
                                title: getString('idCard'),
                                value: infoResult?.id,
                            },
                            {
                                title: getString('issueDate'),
                                value: infoResult?.issue_date,
                            },
                            {
                                title: getString('expirationDate'),
                                value:
                                    infoResult?.valid_date?.replace('-', '') ||
                                    expirationDate ||
                                    getString('select'),
                                onPressValue: infoResult?.valid_date?.replace(
                                    '-',
                                    '',
                                )
                                    ? undefined
                                    : () => {
                                          setShowDatePicker(true);
                                      },
                            },
                            {
                                title: getString('nationality'),
                                value:
                                    infoResult?.nationality?.replace('-', '') ||
                                    'Việt Nam',
                            },
                            {
                                title: getString('validPlace'),
                                value: infoResult?.issue_place,
                            },
                            {
                                title: getString('recentLocation'),
                                value: infoResult?.recent_location,
                            },
                        ]}
                    />
                    <FormSwitch
                        title={`${getString('contactsAddress')}:`}
                        label={getString(
                            value
                                ? 'contactsAddressLabel'
                                : 'contactsAddressLabel2',
                        )}
                        valueInput={!value ? address : ''}
                        labelStyle={!value ? { color: '#D9D9D9' } : undefined}
                        onChangeText={setAddress}
                        value={value}
                        isInput
                        style={{
                            paddingHorizontal: Dimensions.moderateScale(22),
                        }}
                        onValueChange={(data) => setValue(data)}
                    />

                    <View
                        style={{
                            margin: Dimensions.Spacing.larger,
                            marginBottom:
                                Dimensions.Spacing.larger +
                                Dimensions.bottomPadding,
                        }}
                    >
                        <AppButton
                            onPress={onHandleButton}
                            name={getString(isMatch ? 'done' : 'reVerify')}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <ModalSelector
                visible={isVisible}
                data={dataGender}
                onModalClose={() => setVisible(false)}
                labelExtractor={(elm) => elm.label}
                onChange={setGender}
            />
            <ModalDatePicker
                date={new Date()}
                minimumDate={new Date()}
                onShowModal={() => setShowDatePicker(true)}
                onCloseModal={() => setShowDatePicker(false)}
                isVisible={isShowDatePicker}
                onSelectDate={(date) =>
                    setExpirationDate(
                        dayjs(date).format(DateTimeFormat.FullDateForwardSlash),
                    )
                }
            />
        </View>
    );
};

export default VerificationResultsScreen;
