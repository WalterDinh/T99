import { View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { Field } from 'formik';
import { getString } from 'app/presentation/localization';
import { DropdownInput } from '../input/DropdownInput';
import { GetProvincesUseCase } from 'app/domain/common/organization/GetProvincesUseCase';
import CommonRepository from 'app/data/repository/common';
import { GetDistrictsUseCase } from 'app/domain/common/organization/GetDistrictsUseCase';
import { GetWardsUseCase } from 'app/domain/common/organization/GetWardsUseCase';
import LoadingManager from 'app/shared/helper/LoadingManager';

interface IProps {
    provinceKey: string;
    districtKey: string;
    wardKey?: string;
    provinceInit?: { label: string; key: string } | null;
    districtInit?: { label: string; key: string } | null;
    wardInit?: { label: string; key: string } | null;
    disabledWhenHasData?: boolean;
}

const OrganizationInput = (props: IProps) => {
    const {
        provinceKey,
        districtKey,
        wardKey,
        provinceInit = null,
        districtInit = null,
        wardInit = null,
        disabledWhenHasData,
    } = props;

    const [provinces, setProvinces] = useState<
        { label: string; key: string }[]
    >([]);
    const [province, setProvince] = useState<{
        label: string;
        key: string;
    } | null>(provinceInit);
    const [district, setDistrict] = useState<{
        label: string;
        key: string;
    } | null>(districtInit);
    const [ward, setWard] = useState<{
        label: string;
        key: string;
    } | null>(wardInit);
    const [districts, setDistricts] = useState<
        { label: string; key: string }[]
    >([]);
    const [wards, setWards] = useState<{ label: string; key: string }[]>([]);
    useEffect(() => {
        setProvince(provinceInit);
    }, [provinceInit]);

    useEffect(() => {
        setWard(wardInit);
    }, [wardInit]);
    useEffect(() => {
        setDistrict(districtInit);
    }, [districtInit]);

    useEffect(() => {
        const getProvinces = () => {
            LoadingManager.setLoading(true);
            new GetProvincesUseCase(new CommonRepository())
                .execute()
                .then((res) => {
                    if (
                        res?.data?.httpStatusCode == 200 &&
                        res?.data?.success
                    ) {
                        const data = res?.data?.data?.map((elm) => {
                            return { key: elm.id, label: elm.name };
                        });
                        setProvinces(data || []);
                    }
                })
                .catch((err) => {
                    // console.log('err', err);
                })
                .finally(() => {
                    LoadingManager.setLoading(false);
                });
        };
        getProvinces();
    }, []);

    useEffect(() => {
        const getDistricts = () => {
            if (!Boolean(province)) return;
            LoadingManager.setLoading(true);
            new GetDistrictsUseCase(new CommonRepository(), {
                provinceId: province?.key || '',
            })
                .execute()
                .then((res) => {
                    if (
                        res?.data?.httpStatusCode == 200 &&
                        res?.data?.success
                    ) {
                        const data = res?.data?.data?.map((elm) => {
                            return { key: elm.id, label: elm.name };
                        });
                        setDistricts(data || []);
                    }
                })
                .catch((err) => {
                    // console.log('err', err);
                })
                .finally(() => {
                    LoadingManager.setLoading(false);
                });
        };
        getDistricts();
    }, [province]);

    useEffect(() => {
        const getWards = () => {
            if (!Boolean(district)) return;
            LoadingManager.setLoading(true);

            new GetWardsUseCase(new CommonRepository(), {
                districtId: district?.key || '',
            })
                .execute()
                .then((res) => {
                    if (
                        res?.data?.httpStatusCode == 200 &&
                        res?.data?.success
                    ) {
                        const data = res?.data?.data?.map((elm) => {
                            return { key: elm.id, label: elm.name };
                        });
                        setWards(data || []);
                    }
                })
                .catch((err) => {
                    // console.log('err', err);
                })
                .finally(() => {
                    LoadingManager.setLoading(false);
                });
        };
        getWards();
    }, [district]);

    return (
        <View>
            {provinceKey && (
                <Field
                    name={provinceKey}
                    label={getString('province')}
                    isRequire
                    placeholder={getString('enterProvince')}
                    component={DropdownInput}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    data={provinces}
                    onChangeExtractor={(item: {
                        label: string;
                        key: string;
                    }) => {
                        setProvince(item);
                        setDistrict(null);
                        setWards([]);
                        setWard(null);
                    }}
                    disabled={disabledWhenHasData ? !!provinceInit : false}
                />
            )}
            {districtKey && (
                <Field
                    name={districtKey}
                    label={getString('district')}
                    isRequire
                    placeholder={getString('enterDistrict')}
                    component={DropdownInput}
                    style={{ paddingBottom: 0 }}
                    data={districts}
                    value={district}
                    onChangeExtractor={(item: {
                        label: string;
                        key: string;
                    }) => {
                        setDistrict(item);
                        setWards([]);
                        setWard(null);
                    }}
                    disabled={disabledWhenHasData ? !!districtInit : false}
                />
            )}
            {wardKey && (
                <Field
                    name={wardKey}
                    label={getString('ward')}
                    isRequire
                    placeholder={getString('enterWard')}
                    component={DropdownInput}
                    inputContainerStyle={{ paddingBottom: 0 }}
                    data={wards}
                    value={ward}
                    onChangeExtractor={(item: {
                        label: string;
                        key: string;
                    }) => {
                        setWard(item);
                    }}
                    disabled={disabledWhenHasData ? !!wardInit : false}
                />
            )}
        </View>
    );
};
export default memo(OrganizationInput);
