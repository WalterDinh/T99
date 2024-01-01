import { View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { Field } from 'formik';
import { getString } from 'app/presentation/localization';
import { DropdownInput } from '../input/DropdownInput';
import CommonRepository from 'app/data/repository/common';
import { GetT99BranchesUseCase } from 'app/domain/common/organization/GetT99BranchesUseCase';
import { GetT99TransactionOfficesUseCase } from 'app/domain/common/organization/GetT99TransactionOfficesUseCase';
import LoadingManager from 'app/shared/helper/LoadingManager';

interface IProps {
    branchesKey: string;
    transactionOfficeKey: string;
}

const SelectTransactionOffices = (props: IProps) => {
    const { branchesKey, transactionOfficeKey } = props;
    const [branches, setBranches] = useState<{ label: string; key: string }[]>([
        { key: '3a04fe9d-6118-12b6-40d7-824b2b0953fe', label: 'Hồ Chí Minh' },
        { key: '3a04fe9d-6118-8ef5-5640-8d9dd23f6d48', label: 'Hà Nội' },
        { key: '3a04fe9d-6118-dcaf-051b-a09931c4ad76', label: 'Đà Nẵng' },
    ]);
    const [branch, setBranch] = useState<{
        label: string;
        key: string;
    } | null>(null);
    const [office, setOffice] = useState<{
        label: string;
        key: string;
    } | null>(null);
    const [offices, setOffices] = useState<{ label: string; key: string }[]>(
        [],
    );

    useEffect(() => {
        const getBranch = () => {
            new GetT99BranchesUseCase(new CommonRepository(), null)
                .execute()
                .then((res) => {
                    if (
                        res?.data?.httpStatusCode == 200 &&
                        res?.data?.success
                    ) {
                        const data = res?.data?.data?.map((elm) => {
                            return { key: elm.id, label: elm.branchName };
                        });
                        setBranches(data || []);
                    }
                })
                .catch((err) => {
                    // console.log('err', err);
                });
        };
        // getBranch();
    }, []);

    useEffect(() => {
        const getOffices = () => {
            if (!Boolean(branch)) return;
            LoadingManager.setLoading(true);
            new GetT99TransactionOfficesUseCase(
                new CommonRepository(),
                branch?.key || '',
            )
                .execute()
                .then((res) => {
                    if (
                        res?.data?.httpStatusCode == 200 &&
                        res?.data?.success
                    ) {
                        const data = res?.data?.data?.map((elm) => {
                            return { key: elm.id, label: elm.transactionName };
                        });
                        setOffices(data || []);
                    }
                })
                .catch((err) => {
                    // console.log('err', err);
                }).finally(()=>{
                    LoadingManager.setLoading(false);
                });
        };
        getOffices();
    }, [branch]);

    return (
        <View>
            {branchesKey && (
                <Field
                    name={branchesKey}
                    label={getString('province')}
                    isRequire
                    placeholder={getString('enterProvince')}
                    component={DropdownInput}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    data={branches}
                    onChangeExtractor={(item: {
                        label: string;
                        key: string;
                    }) => {
                        setBranch(item);
                        setOffice(null);
                        setOffices([]);
                    }}
                />
            )}
            {transactionOfficeKey && (
                <Field
                    name={transactionOfficeKey}
                    label={getString('transactionOffice')}
                    isRequire
                    placeholder={getString('transactionOffice')}
                    component={DropdownInput}
                    style={{ paddingBottom: 0 }}
                    data={offices}
                    value={office}
                    onChangeExtractor={(item: {
                        label: string;
                        key: string;
                    }) => {
                        setOffice(item);
                    }}
                />
            )}
        </View>
    );
};
export default memo(SelectTransactionOffices);
