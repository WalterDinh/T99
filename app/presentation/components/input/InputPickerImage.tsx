import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Input, { IProps } from './Input';
import { ErrorMessage, FieldProps } from 'formik';
import TextPrimary from '../text/TextPrimary';
import DocumentPickerCommon from '../picker/DocumentPicker';
import { neutral } from 'app/presentation/theme/Colors';
import { theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import AlertFamilyRegister from 'app/presentation/modules/InformationVerification/AlertFamilyRegister';
import styled from 'styled-components';

interface IInputPickerImageProps extends IProps, FieldProps {
    placeholder?: string;
    value?: string;
    errorMessage?: string;
    onPress?: () => void;
    style?: any;
    textStyle?: any;
    label?: string;
    isRequire?: boolean;
    name?: string;
    isShowAlert?: boolean;
    // field?: FieldInputProps<V>;
    // form?: FormikProps<FormValues>;
    // meta?: FieldMetaProps<V>;
}

const InputPickerImage = (props: IInputPickerImageProps) => {
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
        isShowAlert
        // name,
    } = props;
    // const { field, form, errorMessage, ...restProps } = props;
    const { name } = field || {};
    const { errors, touched, setFieldValue, setFieldTouched, values, setErrors } = form || {};
    
    const isForcus = !!touched?.[name];
    const isErrors = errors?.[name];
    const errorMsg = errorMessage || (errors?.[name] as string);

    return (
        <View>
            {typeof label === 'string' && (
                <TextPrimary style={[styles.label]}>
                    {label}{' '}
                    {isRequire && (
                        <TextPrimary style={{ color: 'red' }}>*</TextPrimary>
                    )}
                </TextPrimary>
            )}
             { isShowAlert && <AlertFamilyRegister />}
            <DocumentPickerCommon setFieldValue={setFieldValue} assetArray={values[name]} name={name} />
            <ErrorMessage name={name}>
                    {(message: string) => <ErrorText>{message}</ErrorText>}
            </ErrorMessage>
        </View>
    );
};
const styles = StyleSheet.create({
    label: {
        fontSize: Dimensions.FontSize.medium,
        lineHeight:Dimensions.moderateScale(18),
        color: neutral.s400,
        fontFamily: theme.font.Bold,
        marginBottom: Dimensions.Spacing.small
    },
});
const ErrorText = styled(TextPrimary)`
    color: ${theme.color.errorColor};
    margin-top: ${Dimensions.Spacing.tiny};
`;

export default InputPickerImage;
