import ListAssetPictureModel from 'app/models/loan/ListAssetPictureModel';
import { getString } from 'app/presentation/localization';
import { T99InvestContext } from 'app/presentation/navigation/routes/app/T99InvestStack';
import { Dimensions, theme } from 'app/presentation/theme';
import { AssetType } from 'app/shared/constants';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import PicturesCollateral from '../../Components/PicturesCollateral';

interface IProps {
    changeCurrentIndexTab: (index: number) => void;
}

const index = (props: IProps) => {
    const { changeCurrentIndexTab } = props;
    const { setDataAssetInfoPictures, dataAssetInfo } =
        useContext(T99InvestContext);
    const [dataList, setDataList] = useState<ListAssetPictureModel[]>([]);
    const [initialValues, setInitialValues] = useState({});
    const [validation, setValidation] = useState({});
    const ValidationSchema = Yup.object().shape({
        ...validation
    });
    useLayoutEffect(() => {
        const initObj: any = {
            province: '',
            district: '',
        };
        const ValidationObj: any = {
            province: Yup.object().required(getString('thisFieldRequired')),
            district: Yup.object().required(getString('thisFieldRequired')),
        }

        const dataLabel = (dataAssetInfo.assetGroup.labelImageProperties || []).map((e, index) => {
            initObj[`images${index}`] = '';
            ValidationObj[`images${index}`] = Yup.object().required(getString('thisFieldRequired'));
            return ListAssetPictureModel.parseFromJson(e)
        }
        );
        setDataList(dataLabel);
        setInitialValues(initObj);
        setValidation(ValidationObj);

    }, [dataAssetInfo]);

    // useEffect(() => {
    //     LoadingManager.setLoading(true);
    //     new GetListAssetPictureUseCase(new LoanRepository(), {
    //         groupAssetType: AssetType.RealEstate,
    //     })
    //         .execute()
    //         .then((res) => {
    //             if (
    //                 res?.status === 200 &&
    //                 // res?.data?.success &&
    //                 res?.data?.data &&
    //                 res?.data?.data?.length >= 0
    //             ) {
    //                 const dataListParse = res?.data.data.map((e) =>
    //                     ListAssetPictureModel.parseFromJson(e),
    //                 );
    //                 setDataList(dataListParse);
    //             } else {
    //                 Toast.show({
    //                     type: StatusToast.Error,
    //                     text2: getString([
    //                         `errors.${res?.data?.message}`,
    //                         'errorMessageCommon',
    //                     ]),
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             Toast.show({
    //                 type: StatusToast.Error,
    //                 text2: getString([
    //                     `errors.${err?.message}`,
    //                     'errorMessageCommon',
    //                 ]),
    //             });
    //         })
    //         .finally(() => {
    //             LoadingManager.setLoading(false);
    //         });
    // }, []);

    const onSubmit = (values: any) => {
        const groupDataMasterIds = dataList.map((elm) => elm.key);
        const files = Object.values(values)
            .filter((elm: any) => !!elm.uri)
            .map((elm: any) => elm.uri);

        setDataAssetInfoPictures({
            assetDistrictId: values?.district?.key,
            assetProvinceId: values?.province?.key,
            groupDataMasterIds: groupDataMasterIds,
            files: files,
        });
        changeCurrentIndexTab(2);
    };
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={styles.content}>
                <PicturesCollateral
                    dataList={dataList}
                    onSubmit={onSubmit}
                    initValues={initialValues}
                    validationSchema={ValidationSchema}
                    groupAssetType={AssetType.RealEstate}
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
