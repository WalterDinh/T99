import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import FormOtp from 'app/presentation/components/Otp/FormOtp';
import { useCountDown, useCountDownBackground } from 'app/presentation/hooks/common';
import { getString } from 'app/presentation/localization';
import { Dimensions, theme } from 'app/presentation/theme';
import dayjs from 'dayjs';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const pincount = 6;
const textDot = '  •  ';
interface IProps {
    onSendOtp: () => void;
    onSubmitOtp: (otp: string) => void;
}
const OtpBase = forwardRef((props: IProps, ref) => {
    const { onSendOtp, onSubmitOtp } = props;

    const [valueOpt, setValueOpt] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [timeCountDown, setTimeCountDown] = useState(60);
    useImperativeHandle(ref, () => ({
        setError: (error: string) => {
            setErrorMsg(error)
        },

        setCountDown: () => {
            setTimeCountDown(0)
            setTimeout(() => {
                setTimeCountDown(60)
            }, 1);
        }
    }));
    const isActiveBtn = valueOpt.length == pincount;

    const countDown = useCountDownBackground(timeCountDown) * 1000;

    const handleSubmit = () => {
        onSubmitOtp(valueOpt);
    };

    return (
        <View style={OtpBaseStyle.container}>
            <KeyboardAwareScrollView style={OtpBaseStyle.content}>
                <TextPrimary style={OtpBaseStyle.title}>
                    {getString('verificationCode')}
                </TextPrimary>
                <TextPrimary style={OtpBaseStyle.description}>
                    {getString('checkSmsToReceiveOtp')}
                </TextPrimary>
                <FormOtp
                    pinCount={pincount}
                    onChangeText={setValueOpt}
                />
                <TextPrimary style={OtpBaseStyle.errors}>
                    {errorMsg || ' '}
                </TextPrimary>

                <View style={OtpBaseStyle.sendBack}>
                    <TextPrimary style={OtpBaseStyle.titleSendBack}>
                        {getString('sendBackOtp')} (
                        {dayjs(countDown).format('mm:ss')}){textDot}
                    </TextPrimary>
                    <TouchableOpacity
                        disabled={countDown > 0}
                        onPress={onSendOtp}
                    >
                        <TextPrimary
                            style={[
                                OtpBaseStyle.titleSendBack,
                                !countDown
                                    ? { color: theme.color.colorPrimary }
                                    : { color: theme.color.disabledColor },
                            ]}
                        >
                            {getString('sendBack')}
                        </TextPrimary>
                    </TouchableOpacity>
                </View>

                <AppButton
                    name={getString('next')}
                    type={isActiveBtn ? undefined : ButtonType.CircleGray}
                    onPress={handleSubmit}
                    styleBtn={OtpBaseStyle.btn}
                    disabled={!isActiveBtn}
                />
            </KeyboardAwareScrollView>
        </View>
    );
});

export default OtpBase;

const OtpBaseStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant
    },
    content: {
        flex: 1,
        paddingTop: Dimensions.Spacing.extraLarge,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    title: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraHuge,
        color: theme.color.textColor,
        lineHeight: 41,
        letterSpacing: 0.35,
    },
    description: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        paddingTop: Dimensions.Spacing.medium,
        lineHeight: 22,
        letterSpacing: -0.28,
        paddingBottom: Dimensions.Spacing.huge,
    },
    errors: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
        color: theme.color.colorPrimary,
        paddingTop: Dimensions.Spacing.small,
        lineHeight: 16,
    },
    sendBack: {
        marginTop: Dimensions.moderateScale(50),
        marginBottom: Dimensions.Spacing.large,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    titleSendBack: {
        color: theme.color.textColor,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        lineHeight: 22,
        letterSpacing: -0.28,
    },

    btn: {
        marginBottom: Dimensions.bottomPadding
    },
    btnActive: {
        marginBottom: Dimensions.bottomPadding
    },
})
