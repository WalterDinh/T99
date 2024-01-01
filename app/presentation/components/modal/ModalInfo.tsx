import {getString} from 'app/presentation/localization';
import {Dimensions, theme} from 'app/presentation/theme';
import Utilities from 'app/shared/helper/utilities';
import React from 'react';
import {ViewStyle} from 'react-native';
import styled from 'styled-components';
import TextButton from '../button/TextButton';
import TextPrimary from '../text/TextPrimary';
import {BaseModal, IBaseModalProps} from './ModalBase';

interface IProps extends IBaseModalProps {
    onButtonPress?: () => void;
    title: string;
    subTitle: string;
    styleButton?: ViewStyle;
    titleStyle?: any;
    subtitleStyle?: any;
    supportText?: string;
    buttonText?: string;
    SubtitleComponent?: React.ReactElement;
}

export const InfoModal = React.memo((props: IProps) => {
    const {onButtonPress, styleButton, buttonText, titleStyle, subtitleStyle, subTitle, title,
        SubtitleComponent, ...rest} = props;

    let subtitleContent = subTitle ? <SubTitle style={subtitleStyle}>
        {subTitle}
    </SubTitle> : null;

    if(SubtitleComponent) {
        subtitleContent = SubtitleComponent;
    }

    return (
        <BaseModal
            {...rest}
        >
            <Title style={titleStyle}>
                {title}
            </Title>
            {subtitleContent}
            <TextButton
                // @ts-ignore
                testID={Utilities.generateTestID('modal_info', 'button_got_it')}
                onPress={() => {
                    props.onHideModal();
                    onButtonPress?.();
                }}
                buttonStyle={styleButton}
                title={buttonText || ''}
            />
        </BaseModal>
    );
});

const Title = styled(TextPrimary)`
    fontSize: ${Dimensions.FontSize.extraExtraLarge};
    marginBottom: ${Dimensions.Spacing.extraHuge};
`;

const SubTitle = styled(TextPrimary)`
    fontSize: ${Dimensions.FontSize.large};
    fontFamily: ${theme.font.Medium};
    color: black;
    textAlign: center;
    alignSelf: center;
    marginBottom: ${Dimensions.Spacing.extraHuge};
`;