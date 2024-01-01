import { Dimensions } from 'app/presentation/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import Modal, { Direction } from 'react-native-modal';
import styled from 'styled-components';
import { BlurView } from '@react-native-community/blur';

export interface IBaseModalProps {
    isVisible: boolean;
    onShowModal?: () => void;
    onHideModal: () => void;
    contentContainerStyle?: any;
    containerStyle?: any;
    children?: any[] | any;
    propagateSwipe?: boolean;
    onSwipeComplete?: () => void;
    swipeDirection?: Direction | Array<Direction>;
    backdropOpacity?: number;
    hideBlurView?: boolean;
}

export interface IModalHookProps {
    isShow: boolean;
    onShow: () => void;
    onHide: () => void;
    toggleShow?: () => void;
}

export const BaseModal = React.memo((props: IBaseModalProps) => {
    const {
        children,
        containerStyle,
        contentContainerStyle,
        isVisible,
        onSwipeComplete,
        propagateSwipe = false,
        swipeDirection = 'down',
        backdropOpacity,
        hideBlurView = false,
    } = props;

    return (
        <Modal
            backdropOpacity={backdropOpacity ?? 0.2}
            useNativeDriver
            isVisible={isVisible}
            style={[styles.styleModal, containerStyle]}
            onBackdropPress={props.onHideModal}
            onModalShow={props.onShowModal}
            onSwipeComplete={onSwipeComplete}
            swipeDirection={swipeDirection}
            propagateSwipe={propagateSwipe}
        >
            {!hideBlurView && (
                <BlurView
                    style={styles.absolute}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                    onTouchStart={props.onHideModal}
                />
            )}

            <ContentView style={contentContainerStyle}>
                {/* <HolderView /> */}
                {children}
            </ContentView>
        </Modal>
    );
});

const styles = StyleSheet.create({
    styleModal: {
        justifyContent: 'flex-end',
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

const HolderView = styled.View`
    background-color: #cacfda;
    border-radius: 3;
    height: 3;
    width: 30;
    align-self: center;
    margin-bottom: ${Dimensions.Spacing.medium};
    margin-top: ${Dimensions.Spacing.medium};
`;

const ContentView = styled.View`
    background-color: white;
    align-items: center;
    /* padding-bottom: ${Dimensions.bottomPadding}; */
    align-items: stretch;
`;
