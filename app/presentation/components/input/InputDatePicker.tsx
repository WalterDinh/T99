import { getString } from 'app/presentation/localization';
import { Colors, Dimensions, Images, theme } from 'app/presentation/theme';
import {
    ErrorMessage,
    FieldInputProps,
    FieldMetaProps,
    FormikProps,
} from 'formik';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import styled from 'styled-components';
import { AppButton, ButtonType } from '../appbutton/AppButton';
import ImageRenderer from '../image/ImageRenderer';
import TextPrimary from '../text/TextPrimary';
import { BaseModal } from '../modal/ModalBase';
import dayjs from 'dayjs';
export interface IPropsInputDatePicker<V = any, FormValues = any>
    extends DatePickerProps {
    placeholder: string;
    value: string;
    errorMessage?: string;
    onPress: (date: string) => void;
    style?: any;
    textStyle?: any;
    label: string;
    isRequire?: boolean;
    idName: string;
    field?: FieldInputProps<V>;
    form?: FormikProps<FormValues>;
    meta?: FieldMetaProps<V>;
    disabled?: boolean;
}

export const InputDatePicker = React.memo((props: IPropsInputDatePicker) => {
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
        disabled,
        ...resProps
    } = props;

    const { errors, touched, setFieldValue, setFieldTouched } = form || {};
    const { value: valueForm, name: nameForm } = field || {};
    const haveValue = !!value || !!valueForm;
    const ref = useRef(new Date());
    const [date, setDate] = useState(
        dayjs(value).isValid() ? dayjs(value).toDate() : new Date(),
    );
    const [open, setOpen] = useState(false);

    return (
        <ViewContainer disabled={disabled} style={style}>
            {typeof label === 'string' && (
                <TextPrimary style={[styles.label]}>
                    {label}{' '}
                    {isRequire && (
                        <TextPrimary style={{ color: 'red' }}>*</TextPrimary>
                    )}
                </TextPrimary>
            )}
            <TouchableOpacity disabled={disabled} onPress={() => setOpen(true)}>
                <ContentRow
                    style={disabled && { borderBottomColor: '#C4C4C4' }}
                >
                    <ValueText
                        style={[
                            haveValue ? styles.text : styles.placeholder,
                            textStyle,
                            disabled && { color: Colors.neutral.s500 },
                        ]}
                    >
                        {haveValue ? value || valueForm : placeholder}
                    </ValueText>
                    {!disabled && (
                        <Icon
                            resizeMode={'contain'}
                            source={Images.Icons.CalendarOulined}
                            style={{ height: 20, width: 20 }}
                        />
                    )}
                </ContentRow>
            </TouchableOpacity>

            {field && form && nameForm ? (
                <ErrorMessage name={nameForm}>
                    {(message: string) => <ErrorText>{message}</ErrorText>}
                </ErrorMessage>
            ) : errorMessage ? (
                <ErrorText>{errorMessage}</ErrorText>
            ) : null}

            <BaseModal
                isVisible={open}
                onHideModal={() => {
                    setOpen(false);
                }}
                onShowModal={() => {
                    setOpen(true);
                }}
                backdropOpacity={0.25}
            >
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.btnClose}
                            onPress={() => {
                                setOpen(false);
                            }}
                        >
                            <ImageRenderer
                                source={Images.Icons.Close}
                                style={styles.imgClose}
                            />
                        </TouchableOpacity>
                        <TextPrimary style={styles.textTitle}>
                            {getString('selectDate')}
                        </TextPrimary>
                    </View>
                    <DatePicker
                        mode="date"
                        theme="auto"
                        locale="vi"
                        onDateChange={(date) => {
                            ref.current = date;
                        }}
                        style={styles.datePickerStyle}
                        {...resProps}
                        date={date}
                    />
                    <View
                        style={{
                            paddingHorizontal: 6,
                            marginBottom: Dimensions.bottomPadding,
                        }}
                    >
                        <AppButton
                            name={getString('confirm')}
                            type={ButtonType.CircleBorderRed}
                            onPress={() => {
                                setOpen(false);
                                setDate(ref.current);
                                onPress(dayjs(ref.current).toISOString());
                            }}
                        />
                    </View>
                </View>
            </BaseModal>
        </ViewContainer>
    );
});

const styles = StyleSheet.create({
    placeholder: {
        color: theme.color.disabledColor,
        paddingVertical: Dimensions.Spacing.small,
        fontSize: Dimensions.FontSize.extraLarge,
    },
    styleModal: {
        justifyContent: 'flex-end',
        flex: 1,
        margin: 0,
    },
    text: {
        color: theme.color.textColor,
        paddingVertical: Dimensions.Spacing.small,
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
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    modalView: {
        width: Dimensions.screenWidth(),
        borderTopLeftRadius: Dimensions.Spacing.large,
        borderTopRightRadius: Dimensions.Spacing.large,
        backgroundColor: theme.color.backgroundColorVariant,
        paddingHorizontal: Dimensions.Spacing.large,
        paddingVertical: Dimensions.Spacing.medium,
    },

    header: {
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
    btnClose: {
        position: 'absolute',
        left: 0,
    },
    imgClose: {
        height: 24,
        width: 24,
    },

    datePickerStyle: {
        backgroundColor: 'white',
        width: Dimensions.screenWidth() - 16,
        marginLeft: -8,
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
`;
