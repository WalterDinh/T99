import { Dimensions, theme } from 'app/presentation/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import { BlurView } from '@react-native-community/blur';
import { globalViewStyles } from 'app/presentation/theme/Styles';
import TextPrimary from '../text/TextPrimary';
import { AppButton, ButtonType } from '../appbutton/AppButton';
import { getString } from 'app/presentation/localization';

export interface IConfirmModalProps {
    isVisible: boolean;
    onShowModal?: () => void;
    onHideModal: () => void;
    contentContainerStyle?: any;
    containerStyle?: any;
    children?: any[] | any;
    title?: string;
    content?: string;
    onPressRight?: () => void;
    onPressLeft?: () => void;
    textButtonLeft?: string;
    textButtonRight?: string;
}

export interface IModalHookProps {
    isShow: boolean;
    onShow: () => void;
    onHide: () => void;
    toggleShow?: () => void;
}

export const ConfirmModal = React.memo((props: IConfirmModalProps) => {
    const {
        onPressRight=()=>{},
        onPressLeft=()=>{},
        textButtonLeft,
        textButtonRight,
        title,
        containerStyle,
        contentContainerStyle,
        isVisible,
        content,
    } = props;

    return (
        <Modal
            backdropOpacity={0}
            useNativeDriver
            isVisible={isVisible}
            style={[styles.styleModal, containerStyle]}
            onBackdropPress={props.onHideModal}
            onModalShow={props.onShowModal}
        >
            <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />
            <ContentView style={contentContainerStyle}>
                <View style={styles.contentContainer}>
                    <TextPrimary style={styles.textTitle}>
                        {title || ''}
                    </TextPrimary>
                    <TextPrimary style={styles.textContent}>
                        {content || ''}
                    </TextPrimary>
                    <View style={styles.row}>
                        <AppButton
                            styleBtn={{ flex: 1, marginRight: 12 }}
                            onPress={onPressLeft}
                            type={ButtonType.SquareGraySecondary}
                            name={textButtonLeft || getString('cancel')}
                        />
                        <AppButton
                            styleBtn={{ flex: 1 }}
                            onPress={onPressRight}
                            type={ButtonType.SquareRed}
                            name={textButtonRight || getString('confirm')}
                        />
                    </View>
                </View>
            </ContentView>
        </Modal>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        width: Dimensions.screenWidth() - 32,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderRadius: 16,
        ...globalViewStyles.shadow,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
    },
    textContent: {
        fontSize: Dimensions.FontSize.large,
        textAlign: 'center',
        paddingTop: 12,
        paddingBottom: 24,
    },
    textTitle: {
        textAlign: 'center',
        color: theme.color.colorSecondary,
        fontSize: Dimensions.FontSize.extraExtraLarge,
    },
    styleModal: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 0,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

const ContentView = styled.View`
    backgroundcolor: white;
    alignitems: center;
    paddinghorizontal: ${Dimensions.Spacing.extraHuge};
    paddingbottom: ${Dimensions.bottomPadding};
    alignitems: stretch;
`;
