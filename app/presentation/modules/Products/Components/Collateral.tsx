import LoanRepository from 'app/data/repository/loan';
import { GetListAssetGroupUseCase } from 'app/domain/customer/loan/GetListAssetGroupUseCase';
import ListAssetGroupModel from 'app/models/loan/ListAssetGroupModel';
import { TextPrimary } from 'app/presentation/components';
import { AppButton, ButtonType } from 'app/presentation/components/appbutton/AppButton';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import { DropdownInputAsset } from 'app/presentation/components/input/DropdownInputAsset';
import FormCheckBox from 'app/presentation/components/radioBox/FormCheckBox';
import { getString } from 'app/presentation/localization';
import { T99InvestContext } from 'app/presentation/navigation/routes/app/T99InvestStack';
import { Dimensions, theme } from 'app/presentation/theme';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface IValues {
    propertyType?: number,
    assetGroup: { key: string, label: string },
    assetName: {
        id: string,
        maxLendingMoney: number,
        minLendingMoney: number,
        productName: string
    },
}
interface IProps {
    initValues?: IValues,
    onSubmit: (values: IValues) => void,
    validationSchema?: object,
    groupAssetType: string | number,
}

const Collateral = (props: IProps) => {
    const { onSubmit, initValues, validationSchema, groupAssetType } = props;
    const [dataList1, setDataList1] = useState<ListAssetGroupModel[]>([]);
    const [dataList2, setDataList2] = useState<ListAssetGroupModel[]>([]);
    const [changeAssetType, setChangeAssetType] = useState(false);
    const [assetGroups, setAssetGroups] = useState<
        { label: string; key: string }[]
    >([]);
    const [assetGroup, setAssetGroup] = useState<{
        label: string;
        key: string;
    } | null>(null);
    const [assetAsync, setAssetAsync] = useState<{
        label: string;
        key: string;
    } | null>(null);

    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetListAssetGroupUseCase(new LoanRepository(), { groupAssetType: groupAssetType, assetType: 1 })
            .execute()
            .then((res) => {
                if (
                    res?.status === 200 &&
                    res?.data?.success &&
                    res?.data?.data &&
                    res?.data?.data?.length >= 0
                ) {
                    const dataListParse = res?.data.data.map(e => ListAssetGroupModel.parseFromJson(e));
                    setDataList1(dataListParse);
                    setAssetGroups(dataListParse || []);
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `errors.${res?.data?.message}`,
                            'errorMessageCommon',
                        ]),
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([
                        `errors.${err?.message}`,
                        'errorMessageCommon',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    }, []);

    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetListAssetGroupUseCase(new LoanRepository(), { groupAssetType: groupAssetType, assetType: 3 })
            .execute()
            .then((res) => {
                if (
                    res?.status === 200 &&
                    res?.data?.success &&
                    res?.data?.data &&
                    res?.data?.data?.length >= 0
                ) {
                    const dataListParse = res?.data.data.map(e => ListAssetGroupModel.parseFromJson(e));
                    setDataList2(dataListParse);
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `errors.${res?.data?.message}`,
                            'errorMessageCommon',
                        ]),
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([
                        `errors.${err?.message}`,
                        'errorMessageCommon',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    }, []);

    return (
        <Formik
            initialValues={
                !!initValues ? { ...initValues } : {
                    propertyType: -1,
                    assetGroup: { key: '', label: '' },
                    assetName: {
                        id: '',
                        maxLendingMoney: 0,
                        minLendingMoney: 0,
                        productName: '',
                        paymentWays: 1
                    },
                }
            }
            initialTouched={{
                propertyType: true,
            }}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={onSubmit}
        >
            {({ values, handleSubmit, setFieldValue, errors }) => {                
                return (
                    <>
                        <View style={{ flex: 1 }}>
                            {groupAssetType === 2 ? (
                                <>
                                    <TextPrimary style={styles.titleGender}>{getString('propertyType')}</TextPrimary>
                                    <TextPrimary style={styles.titleContent}>{getString('registrationPapers')}</TextPrimary>
                                </>
                            ) : (
                                <>
                                    <TextPrimary
                                        style={styles.titleGender}
                                    >
                                        {getString('propertyType')}<TextPrimary style={{ color: 'red' }}> *</TextPrimary>
                                    </TextPrimary>
                                    <View style={{ flexDirection: 'row', paddingTop: Dimensions.Spacing.small }}>
                                        <Field
                                            name="propertyType"
                                            title={getString('fixedAssets')}
                                            isRequire
                                            component={FormCheckBox}
                                            value={values.propertyType === 1}
                                            onChange={() => {
                                                setFieldValue('propertyType', 1);

                                                setFieldValue('assetGroup', '');
                                                setFieldValue('assetName', '');

                                                setAssetGroups(dataList1 || []);
                                                setAssetGroup(null);
                                                setChangeAssetType(!changeAssetType);

                                                setAssetAsync(null);

                                            }}
                                            styleContainer={{ marginRight: Dimensions.Spacing.tiny }}
                                            styleText={{ minWidth: 135 }}
                                        />
                                        <Field
                                            name="propertyType"
                                            title={getString('registrationPapers')}
                                            isRequire
                                            style={{ paddingBottom: 0 }}
                                            component={FormCheckBox}
                                            value={values.propertyType === 2}
                                            onChange={() => {
                                                setFieldValue('propertyType', 2);

                                                setFieldValue('assetGroup', '');
                                                setFieldValue('assetName', '');

                                                setAssetGroups(dataList2 || []);
                                                setAssetGroup(null);
                                                setChangeAssetType(!changeAssetType);
                                                setAssetAsync(null);
                                            }}

                                        />
                                    </View>
                                    {errors.propertyType && <TextPrimary style={styles.errorGender}>{errors.propertyType}</TextPrimary>}
                                </>
                            )}

                            <Field
                                name="assetGroup"
                                label={getString(
                                    'assetGroup',
                                )}
                                isRequire
                                placeholder={getString('assetGroup')}
                                component={DropdownInput}
                                data={assetGroups}
                                onChangeExtractor={(item: {
                                    label: string;
                                    key: string;
                                }) => {
                                    setAssetGroup(item);
                                    setChangeAssetType(!changeAssetType);
                                    setAssetAsync(null);
                                    setFieldValue('assetName', '');
                                }}
                                value={assetGroup}
                            />

                            <Field
                                name="assetName"
                                label={getString('assetName')}
                                isRequire
                                placeholder={getString('assetName')}
                                component={DropdownInputAsset}
                                onChangeExtractor={(item: {
                                    label: string;
                                    key: string;
                                }) => {
                                    setAssetAsync(item);
                                }}
                                value={assetAsync}
                                assetGroup={assetGroup}
                                changeAssetType={changeAssetType}
                            />

                        </View>
                        <AppButton
                            onPress={handleSubmit}
                            styleBtn={styles.btnStyle}
                            name={getString('continue')}
                            type={!!(values.assetGroup.key && !!values?.assetName?.id) ? undefined : ButtonType.CircleGray}
                            disabled={!(!!values?.assetGroup?.key && !!values?.assetName?.id)}
                        />
                    </>
                );
            }}
        </Formik >
    )
}

export default Collateral

const styles = StyleSheet.create({
    process: {
        marginTop: -8,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderBottomColor: theme.color.borderColor,
        borderBottomWidth: 2,
    },
    title: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.small,
        paddingVertical: Dimensions.Spacing.small,
        textTransform: 'uppercase',
    },
    titleGender: {
        color: theme.color.labelColor,
        fontFamily: theme.font.Bold,
        fontSize: Dimensions.FontSize.medium,
        backgroundColor: theme.color.backgroundColorVariant,
        paddingVertical: Dimensions.Spacing.small,
    },
    titleContent: {
        color: theme.color.textColorSecondary,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraLarge,
        paddingBottom: Dimensions.Spacing.small,
    },
    errorGender: {
        marginHorizontal: 5,
        width: '100%',
        color: theme.color.errorColor,
        backgroundColor: 'white',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
    },
    viewDropdown: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Dimensions.Spacing.small,
    },
    btnStyle: {
        marginBottom: Dimensions.bottomPadding,
    },
    iconRightField: {
        color: theme.color.disabledColor,
        fontSize: Dimensions.moderateScale(16),
    },
})