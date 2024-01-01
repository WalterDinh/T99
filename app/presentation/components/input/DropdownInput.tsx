import { Colors, Dimensions, Images, theme } from 'app/presentation/theme';
import {
    ErrorMessage,
    FieldInputProps,
    FieldMetaProps,
    FormikProps,
} from 'formik';
import React, { useState } from 'react';
import { StyleProp, StyleSheet } from 'react-native';
import styled from 'styled-components';
import ModalSelector from '../modal/ModalPicker';
import TextPrimary from '../text/TextPrimary';
import { IAppInputProps } from './Input';

export interface IPropsInputDropdown<V = any, FormValues = any>
    extends IAppInputProps {
    placeholder: string;
    value: { key: string; label: string } | any;
    errorMessage?: string;
    onPress: () => void;
    style?: any;
    textStyle?: any;
    label: string;
    isRequire?: boolean;
    name?: string;
    field?: FieldInputProps<V>;
    form?: FormikProps<FormValues>;
    meta?: FieldMetaProps<V>;
    paddingBottom?: number;
    optionStyle?: StyleProp<any>;
    borderBottomColor?: string;
    data?: { key: string; label: string }[];
    onChangeExtractor?: (item: { key: string; label: string }) => void;
    disabled?: boolean;
}

export const DropdownInput = React.memo((props: IPropsInputDropdown) => {
    const {
        placeholder,
        value,
        onPress,
        style,
        errorMessage,
        textStyle,
        label,
        isRequire,
        field,
        optionStyle,
        form,
        onChangeExtractor,
        data,
        paddingBottom,
        borderBottomColor,
        disabled,
    } = props;
    const [isVisible, setVisible] = useState(false);
    const { errors, touched, setFieldValue, setFieldTouched } = form || {};
    const { value: valueForm, name: nameForm } = field || {};
    const haveValue = value === null ? false : !!value || !!valueForm;
    const onOpenDropdown = () => {
        setVisible(true);
        onPress && onPress();
    };

    return (
        <ViewContainer
            disabled={disabled}
            style={[style]}
            onPress={onOpenDropdown}
        >
            {typeof label === 'string' && (
                <TextPrimary style={[styles.label]}>
                    {label}{' '}
                    {isRequire && (
                        <TextPrimary style={{ color: 'red' }}>*</TextPrimary>
                    )}
                </TextPrimary>
            )}
            <ContentRow style={disabled && { borderBottomColor: '#C4C4C4' }}>
                <ValueText
                    style={[
                        haveValue ? styles.text : styles.placeholder,
                        textStyle,
                        disabled && { opacity: 0.6 },
                        {
                            paddingBottom: paddingBottom,
                            borderBottomColor: borderBottomColor,
                        },
                    ]}
                >
                    {haveValue ? value?.label || valueForm?.label : placeholder}
                </ValueText>
                {!disabled && (
                    <Icon
                        resizeMode={'contain'}
                        source={Images.Icons.AngleDown}
                    />
                )}
            </ContentRow>
            {field && form && nameForm ? (
                <ErrorMessage name={nameForm}>
                    {(message: string) => <ErrorText>{message}</ErrorText>}
                </ErrorMessage>
            ) : errorMessage ? (
                <ErrorText>{errorMessage}</ErrorText>
            ) : null}
            <ModalSelector
                visible={isVisible}
                data={data}
                onModalClose={() => setVisible(false)}
                labelExtractor={(elm) => elm.label}
                optionStyle={optionStyle}
                initValue={value?.label}
                onChange={(item) => {
                    setFieldValue && nameForm && setFieldValue(nameForm, item);
                    onChangeExtractor && onChangeExtractor(item);
                }}
            />
        </ViewContainer>
    );
});

const styles = StyleSheet.create({
    placeholder: {
        color: theme.color.disabledColor,
        paddingVertical: 8,
        fontSize: Dimensions.FontSize.extraLarge,
    },
    text: {
        color: theme.color.textColor,
        paddingVertical: 8,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraLarge,
    },
    label: {
        color: theme.color.labelColor,
        fontFamily: theme.font.Bold,
        fontSize: Dimensions.FontSize.medium,
        backgroundColor: 'white',
        paddingTop: Dimensions.Spacing.small,
    },
});

const ViewContainer = styled.TouchableOpacity`
    /* paddingvertical: ${Dimensions.Spacing.small}; */
    padding-top: ${Dimensions.Spacing.small};
    padding-bottom: ${Dimensions.Spacing.small};
`;

const ContentRow = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1;
    border-color: ${theme.color.colorSecondary};
    background-color: white;
    padding-bottom: ${Dimensions.Spacing.small};
`;

const ValueText = styled(TextPrimary)`
    font-size: ${Dimensions.FontSize.large};
    margin-right: ${Dimensions.Spacing.small};
    font-family: ${theme.font.Medium};
    flex: 1;
`;

const Icon = styled.Image`
    width: 8;
    height: 4;
`;

const ErrorText = styled(TextPrimary)`
    color: ${theme.color.errorColor};
    margin-top: ${Dimensions.Spacing.tiny};
    font-size: ${Dimensions.moderateScale(12)};
`;
