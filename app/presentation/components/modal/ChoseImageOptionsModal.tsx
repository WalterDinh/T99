import {Dimensions, theme} from 'app/presentation/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import {TextPrimary} from 'app/presentation/components';
import {getString} from 'app/presentation/localization';

interface IProps {
    isVisible: boolean;
    onShowModal?: () => void;
    onHideModal: () => void;
    onPressTakePhoto: () => void;
    onPressTakeLibrary: () => void;
}

export const ChoseImageOptionsModal = React.memo((props: IProps) => {
    const {
        onPressTakePhoto = () => null,
        onPressTakeLibrary = () => null
    } = props;

    return (
        <Modal
            style={styles.styleModal}
            isVisible={props.isVisible}
            onBackdropPress={props.onHideModal}
            onSwipeComplete={props.onHideModal}
            swipeDirection="down"
            propagateSwipe={true}
        >

            <ContentView>
                <Title>{getString('selectImage')}</Title>
                <TouchableOpacity onPress={onPressTakePhoto} style={styles.optionsSection}>
                    <Description>
                        {getString('takePhoto')}
                    </Description>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressTakeLibrary} style={styles.optionsSection}>
                    <Description>
                        {getString('takeFromLib')}
                    </Description>
                </TouchableOpacity>
            </ContentView>

        </Modal>
    );
});

const styles = StyleSheet.create({
    styleModal: {
        paddingHorizontal: Dimensions.Spacing.large
    },
    btnOk: {
        borderRadius: 25,
        paddingVertical: Dimensions.Spacing.medium,
        width: Dimensions.screenWidth() - (150 * 2),
    },
    optionsSection: {
        width: '100%'
    }
});

const ContentView = styled.View`
    backgroundColor: white;
    alignItems: center;
    paddingHorizontal: ${Dimensions.Spacing.extraHuge};
    borderRadius: 25;
    paddingVertical: ${Dimensions.Spacing.extraHuge};
`;

const Description = styled(TextPrimary)`
    fontSize: ${Dimensions.FontSize.large};
    fontFamily: ${theme.font.Regular};
    color: black;
    textAlign: left;
    marginBottom: ${Dimensions.moderateScale(16)};
`;

const Title = styled(TextPrimary)`
    fontSize: ${Dimensions.FontSize.huge};
    fontFamily: ${theme.font.Medium};
    color: black;
    alignSelf: flex-start;
    marginBottom: ${Dimensions.moderateScale(16)};
`;