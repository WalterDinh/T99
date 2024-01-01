import React from 'react';
import Input, { IAppInputProps } from './Input';
import { FieldProps } from 'formik';

interface IInputFormProps extends IAppInputProps, FieldProps {}

const InputForm = (props: IInputFormProps) => {
    const { field, form, errorMessage, keyboardType, ...restProps } = props;
    const { name } = field || {};
    const { errors, touched, setFieldValue, setFieldTouched } = form || {};
    const isFocus = !!touched?.[name];
    const isErrors = errors?.[name];
    const errorMsg = errorMessage || (errors?.[name] as string); 
    return (
        <Input
            errorMessage={isErrors ? errorMsg : undefined}
            onChangeText={(text) => setFieldValue(name, text)}
            onChangeValue={(text) => setFieldValue(name, text)}
            {...restProps}
            {...(field || {})}
            // onBlur={() => setFieldTouched(name, false)}
            onFocus={() => setFieldTouched(name, true)}
            keyboardType={keyboardType}
            isFocus={isFocus || undefined}
        />
    );
};

export default InputForm;
