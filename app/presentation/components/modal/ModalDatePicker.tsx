import { getString } from 'app/presentation/localization';
import { Dimensions, Images, theme } from 'app/presentation/theme';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import { AppButton, ButtonType } from '../appbutton/AppButton';
import ImageRenderer from '../image/ImageRenderer';
import TextPrimary from '../text/TextPrimary';
import { BaseModal } from '../modal/ModalBase';
import dayjs from 'dayjs';
export interface IPropsModalDatePicker extends DatePickerProps {
    onSelectDate: (date: string) => void;
    isVisible: boolean;
    onCloseModal: () => void;
    onShowModal: () => void;
}

export const ModalDatePicker = React.memo((props: IPropsModalDatePicker) => {
    const { onSelectDate, isVisible, onCloseModal, onShowModal, ...rest } =
        props;
    const ref = useRef(new Date());

    return (
        <BaseModal
            isVisible={isVisible}
            onHideModal={onCloseModal}
            onShowModal={onShowModal}
            backdropOpacity={0.25}
        >
            <View style={styles.modalView}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.btnClose}
                        onPress={onCloseModal}
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
                    onDateChange={(dob) => {
                        ref.current = dob;
                    }}
                    style={styles.datePickerStyle}
                    {...rest}
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
                            onCloseModal();
                            onSelectDate(dayjs(ref.current).toISOString());
                        }}
                    />
                </View>
            </View>
        </BaseModal>
    );
});

const styles = StyleSheet.create({
    text: {
        color: theme.color.textColor,
        paddingVertical: Dimensions.Spacing.small,
        fontSize: Dimensions.FontSize.extraLarge,
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
