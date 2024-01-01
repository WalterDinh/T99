import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomerRepository from 'app/data/repository/customer';
import OtpBase from 'app/presentation/components/Otp/OtpBase';
import { getString } from 'app/presentation/localization';
import { AuthStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { OtpType, StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import React, { useRef } from 'react';
import Toast from 'react-native-toast-message';

interface IProps {
    navigation: StackNavigationProp<AuthStackParamList, 'SendOtpSignup'>;
    route: RouteProp<AuthStackParamList, 'SendOtpSignup'>;
}
const SendOtpSignup = (props: IProps) => {
    const { navigation, route } = props;
    const ref = useRef<{
        setCountDown: () => void;
        setError: (error: string) => void;
    }>(null);

    const sendOtp = async () => {
        LoadingManager.setLoading(true);
        const bodySendOtp = {
            otpType: OtpType.RegisterAccount,
            phoneNumber: route.params.phoneNumber,
        };
        await new CustomerRepository()
            .sendOtpUser(bodySendOtp)
            .then((res) => {
                if (res?.status === 200 && res?.data?.success === true) {
                    if (ref.current) {
                        ref.current.setCountDown();
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
                        'sendOTPFalse',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };
    const submitOtp = async (valueOpt: string) => {
        LoadingManager.setLoading(true);
        let body = {
            otpCode: valueOpt,
            fullName: route.params.fullName,
            email: route.params.email,
            referralCode: route.params.referralCode,
            isAgreeTerms: route.params.isAgreeTerms,
            phoneNumber: route.params.phoneNumber,
        };

        new CustomerRepository()
            .checkOtpUser(body)
            .then((res) => {
                if (res.status === 200 && res.data.success) {
                    Toast.show({
                        type: StatusToast.Success,
                        text2: getString('createAccountSuccess'),
                    });
                    navigation.navigate('SetPassword', {
                        phoneNumber: route.params.phoneNumber,
                    });
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString('verificationCodeFalse'),
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([
                        `errors.${err?.message}`,
                        'verificationCodeFalse',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };

    return (
        <OtpBase
            onSubmitOtp={submitOtp}
            onSendOtp={() => sendOtp()}
            ref={ref}
        />
    );
};

export default SendOtpSignup;
