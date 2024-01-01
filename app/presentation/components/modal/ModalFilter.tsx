import { getString } from 'app/presentation/localization';
import { Dimensions, theme, Images } from 'app/presentation/theme';
import React, { Children } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import TextPrimary from '../text/TextPrimary';
import { BaseModal, IBaseModalProps } from './ModalBase';
import { globalViewStyles } from 'app/presentation/theme/Styles';
import ImageRenderer from '../image/ImageRenderer';

interface IProps extends IBaseModalProps {
    onHideModal: () => void;
}

export const ModalFilter = React.memo((props: IProps) => {
    const {
        onHideModal,
        children,
        ...rest
    } = props;

    return (
        <BaseModal onSwipeComplete={onHideModal} {...rest} onHideModal={onHideModal} >
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.btnClose}
                        onPress={onHideModal}
                    >
                        <ImageRenderer
                            source={Images.Icons.Close}
                            style={styles.imgClose}
                        />
                    </TouchableOpacity>
                    <TextPrimary style={styles.textTitle}>
                        {getString('filter')}
                    </TextPrimary>
                </View>
                {children}
            </View>
        </BaseModal>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        minHeight: Dimensions.screenHeight() * 0.6,
        maxHeight:  Dimensions.screenHeight() * 0.8,
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: Dimensions.Spacing.small,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        ...globalViewStyles.shadow,
    },
    header: {
        width: '100%',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: Dimensions.FontSize.extraLarge,
        fontFamily: theme.font.Medium,
        color: theme.color.textColor,
        textAlign: 'center',
    },
    image: {
        width: 213,
        height: 153,
        alignSelf: 'center',
        marginLeft: 30,
    },
    startChatHintText: {
        color: theme.color.colorSecondary,
        alignSelf: 'center',
        textAlign: 'center',
    },
    content: {
        fontSize: Dimensions.FontSize.large,
        textAlign: 'center',
    },
    btnClose: {
        position: 'absolute',
        left: 8,
    },
    imgClose: {
        height: 24,
        width: 24,
    },
});

const Title = styled(TextPrimary)`
    fontsize: ${Dimensions.FontSize.huge};
    color: black;
    fontfamily: ${theme.font.Medium};
    marginbottom: 30;
`;
