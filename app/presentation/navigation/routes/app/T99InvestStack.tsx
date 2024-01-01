import { getString } from 'app/presentation/localization';
import CreateT99Invest from 'app/presentation/modules/Products/T99Invest';
import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createDefaultStackNavigationOptions } from '../../header/config';
import { T99investParamList } from '../routeParams';

export interface IDataAssetInfo {
    propertyType: number;
    assetGroup: { key: string; label: string, labelImageProperties: [] };
    assetName: {
        id: string;
        productName: string;
        maxLendingMoney: number;
        minLendingMoney: number;
        paymentWays: number;
        dataPeridod: [];
    };
}

export interface IDataLoanFee {
    discountCode: string;
    loan: number;
    insuranceFee: number;
    otherFee: number;
    periodMoneyAmount: number;
    sumInterest: number;
    totalAmountMoney: number;
    period: 'ngày' | 'tháng';
    loanTime: number;
}

export interface IAssetInfo {
    assetDistrictId: string;
    assetProvinceId: string;
    groupDataMasterIds: string[];
    files: string[];
}

export interface IDataUser {
    fullName: string;
    gender: number;
    dateOfBirth: string;
    phoneNumber: string;
    documentType: { key: number; label: string; code: string };
    documentCode: string;
    email: string;
    province: { key: string; label: string };
    district: { key: string; label: string };
    ward: { key: string; label: string };
    detailedAddress: string;
}
export interface IAdditionalInformation {
    province: { key: string; label: string };
    transactionOffice: { key: string; label: string };
    dayTransaction: string;
}
export const T99InvestContext = React.createContext({
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

export const T99InvestContextProvider = ({
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
        period: 'tháng',
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
        <T99InvestContext.Provider
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
        </T99InvestContext.Provider>
    );
};

const T99InveStack = createSharedElementStackNavigator<T99investParamList>();

export const T99InvestStack = () => {
    const defaultOptions = createDefaultStackNavigationOptions();

    return (
        <T99InvestContextProvider>
            <T99InveStack.Navigator
                screenOptions={defaultOptions}
                initialRouteName={'T99Invest'}
            >
                <T99InveStack.Screen
                    options={{
                        title: getString('applyForALoan'),
                        headerStyle: {
                            borderBottomWidth: 1,
                        },
                    }}
                    name="T99Invest"
                    component={CreateT99Invest}
                />
               
            </T99InveStack.Navigator>
        </T99InvestContextProvider>
    );
};
