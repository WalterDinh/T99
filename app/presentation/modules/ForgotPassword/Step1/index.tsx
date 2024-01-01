import { StackNavigationProp } from '@react-navigation/stack';
import CustomerRepository from 'app/data/repository/customer';
import { CheckEkycByPhoneUseCase } from 'app/domain/customer/auth/CheckEkycByPhoneUseCase';
import {
    BackgroundImage,
    Input,
    TextPrimary,
} from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { ForgotPasswordStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Dimensions } from 'app/presentation/theme';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import Validators from 'app/shared/helper/validators';
import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import Img from '../../../../assets/images';
import { forgotPasswordStyle } from '../styles';

interface IProps {
    navigation: StackNavigationProp<
        ForgotPasswordStackParamList,
        'ForgotPasswordStep1'
    >;
}
const ForgotPassword = (props: IProps) => {
    const { navigation } = props;
    const [valueInput, setValueInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const isActiveBtn = valueInput != '';

    const handleSubmit = () => {
        if (Validators.isPhoneValid(valueInput)) {
            LoadingManager.setLoading(true);
            new CheckEkycByPhoneUseCase(new CustomerRepository(), {
                phoneNumber: valueInput,
            })
                .execute()
                .then((res) => {                    
                    if (res === 1) {
                        //had ekyc
                        navigation.navigate('ForgotPasswordHaveEkyc', {
                            phoneNumber: valueInput,
                        });
                        return;
                    }
                    if (res === 0) {
                        //is not ekyc
                        navigation.navigate('ForgotPasswordStep2', {
                            phoneNumber: valueInput,
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
        } else {
            setErrorMsg(getString('phoneNumberInValid'));
        }
    };
    return (
        <View style={forgotPasswordStyle.container}>
            <BackgroundImage source={Img.Backgrounds.Background}>
                <View style={forgotPasswordStyle.content}>
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <TextPrimary style={forgotPasswordStyle.title}>
                            {getString('forgotPassword')}
                        </TextPrimary>

                        <TextPrimary style={forgotPasswordStyle.description}>
                            {getString('enterThePhoneNumber')}
                        </TextPrimary>
                        <View style={{ flex: 1 }}>
                            <Input
                                keyboardType="numeric"
                                onChangeText={setValueInput}
                                label={getString('phoneNumber')}
                                placeholder={getString(
                                    'phoneNumberPlaceholder',
                                )}
                                labelStyle={{
                                    paddingTop: Dimensions.Spacing.extraLarge,
                                }}
                                isRequire
                                isFocus
                                errorMessage={errorMsg}
                            />
                        </View>
                    </KeyboardAwareScrollView>
                    <AppButton
                        name={getString('submit')}
                        type={isActiveBtn ? undefined : ButtonType.CircleGray}
                        onPress={handleSubmit}
                        styleBtn={forgotPasswordStyle.btn}
                        disabled={!isActiveBtn}
                    />
                </View>
            </BackgroundImage>
        </View>
    );
};

export default ForgotPassword;
