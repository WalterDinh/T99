import { Platform, View } from 'react-native';
import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { EkycParamList } from 'app/presentation/navigation/routes/routeParams';
import { BackgroundImage, TextPrimary } from 'app/presentation/components';
import Images from 'app/assets/images/index';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { styles } from './styles';
import { NativeModules } from 'react-native';
import { KeyIntentConstants } from 'app/config/ekycKey';
import { EkycVnptResultsModel } from 'app/models/ekyc/EkycVnptResultsModel';
import { getConfig } from 'app/config/index';
import LoadingManager from 'app/shared/helper/LoadingManager';
import i18next from 'i18next';
import { Convert } from 'app/models/ekyc/EkycVnptResultsModel';
import Toast from 'react-native-toast-message';
import { StatusToast } from 'app/shared/constants';

const EkycModule = NativeModules.VnptEkycModule;

interface IProps {
    navigation: StackNavigationProp<EkycParamList, 'EkycOnboarding'>;
}

const listButton = [
    {
        type: 'cmnd',
        title: getString('identityCard'),
        icon: Images.Icons.IconFingerPrint,
    },
    {
        type: 'cccd',
        title: getString('citizenIDWithChip'),
        icon: Images.Icons.IconCardOutlined,
    },
    {
        type: 'hochieu',
        title: getString('passport'),
        icon: Images.Icons.IconQRCode,
    },
];

const SelectDocumentVerification = (props: IProps) => {
    const { navigation } = props;
    const [documentType, setDocumentType] = useState<
        'cmnd' | 'cccd' | 'hochieu' | null
    >(null);

    const startCheckingLiveness = () => {
        let type = 1;
        switch (documentType) {
            case 'cmnd':
                type = 1;
                break;
            case 'cccd':
                type = 2;
                break;
            case 'hochieu':
                type = 3;
                break;
            default:
                type = 1;
                break;
        }
        const configs = getConfig();
        if (!configs) return false;
        const data = {
            [KeyIntentConstants.ACCESS_TOKEN]: configs.accessTokenEkycVnpt,
            [KeyIntentConstants.TOKEN_ID]: configs.tokenIdEkycVnpt,
            [KeyIntentConstants.TOKEN_KEY]: configs.tokenKeyEkycVnpt,
            [KeyIntentConstants.SHOW_RESULT]: false,
            [KeyIntentConstants.SHOW_SWITCH]: true,
            [KeyIntentConstants.IS_SHOW_HELP]: true,
            [KeyIntentConstants.VERSION_SDK]: 1,
            [KeyIntentConstants.DOCUMENT_TYPE]: type,
            [KeyIntentConstants.SELECT_DOCUMENT]: false,
            [KeyIntentConstants.CHANGE_THEME]: true,
            [KeyIntentConstants.CHECK_LIVENESS_CARD]: true,
            [KeyIntentConstants.LIVENESS_FACE]: true,
            [KeyIntentConstants.CHECK_MASKED_FACE]: true,
            [KeyIntentConstants.CHANGE_COLOR]: '#a94949',
            [KeyIntentConstants.CHANGE_TEXT_COLOR]: '#a94949',
            [KeyIntentConstants.LANGUAGE]:
                i18next.language == 'en' ? 'en' : 'vi',
        };
        Platform.OS == 'android' && LoadingManager.setLoading(true);
        EkycModule?.startChecking(data)
            .then((data: EkycVnptResultsModel) => {
                const {
                    INFO_RESULT,
                    COMPARE_RESULT,
                    PORTRAIT_IMAGE,
                    MASKED_FACE_RESULT,
                } = data;

                const isDataString =
                    Platform.OS == 'android' && typeof INFO_RESULT == 'string';
                const maskedFaceResult =  typeof MASKED_FACE_RESULT == 'string'
                    ? Convert.toInfoResultModel(MASKED_FACE_RESULT)
                    : MASKED_FACE_RESULT || {};

                const infoResult = isDataString
                    ? Convert.toInfoResultModel(INFO_RESULT as string)
                    : INFO_RESULT || {};
                const compareResult = isDataString
                    ? Convert.toCompareResultModel(COMPARE_RESULT as string)
                    : COMPARE_RESULT || {};
                if (maskedFaceResult?.object?.masked === 'yes') {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString('checkMaskedFace'),
                    });
                    LoadingManager.setLoading(false);
                    return;
                }
                if (!!data && !!compareResult) {
                    if (
                        compareResult?.statusCode === 200 &&
                        !!infoResult?.object &&
                        !!compareResult?.object
                    ) {
                        navigation.navigate('VerificationEkycResults', {
                            infoResult: infoResult?.object,
                            compareResult: compareResult?.object,
                            portraitImage:
                                Platform.OS == 'android'
                                    ? `file://${PORTRAIT_IMAGE}`
                                    : PORTRAIT_IMAGE,
                        });
                    } else {
                        Toast.show({
                            type: StatusToast.Error,
                            text2: infoResult?.message?.includes('IDG')
                                ? getString([
                                      `errorsEkyc.${infoResult?.message}`,
                                      'errorMessageCommon',
                                  ])
                                : !!infoResult?.errors
                                ? infoResult?.errors[0]
                                : getString('errorMessageCommon'),
                        });
                    }
                }
                LoadingManager.setLoading(false);
            })
            .catch((err: any) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString('errorMessageCommon'),
                });
                LoadingManager.setLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <BackgroundImage source={Images.Backgrounds.Background}>
                <View style={styles.contentContainer}>
                    <View>
                        <TextPrimary style={styles.title}>
                            {getString('verifyDocument')}
                        </TextPrimary>
                        <TextPrimary style={styles.subTitle}>
                            {getString('selectDocumentEkycSubTitle')}
                        </TextPrimary>
                        {listButton.map(
                            (elm: { icon: any; title: string; type: any }) => {
                                const isActive = elm.type === documentType;
                                return (
                                    <AppButton
                                        key={elm.title}
                                        iconStyle={styles.icon}
                                        textStyle={[
                                            styles.txtStyle,
                                            isActive && styles.txtStyleActive,
                                        ]}
                                        styleBtn={[
                                            styles.btnStyle,
                                            isActive && styles.btnStyleActive,
                                        ]}
                                        iconLeft={elm.icon}
                                        iconRight={
                                            isActive
                                                ? Images.Icons.CheckMarkNoBorder
                                                : undefined
                                        }
                                        name={elm.title}
                                        type={ButtonType.SquareBorderGray}
                                        onPress={() => {
                                            setDocumentType(elm.type);
                                        }}
                                    />
                                );
                            },
                        )}
                    </View>
                    <AppButton
                        disabled={documentType == null}
                        onPress={startCheckingLiveness}
                        name={getString('next')}
                        type={
                            documentType == null
                                ? ButtonType.CircleBorderGray
                                : ButtonType.CircleBorderRed
                        }
                    />
                </View>
            </BackgroundImage>
        </View>
    );
};

export default SelectDocumentVerification;
