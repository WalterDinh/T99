import { getString } from 'app/presentation/localization';
import CreateT99Pawn from 'app/presentation/modules/Products/T99Pawn';
import React from 'react';
import {} from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createDefaultStackNavigationOptions } from '../../header/config';
import { T99pawnParamList } from '../routeParams';
import {
    IAdditionalInformation,
    IAssetInfo,
    IDataAssetInfo,
    IDataLoanFee,
    IDataUser,
} from './T99InvestStack';

export const T99PawnContext = React.createContext({
    setDataAssetInfo: (data: any) => {},
    setDataAssetInfoPictures: (data: any) => {},
    setLoanFee: (data: IDataLoanFee) => {},
    setUserData: (data: IDataUser) => {},
    setAdditionalInformation: (data: IAdditionalInformation) => {},
    dataAssetInfo: {} as IDataAssetInfo,
    dataAssetInfoPictures: {} as IAssetInfo,
    dataLoanFee: {} as IDataLoanFee,
    dataUser: {} as IDataUser,
    additionalInformation: {} as IAdditionalInformation,
});

export const T99PawnContextProvider = ({
    children,
}: {
    children: React.ReactElement;
}) => {
    const [dataStep1, setDataStep1] = React.useState({} as IDataAssetInfo);
    const [dataStep2, setDataStep2] = React.useState({
        assetDistrictId: '',
        assetProvinceId: '',
        groupDataMasterIds: [],
        files: [],
    });
    const [dataStep3, setDataStep3] = React.useState<IDataLoanFee>({
        discountCode: '',
        loan: 0,
        insuranceFee: 0,
        otherFee: 0,
        periodMoneyAmount: 0,
        sumInterest: 0,
        totalAmountMoney: 0,
        period: 'ngày',
        loanTime: 0,
    });
    const [dataStep4, setDataStep4] = React.useState<IDataUser>({
        fullName: '',
        gender: -1,
        dateOfBirth: '',
        phoneNumber: '',
        documentType: { key: 0, label: '', code: '' },
        documentCode: '',
        email: '',
        province: { key: '', label: '' },
        district: { key: '', label: '' },
        ward: { key: '', label: '' },
        detailedAddress: '',
    });

    const [dataStep5, setDataStep5] = React.useState<IAdditionalInformation>({
        province: { key: '', label: '' },
        transactionOffice: { key: '', label: '' },
        dayTransaction: '',
    });

    const setDataAssetInfo = (data: any) => {
        setDataStep1(data);
    };
    const setDataAssetInfoPictures = (data: any) => {
        setDataStep2(data);
    };

    const setLoanFee = (data: IDataLoanFee) => {
        setDataStep3(data);
    };

    const setUserData = (data: IDataUser) => {
        setDataStep4(data);
    };
    const setAdditionalInformation = (data: IAdditionalInformation) => {
        setDataStep5(data);
    };

    return (
        <T99PawnContext.Provider
            value={{
                setDataAssetInfo: setDataAssetInfo,
                dataAssetInfo: dataStep1,
                setDataAssetInfoPictures: setDataAssetInfoPictures,
                dataAssetInfoPictures: dataStep2,
                setLoanFee: setLoanFee,
                dataLoanFee: dataStep3,
                dataUser: dataStep4,
                setUserData: setUserData,
                additionalInformation: dataStep5,
                setAdditionalInformation: setAdditionalInformation,
            }}
        >
            {children}
        </T99PawnContext.Provider>
    );
};

const T99Pawnack = createSharedElementStackNavigator<T99pawnParamList>();

export const T99PawnStack = () => {
    const defaultOptions = createDefaultStackNavigationOptions();

    return (
        <T99PawnContextProvider>
            <T99Pawnack.Navigator
                screenOptions={defaultOptions}
                initialRouteName={'T99Pawn'}
            >
                <T99Pawnack.Screen
                    options={{
                        title: getString('applyForALoan'),
                        headerStyle: {
                            borderBottomWidth: 1,
                        },
                    }}
                    name="T99Pawn"
                    component={CreateT99Pawn}
                />
                
            </T99Pawnack.Navigator>
        </T99PawnContextProvider>
    );
};
