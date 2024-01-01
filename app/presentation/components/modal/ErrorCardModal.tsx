import {getString} from 'app/presentation/localization';
import {Dimensions, theme, Images} from 'app/presentation/theme';
import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import styled from 'styled-components';
import TextButton from '../button/TextButton';
import TextPrimary from '../text/TextPrimary';
import {BaseModal, IBaseModalProps} from './ModalBase';
import {useCountDown} from 'app/presentation/hooks/common';
import Utilities from 'app/shared/helper/utilities';

interface IProps extends IBaseModalProps {
    onHideModal: () => void;
    onGoScanCard: () => void;
    showChat: () => void;
}

export const ErrorCardModal = React.memo((props: IProps) => {
    const {onGoScanCard, onHideModal, showChat = () => null, ...rest} = props;
    const time = useCountDown(10);
    if(time === 0) {
        showChat();
    }
    return (
        <BaseModal
            {...rest}
            onHideModal={onHideModal}
        >
            <View />
            <View style={styles.contentContainer}>
                <Title>{getString('cardNotSupported')}</Title>
                <Image style={styles.image} resizeMode={'contain'} source={Images.Icons.addCardError} />
                <TextPrimary style={styles.content} marginTop={50}>{getString('cardErrorContent')}</TextPrimary>
            </View>
            <View>
                <TextPrimary
                    style={styles.startChatHintText}
                    marginBottom={Dimensions.Spacing.extraHuge}>
                    {getString('autoStartLiveChat') + ` ${time}s...`}
                </TextPrimary>
                <TextButton
                    title={getString('tryAgain')}
                    // @ts-ignore
                    testID={Utilities.generateTestID('modal_error_card', 'button_try_again')}
                    onPress={() => {
                        onGoScanCard();
                        onHideModal();
                    }}
                />
            </View>
        </BaseModal>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        paddingHorizontal: Dimensions.Spacing.small,
    },
    image: {
        width: 213,
        height: 153,
        alignSelf: 'center',
        marginLeft: 30
    },
    startChatHintText: {
        color: theme.color.colorSecondary,
        alignSelf: 'center',
        textAlign: 'center'
    },
    content: {
        fontSize: Dimensions.FontSize.large,
        textAlign: 'center'
    },
});

const Title = styled(TextPrimary)`
    fontSize: ${Dimensions.FontSize.huge};
    color: black;
    fontFamily: ${theme.font.Medium};
    marginBottom: 30;
`;