import { Dimensions, Images, theme } from 'app/presentation/theme';
import {
    ErrorMessage,
    FieldInputProps,
    FieldMetaProps,
    FormikProps,
} from 'formik';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import ModalSelectorAsset from '../modal/ModalPickerAsset';
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
    borderBottomColor?: string;
    onChangeExtractor?: (item: { key: string; label: string }) => void;
    onChangeSearchText?: (text: string) => void;
    assetGroup?: { key: string; label: string };
    changeAssetType?: boolean;
}

export const DropdownInputAsset = React.memo((props: IPropsInputDropdown) => {
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
        form,
        onChangeExtractor,
        paddingBottom,
        borderBottomColor,
        assetGroup,
        changeAssetType,
    } = props;
    const [isVisible, setVisible] = useState(false);
    const { errors, touched, setFieldValue, setFieldTouched } = form || {};
    const { value: valueForm, name: nameForm } = field || {};
    const haveValue = value === null ? false : !!value || !!valueForm;
    const [listAsset, setListAsset] = useState([]);
    const onOpenDropdown = () => {
        setVisible(true);
        onPress && onPress();
    };

    return (
        <ViewContainer style={style} onPress={onOpenDropdown}>
            {typeof label === 'string' && (
                <TextPrimary style={[styles.label]}>
                    {label}{' '}
                    {isRequire && (
                        <TextPrimary style={{ color: 'red' }}>*</TextPrimary>
                    )}
                </TextPrimary>
            )}
            <ContentRow>
                <ValueText
                    style={[
                        haveValue ? styles.text : styles.placeholder,
                        textStyle,
                        {
                            paddingBottom: paddingBottom,
                            borderBottomColor: borderBottomColor,
                        },
                    ]}
                >
                    {haveValue
                        ? value?.productName || valueForm?.productName
                        : placeholder}
                </ValueText>
                <Icon resizeMode={'contain'} source={Images.Icons.AngleDown} />
            </ContentRow>
            {field && form && nameForm ? (
                <ErrorMessage name={nameForm}>
                    {(message: string) => <ErrorText>{message}</ErrorText>}
                </ErrorMessage>
            ) : errorMessage ? (
                <ErrorText>{errorMessage}</ErrorText>
            ) : null}
            <ModalSelectorAsset
                visible={isVisible}
                onModalClose={() => setVisible(false)}
                labelExtractor={(elm) => elm.label}
                initValue={value?.label}
                idExtractor={(elm) => elm.value}
                onChange={(item) => {
                    setFieldValue && nameForm && setFieldValue(nameForm, item);
                    onChangeExtractor && onChangeExtractor(item);
                }}
                showSearch={true}
                assetGroup={assetGroup}
                changeAssetType={changeAssetType}
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
