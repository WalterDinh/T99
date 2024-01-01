import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, theme } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PicturesCollateral from '../../Components/PicturesCollateral';
import { AssetType, StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { GetListAssetPictureUseCase } from 'app/domain/customer/loan/GetListAssetPictureUseCase';
import LoanRepository from 'app/data/repository/loan';
import ListAssetPictureModel from 'app/models/loan/ListAssetPictureModel';
import Toast from 'react-native-toast-message';
import { T99PawnContext } from 'app/presentation/navigation/routes/app/T99PawnStack';

interface IProps {
    changeCurrentIndexTab: (index: number) => void;
}

const index = (props: IProps) => {
    const { changeCurrentIndexTab } = props;
    const { dataAssetInfo, setDataAssetInfoPictures } =
        useContext(T99PawnContext);
    const [dataList, setDataList] = useState<ListAssetPictureModel[]>([]);
    const [initialValues, setInitialValues] = useState({});
    const [validation, setValidation] = useState({});
    const ValidationSchema = Yup.object().shape({
        // province: Yup.object().required(getString('thisFieldRequired')),
        // district: Yup.object().required(getString('thisFieldRequired')),
        ...validation
    });
    const ValidationSchemaOnlyImg = Yup.object().shape({
        ...validation
    });
    const validationAll = dataAssetInfo.propertyType === 1 ? ValidationSchemaOnlyImg : ValidationSchema;

    useLayoutEffect(() => {
        const initObj: any = {
            province: '',
            district: '',
        };
        const ValidationObj: any = {

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
                    validationSchema={validationAll}
                    groupAssetType={AssetType.Pledge}
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
