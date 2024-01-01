import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { Dimensions, theme } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';
import InfoUser, { dataDocument } from '../../Components/InfoUser';
import { ProductsType } from 'app/shared/constants';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useGetUser } from 'app/presentation/hooks/useGetUser';
import { T99InvestContext } from 'app/presentation/navigation/routes/app/T99InvestStack';
import dayjs from 'dayjs';
import Validators from 'app/shared/helper/validators';
import { useCheckVerify } from 'app/presentation/hooks/useCheckVerify';
//! Validation Schema
const ValidationSchema = Yup.object().shape({
    fullName: Yup.string().required(getString('thisFieldRequired')),
    gender: Yup.number().min(0, getString('thisFieldRequired')),
    dateOfBirth: Yup.string()
        .required(getString('thisFieldRequired'))
        .test('dateOfBirth', getString('ageMustBeOver18'), function (value) {
            return dayjs().diff(dayjs(value), 'year') >= 18;
        }),
    phoneNumber: Yup.string().required(getString('thisFieldRequired')),
    documentType: Yup.object().required(getString('thisFieldRequired')),
    documentCode: Yup.string()
        .required(getString('thisFieldRequired'))
        .min(9, getString('documentCodeWrong'))
        .max(12, getString('documentCodeWrong')),
    email: Yup.string().matches(
        Validators.EMAIL_REGEX,
        getString('isEmailValid'),
    ),
    province: Yup.object().required(getString('thisFieldRequired')),
    district: Yup.object().required(getString('thisFieldRequired')),
    ward: Yup.object().required(getString('thisFieldRequired')),
    detailedAddress: Yup.string().required(getString('thisFieldRequired')),
});

interface IProps {
    changeCurrentIndexTab: (index: number) => void;
}

const index = (props: IProps) => {
    const { changeCurrentIndexTab } = props;
    const { setUserData } = useContext(T99InvestContext);
    const { isEkyc } = useCheckVerify();

    const onSubmit = (values: any) => {
        setUserData(values);
        changeCurrentIndexTab(4);
    };
    const user = useGetUser().user;
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            <View style={styles.content}>
                <InfoUser
                    type={ProductsType.Invest}
                    initValues={
                        isEkyc
                            ? {
                                  fullName: user.fullName || '',
                                  gender:
                                      user.gender == 1 || user.gender == 0
                                          ? user.gender
                                          : -1,
                                  dateOfBirth: user.birthOfDay || '',
                                  phoneNumber: user.phoneNumber || '',
                                  documentType:
                                      dataDocument.find(
                                          (elm: any) =>
                                              elm?.key == user.typeDoc,
                                      ) || '',
                                  documentCode: user.noDoc || '',
                                  email: user.email || '',
                                  province: !!user.provinceAddressContactId
                                      ? {
                                            key: user.provinceAddressContactId,
                                            label: user.provinceAddressContactName,
                                        }
                                      : '',
                                  district: !!user.districtAddressContactId
                                      ? {
                                            key: user.districtAddressContactId,
                                            label: user.districtAddressContactName,
                                        }
                                      : '',
                                  ward: !!user.wardsAddressContactId
                                      ? {
                                            key: user.wardsAddressContactId,
                                            label: user.wardsAddressContactName,
                                        }
                                      : '',
                                  detailedAddress: user.addressContact || '',
                              }
                            : {
                                fullName: user.fullName || '',
                                gender: -1,
                                dateOfBirth: '',
                                phoneNumber: user.phoneNumber || '',
                                documentType: '',
                                documentCode: '',
                                email: user.email || '',
                                province: '',
                                district: '',
                                ward: '',
                                detailedAddress: '',
                            }
                    }
                    onSubmit={onSubmit}
                    validateSchema={ValidationSchema}
                />
            </View>
        </KeyboardAwareScrollView>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        marginHorizontal: Dimensions.moderateScale(22),
        paddingTop: Dimensions.Spacing.small,
    },
    process: {
        marginTop: -8,
        paddingTop: 0,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderBottomColor: theme.color.borderColor,
        borderBottomWidth: 2,
    },
    btnStyle: {
        marginBottom: Dimensions.bottomPadding,
    },
});
