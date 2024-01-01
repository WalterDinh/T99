import { StackNavigationProp } from '@react-navigation/stack';
import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Colors, Dimensions, theme } from 'app/presentation/theme';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SignatureScreen, {
    SignatureViewRef,
} from 'react-native-signature-canvas';

interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'SignContract'>;
    route: any;
}

const SignContractScreen = (props: IProps) => {
    const { navigation, route } = props;
    const onOK = (signature: string) => null;

    const ref = useRef<SignatureViewRef>(null);
    const [showTextInSign, setShowTextInSign] = useState(true);

    const handleOK = (signature: string) => {
        onOK(signature);
    };
    const handleBegin = () => {
        setShowTextInSign(false);
    };
    const handleClear = () => {
        ref.current?.clearSignature();
        setShowTextInSign(true);
    };
    const onSubmit = () => {
        ref.current?.readSignature();
    };

    const style = `
    .m-signature-pad { box-shadow: none; border: none; } 
    .m-signature-pad--body { border: none; }
    .m-signature-pad--footer { display: none; margin: 0px}
    body,html {
      width: 100%; height: 100%;
    }
  `;

    return (
        <View style={{ backgroundColor: Colors.neutral.white, flex: 1 }}>
            <View style={styles.content}>
                <SignatureScreen
                    ref={ref}
                    onOK={handleOK}
                    webStyle={style}
                    autoClear={true}
                    onBegin={handleBegin}
                />
                {showTextInSign && (
                    <TextPrimary style={styles.textInSign}>
                        {getString('pleaseSignHere')}
                    </TextPrimary>
                )}
            </View>
            <View style={{ marginHorizontal: Dimensions.moderateScale(22) }}>
                <AppButton
                    name={getString('confirm')}
                    onPress={() => {
                        navigation.navigate('RequestSuccessContract');
                    }}
                />
                <AppButton
                    styleBtn={styles.btnStyle}
                    name={getString('resign')}
                    type={ButtonType.CircleBorderRed}
                    onPress={handleClear}
                />
            </View>
        </View>
    );
};

export default SignContractScreen;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: Dimensions.Spacing.large,
        marginBottom: Dimensions.Spacing.extraLarge,
        borderColor: theme.color.borderColor,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Dimensions.moderateScale(22),
    },
    textInSign: {
        position: 'absolute',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraLarge,
        color: theme.color.labelColor,
    },
    textArea: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        textAlign: 'center',
        color: theme.color.labelColor,
        fontFamily: theme.font.Regular,
    },
    btnStyle: {
        marginTop: Dimensions.Spacing.large,
        marginBottom: Dimensions.bottomPadding,
    },
});
