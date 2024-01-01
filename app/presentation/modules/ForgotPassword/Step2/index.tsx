import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomerRepository from 'app/data/repository/customer';
import OtpBase from 'app/presentation/components/Otp/OtpBase';
import { getString } from 'app/presentation/localization';
import { ForgotPasswordStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { OtpType, StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import React, { useRef } from 'react';
import Toast from 'react-native-toast-message';

interface IProps {
    navigation: StackNavigationProp<
        ForgotPasswordStackParamList,
        'ForgotPasswordStep2'
    >;
    route: RouteProp<ForgotPasswordStackParamList, 'ForgotPasswordStep2'>;
}
const VerifyOtp = (props: IProps) => {
    const { navigation, route } = props;
    const ref = useRef<{
        setCountDown: () => void;
        setError: (error: string) => void;
    }>(null);

    const setError = (error: string) => {
        ref.current?.setError(error);
    };
    const sendOtp = () => {
        LoadingManager.setLoading(true);
        new CustomerRepository()
            .sendOTP({
                otpType: OtpType.ForgotPassword,
                phoneNumber: route.params.phoneNumber,
            })
            .then((res) => {
                if (res?.status === 200 && res?.data?.success === true) {
                    if (ref.current) {
                        ref.current.setCountDown();
                        setError('');
                    } else {
                        Toast.show({
                            type: StatusToast.Error,
                            text2: getString('errorMessageCommon'),
                        });
                    }
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `errors.${res?.data?.message}`,
                            'errorMessageCommon',
                        ]),
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([
                        `errors.${err?.message}`,
                        'errorMessageCommon',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };

    const submitOtp = (valueOpt: string) => {
        LoadingManager.setLoading(true);
        new CustomerRepository()
            .checkOTP({
                otpType: OtpType.ForgotPassword,
                phoneNumber: route.params.phoneNumber,
                otpCode: +valueOpt,
            })
            .then((res) => {
                if (res?.status === 200 && res?.data?.success === true) {
                    setError('');
                    navigation.navigate('ForgotPasswordStep3', {
                        phoneNumber: route.params.phoneNumber,
                        fullName: route.params?.fullName || '',
                        identityNumber: route.params?.identityNumber || '',
                    });
                } else {
                    setError(getString('otpIncorrect'));
                    // Toast.show({
                    //     type: StatusToast.Error,
                    //     text2:getString([`errors.${res?.data?.message}`, 'errorMessageCommon']),
                    // });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([
                        `errors.${err?.message}`,
                        'errorMessageCommon',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };
    return <OtpBase onSubmitOtp={submitOtp} onSendOtp={sendOtp} ref={ref} />;
};

export default VerifyOtp;
