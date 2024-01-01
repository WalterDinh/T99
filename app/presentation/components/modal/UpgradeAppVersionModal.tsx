import {AppUpgradeVersionModel, PlatformSettings} from 'app/models/common/PlatformSettings';
import {getString} from 'app/presentation/localization';
// import {selectPlatformSettings} from 'app/presentation/redux/selectors/general';
import {Dimensions, theme} from 'app/presentation/theme';
import {LinkingHelper} from 'app/shared/helper';
import Utilities from 'app/shared/helper/utilities';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter, Platform, StyleSheet} from 'react-native';
import styled from 'styled-components';
import {Column, Row, TextButton} from '..';
import TextPrimary from '../text/TextPrimary';
import {BaseModal} from './ModalBase';

interface IProps {

}

export const AppUpgradeModal = React.memo((props: IProps) => {
    // const platformSettings: PlatformSettings | undefined = useSelector(selectPlatformSettings);

    const [visible, setVisible] = useState(false);
    const [mandatory, setMandatory] = useState(false);
    const [upgradeLink, setUpgradeLink] = useState<string>();
    const [version, setVersion] = useState<string>();
    const pendingShowUpgraded = useRef<boolean>(false);

    const showModal = useCallback(() => {
        setVisible(true);
    }, [setVisible]);

    const hideModal = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener('readyToShowUpgradeApp', () => {
            if(pendingShowUpgraded.current) {
                setTimeout(() => {
                    showModal();
                }, 2000);
            }
        });
        return () => {
            subscription.remove();
        }
    }, [showModal]);

    const checkAppVersion = useCallback((appVersionUpgrade: AppUpgradeVersionModel) => {
        const {ios, android} = appVersionUpgrade;
        const upgradedVersion = Platform.select({
            ios,
            android
        })!;
        const {mandatory, upgradeLink} = upgradedVersion;
        const {neededUpdate, upgradeVersionName} = Utilities.checkAppVersion(appVersionUpgrade);
        if(neededUpdate) {
            setMandatory(mandatory);
            setUpgradeLink(upgradeLink);
            setVersion(upgradeVersionName);
            // If mandatory, show now and block users
            // Else save for later to show. When pass splash screen.
            if(mandatory) {
                showModal();
            } else {
                pendingShowUpgraded.current = true;
            }
        }
    }, [showModal, setMandatory, setUpgradeLink, setVersion]);

    const onLaterPressed = useCallback(() => {
        hideModal();
    }, [hideModal]);

    const onUpdatePressed = useCallback(() => {
        if(upgradeLink) {
            LinkingHelper.openUrl(upgradeLink);
        }
    }, [upgradeLink]);

    // useEffect(() => {
    //     if(platformSettings && platformSettings.appVersionUpgrade) {
    //         checkAppVersion(platformSettings.appVersionUpgrade);
    //     }
    // }, [platformSettings, , checkAppVersion]);

    // const appVersionUpgrade = platformSettings?.appVersionUpgrade;
    // const {ios, android} = appVersionUpgrade ?? {};
    // const upgradedVersion = Platform.select({
    //     ios,
    //     android
    // })!;

    return <BaseModal
        isVisible={visible}
        swipeDirection={mandatory ? undefined : 'down'}
        onSwipeComplete={mandatory ? undefined : hideModal}
        onHideModal={mandatory ? () => {
            //
        } : hideModal}
    >
        <Column align={'center'}>
            <Title>{getString('appUpdate')}</Title>
            {/* <Content>{upgradedVersion?.changelog ?? getString('newVersionAvailable', {
                version
            })}</Content> */}
        </Column>
        <Row style={styles.bottomRow}>
            {!mandatory ? <TextButton
                // @ts-ignore
                testID={Utilities.generateTestID('modal_upgrade_app_version', 'button_later')}
                title={getString('later')}
                onPress={onLaterPressed}
                shadow={false}
                buttonStyle={styles.buttonLater}
                titleStyle={styles.buttonLaterTitle}
                containerStyle={{marginRight: Dimensions.Spacing.medium, flex: 1}}
            /> : null}
            <TextButton
                // @ts-ignore
                testID={Utilities.generateTestID('modal_upgrade_app_version', 'button_update')}
                title={getString('update')}
                onPress={onUpdatePressed}
                buttonStyle={styles.buttonUpdate}
                titleStyle={styles.buttonUpdateTitle}
                containerStyle={{flex: 1}}
            />
        </Row>
    </BaseModal>;
});

const styles = StyleSheet.create({
    buttonLater: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.color.colorPrimary
    },
    buttonLaterTitle: {
        color: theme.color.colorPrimary
    },
    buttonUpdate: {
    },
    buttonUpdateTitle: {

    },
    bottomRow: {
        marginTop: 70
    }
});

const Title = styled(TextPrimary)`
    fontSize: ${Dimensions.moderateScale(19)};
    fontFamily: ${theme.font.Bold};
    marginBottom: ${Dimensions.Spacing.extraLarge};
`;

const Content = styled(TextPrimary)`
    fontSize: ${Dimensions.FontSize.large};
    textAlign: center;
`;