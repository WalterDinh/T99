import { TextPrimary } from 'app/presentation/components'
import { AppButton, ButtonType } from 'app/presentation/components/appbutton/AppButton'
import { getString } from 'app/presentation/localization'
import { Dimensions, theme } from 'app/presentation/theme'
import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';

interface IProps {
    onOK: (signature: string) => void;
}

const index = (props: IProps) => {
    const { onOK } = props;

    const ref = useRef<SignatureViewRef>(null);
    const [showTextInSign, setShowTextInSign] = useState(true);

    const handleOK = (signature: string) => {
        onOK(signature);
    };
    const handleBegin = () => {
        setShowTextInSign(false);
    }
    const handleClear = () => {
        ref.current?.clearSignature();
        setShowTextInSign(true);
    };
    const onSubmit = () => {
        ref.current?.readSignature();
    }

    const style = `
    .m-signature-pad { box-shadow: none; border: none; } 
    .m-signature-pad--body { border: none; }
    .m-signature-pad--footer { display: none; margin: 0px}
    body,html {
      width: 100%; height: 100%;
    }
  `;

    return (
        <>
            <View style={styles.content}>
                <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} autoClear={true} onBegin={handleBegin} />
                {showTextInSign && <TextPrimary style={styles.textInSign}>{getString('pleaseSignHere')}</TextPrimary>}
            </View>
            <AppButton name={getString('resign')} type={ButtonType.CircleBorderRed} onPress={handleClear} />
            <AppButton name={getString('confirm')} styleBtn={styles.btnStyle} onPress={onSubmit} />
        </>
    )
}

export default index

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
})