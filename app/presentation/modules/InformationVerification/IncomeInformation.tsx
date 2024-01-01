import { StackNavigationProp } from '@react-navigation/stack';
import CustomerRepository from 'app/data/repository/customer';
import { GetVerificationIncomeUseCase } from 'app/domain/customer/customer/GetVerificationIncomeUseCase';
import VerificationIncomeModel from 'app/models/Verification/VerificationIncomeModel';
import { Input } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import DoneScreen from 'app/presentation/components/donescreen';
import { getString } from 'app/presentation/localization';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Images, theme } from 'app/presentation/theme';
import { neutral, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'IncomeInformation'>;
}
const IncomeInformation = (props: IProps) => {
    //! State
    const { navigation } = props;
    const [dataIncomeInformation, setDataIncomeInformation] = useState<
        VerificationIncomeModel[]
    >([]);

    //! Function
    const handleClickButton = () => {
        navigation.navigate('AddIncomeInformation');
    };

    //! Effect

    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetVerificationIncomeUseCase(new CustomerRepository())
            .execute()
            .then((res) => {
                if (res?.data?.httpStatusCode === 200 && res?.data.data) {
                    setDataIncomeInformation(res?.data?.data || []);
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `errors.${res?.data?.message}} `,
                            'errorMessageCommon',
                        ]),
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([
                        `errors.${err?.message}} `,
                        'errorMessageCommon',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    }, []);
    const renderItem = ({
        item,
        index,
    }: {
        item: VerificationIncomeModel;
        index: number;
    }) => {
        return (
            <View style={styles.item}>
                <Input
                    label={getString('companyName')}
                    editable={false}
                    value={item.companyName}
                />
                <Input
                    label={getString('career')}
                    editable={false}
                    value={item.jobName}
                />
                <Input
                    label={getString('position')}
                    editable={false}
                    value={item.jobPosition}
                />
                <Input
                    label={getString('province')}
                    editable={false}
                    value={item.province}
                />
                <Input
                    label={getString('district')}
                    editable={false}
                    value={item.district}
                />
                <Input
                    label={getString('address')}
                    editable={false}
                    value={item.companyAddress}
                />
                <Input
                    label={getString('earnings')}
                    editable={false}
                    value={item.incomeAmount.toString()}
                />
            </View>
        );
    };
    //! Render
    return (
        <View
            style={[
                styles.container,
                dataIncomeInformation.length == 0 && {
                    backgroundColor: neutral.white,
                },
            ]}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(_item, index) => index.toString()}
                data={dataIncomeInformation}
                ListEmptyComponent={
                    <DoneScreen
                        styleTitleHeader={styles.styleTitleHeader}
                        styleImg={{ marginBottom: 0 }}
                        titleHeader={getString('assetInformation')}
                        source={Images.Backgrounds.BackgroundImageVerification}
                        title={getString('youDoNotHaveIncomeInformation')}
                        styleTitle={styles.note}
                    />
                }
            />
            <View style={{ paddingHorizontal: Dimensions.moderateScale(22) }}>
                <AppButton
                    name={getString('addAssetInformation')}
                    type={ButtonType.CircleBorderRed}
                    onPress={handleClickButton}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: Dimensions.moderateScale(40),
    },
    note: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        lineHeight: Dimensions.moderateScale(25),
        textAlign: 'center',
        color: secondary.brand,
        paddingTop: Dimensions.moderateScale(32),
        fontFamily: theme.font.Regular,
    },
    styleTitleHeader: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        fontFamily: theme.font.Regular,
    },
    item: {
        margin: 16,
        padding: 16,
        backgroundColor: neutral.white,
        borderRadius: 8,
    },
});
export default IncomeInformation;
