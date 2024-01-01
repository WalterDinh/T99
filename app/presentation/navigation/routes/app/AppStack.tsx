import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import { getString } from 'app/presentation/localization';
import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import BeneficiaryInformation from 'app/presentation/modules/BeneficiaryInformation/BeneficiaryInformation';
import ScreenBeneficiaryAccount from 'app/presentation/modules/BeneficiaryInformation/ScreenBeneficiaryAccount';
import ScreenNewAccount from 'app/presentation/modules/BeneficiaryInformation/ScreenNewAccount';
import EstimatedInterestRate from 'app/presentation/modules/CalculateProfit/EstimatedInterestRate';
import InterestInfor from 'app/presentation/modules/CalculateProfit/InterestInfor';
import SelectCalculateProfitTypeScreen from 'app/presentation/modules/CalculateProfit/SelectCalculateProfitType';
import SelectProductCalculateProfitTypeEstimate from 'app/presentation/modules/CalculateProfit/SelectProductCalculateProfitTypeEstimate';
import DetailNotifications from 'app/presentation/modules/DetailNotifications';
import DigitalFinance from 'app/presentation/modules/DigitalFinance';
import EarningInformation from 'app/presentation/modules/EarningInformation';
import EkycOnboardingScreen from 'app/presentation/modules/Ekyc/EkycOnboarding';
import InformationVerification from 'app/presentation/modules/InformationVerification';
import AddIncomeInformation from 'app/presentation/modules/InformationVerification/AddIncomeInformation';
import AddProperty from 'app/presentation/modules/InformationVerification/AddProperty';
import AssetAuthentication from 'app/presentation/modules/InformationVerification/AssetAuthentication';
import ConfirmationOfResidence from 'app/presentation/modules/InformationVerification/ConfirmationOfResidence';
import GolferVerification from 'app/presentation/modules/InformationVerification/GolferVerification';
import IncomeInformation from 'app/presentation/modules/InformationVerification/IncomeInformation';
import Notifications from 'app/presentation/modules/Notifications';
import PrivacyAndPolicy from 'app/presentation/modules/PrivacyAndPolicy';
import InformationAccount from 'app/presentation/modules/SettingUser/InformationAccount';
import TransactionHistoryScreen from 'app/presentation/modules/TransactionHistory';
import {
    createDefaultStackNavigationOptions,
    createLeftTitleHeaderOptions,
    createRightActionHeaderOptions,
} from '../../header/config';
import {
    AllRouteParamList,
    AppStackParamList,
    BeneficiaryParamList,
    ContractParamList,
    DisburParamList,
    EkycParamList,
    InvestmentParamList,
    T99golfParamList,
} from '../routeParams';
import { AppTab } from './AppTab';

import {
    GolferStep1,
    GolferStep2,
    GolferStep3,
    GolferStep4,
    GolferStep5,
} from 'app/presentation/modules/Products/T99Golfer';

import {
    DisbursementStep1,
    DisbursementStep2,
    DisbursementStep3,
} from 'app/presentation/modules/Products/T99Golfer/Disbursement';

import T99doneProduct from 'app/presentation/modules/Products/T99DoneProduct';

import ScreenAccount from 'app/presentation/modules/BeneficiaryInformation/ScreenAccount';
import ChangePassword from 'app/presentation/modules/ChangePassword/Step1';
import BorrowingContractScreen from 'app/presentation/modules/ContractManagement/BorrowingContract';
import DetailsContractBorrowing from 'app/presentation/modules/DetailsContractBorrowing';
import DetailsContractScreen from 'app/presentation/modules/DetailsContractInvestment';
import DonePassword from 'app/presentation/modules/DonePassword';
import EkycSuccessScreen from 'app/presentation/modules/Ekyc/EkycSuccess';
import SelectDocumentVerification from 'app/presentation/modules/Ekyc/SelectDocumentVerification';
import VerificationResultsScreen from 'app/presentation/modules/Ekyc/VerificationResults';
import HistoryPayment from 'app/presentation/modules/HistoryPayment';
import InformationQuery from 'app/presentation/modules/InformationQuery';
import InvestmentDetail from 'app/presentation/modules/InvestmentDetails';
import InvestmentList from 'app/presentation/modules/InvestmentList';
import LoanExtensionScreen from 'app/presentation/modules/LoanExtension';
import DetailsLoanExtension from 'app/presentation/modules/LoanExtension/DetailsLoanExtension';
import RequestLoanAmount from 'app/presentation/modules/ManageFileHome/RequestLoanAmount';
import SignContractScreen from 'app/presentation/modules/ManageFileHome/SignContract';
import MapScreen from 'app/presentation/modules/MapScreen';
import SearchAutocomplete from 'app/presentation/modules/MapScreen/SearchAutocomplete';
import ContractPayments from 'app/presentation/modules/Payment/ContractPayments';
import ContractSettlementInformation from 'app/presentation/modules/Payment/ContractSettlementInformation/ContractSettlementInformation';
import Settlement from 'app/presentation/modules/Payment/ContractSettlementInformation/Settlement';
import DebtPaymentDue from 'app/presentation/modules/Payment/DebtPayment/DebtPaymentDue';
import DebtPaymentDueDetail from 'app/presentation/modules/Payment/DebtPayment/DebtPaymentDueDetail';
import InterestFeeDetail from 'app/presentation/modules/Payment/InterestFee/InterestFeeDetail';
import InterestFees from 'app/presentation/modules/Payment/InterestFee/InterestFees';
import OnlinePayment from 'app/presentation/modules/Payment/OnlinePayment/OnlinePayment';
import PartialRepaymentDetail from 'app/presentation/modules/Payment/PartialRepayment/PartialRepaymentDetail';
import PartialRepayment from 'app/presentation/modules/Payment/PartialRepayment/PartialRepaymentOfPrincipal';
import PayCashStore from 'app/presentation/modules/Payment/PayCashStore';
import PaymentMethod from 'app/presentation/modules/Payment/PaymentMethods/PaymentMethods';
import PaySomeoneContract from 'app/presentation/modules/Payment/PaySomeoneContract/PaySomeoneContract';
import PayTransfer from 'app/presentation/modules/Payment/PayTransfer/PayTransfer';
import SelectMethodPay from 'app/presentation/modules/Payment/SelectMethodPay/SelectMethodPay';
import SuccessPayment from 'app/presentation/modules/Payment/SuccessPayment/SuccessPayment';
import PaymentPlan from 'app/presentation/modules/PaymentPlan';
import PdfContractScreen from 'app/presentation/modules/PdfContactDetail';
import DisbursementHistoryScreen from 'app/presentation/modules/Products/T99Golfer/Disbursement/DisbursementHistory';
import SignUpIncreaseLimitScreen from 'app/presentation/modules/Products/T99Golfer/Disbursement/SignUpIncreaseLimit';
import RequestChangePaymenScreen from 'app/presentation/modules/RequestChangePaymen';
import RequestDisbursement from 'app/presentation/modules/RequestDisbursement';
import RequestFeeWaiverScreen from 'app/presentation/modules/RequestFeeWaiver';
import RequestSuccess from 'app/presentation/modules/RequestSuccess';
import ScreenCenterSupport from 'app/presentation/modules/ScreenCenterSupport/ScreenCenterSupport';
import SignLoanContractScreen from 'app/presentation/modules/SignLoanContract';
import TimePayment from 'app/presentation/modules/TimePayment';
import TransactionInvestmentScreen from 'app/presentation/modules/TransactionInvestment';
import WebViewScreen from 'app/presentation/modules/WebViewScreen';
import { T99InvestStack } from './T99InvestStack';
import { T99PawnStack } from './T99PawnStack';
import BiometricScreen from 'app/presentation/modules/SettingUser/BiometricScreen';
import { View } from 'react-native';
import useAutoLogout from 'app/presentation/hooks/useAutoLogout';
import { BorrowingContractStack } from './BorrowingContractStack';

const Stack = createSharedElementStackNavigator<AllRouteParamList>({
    name: 'app',
});

const EkycStack = createSharedElementStackNavigator<EkycParamList>();
const BenefiStack = createSharedElementStackNavigator<BeneficiaryParamList>();
const T99golfStack = createSharedElementStackNavigator<T99golfParamList>();
const DisburStack = createSharedElementStackNavigator<DisburParamList>();
const Investment = createStackNavigator<InvestmentParamList>();
const BorrowingContract = createStackNavigator<ContractParamList>();

interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'Notifications'>;
}

export const EkycMainStack = (props: IProps) => {
    const defaultOptions = createDefaultStackNavigationOptions();
    const textRightOptions = createRightActionHeaderOptions(
        () => props.navigation.goBack(),
        getString('skip'),
    );

    const headerOptions = createDefaultStackNavigationOptions(false);
    return (
        <EkycStack.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'EkycOnboarding'}
        >
            <EkycStack.Screen
                options={{ headerShown: false }}
                name="EkycOnboarding"
                component={EkycOnboardingScreen}
            />
            <EkycStack.Screen
                options={{ ...textRightOptions }}
                name="SelectDocumentVerification"
                component={SelectDocumentVerification}
            />
            <EkycStack.Screen
                options={{
                    ...defaultOptions,
                    title: getString('resultValidation'),
                }}
                name="VerificationEkycResults"
                component={VerificationResultsScreen}
            />
            <EkycStack.Screen
                name="EkycSuccess"
                component={EkycSuccessScreen}
            />
        </EkycStack.Navigator>
    );
};

export const BeneficiaryStack = () => {
    const defaultOptions = createDefaultStackNavigationOptions();
    return (
        <BenefiStack.Navigator screenOptions={defaultOptions}>
            <BenefiStack.Screen
                options={{
                    ...defaultOptions,
                    title: getString('accountBenefits2'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="BeneficiaryScreen"
                component={BeneficiaryInformation}
            />
            <BenefiStack.Screen
                options={{
                    ...defaultOptions,
                    title: getString('addNewAccount'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="AddNewBeneficiary"
                component={ScreenNewAccount}
            />
            <BenefiStack.Screen
                options={{
                    ...defaultOptions,
                    title: getString('accountBenefits2'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="BeneficiaryAccountScreen"
                component={ScreenBeneficiaryAccount}
            />
        </BenefiStack.Navigator>
    );
};

export const T99golferStack = () => {
    const defaultOptions = createDefaultStackNavigationOptions();
    return (
        <T99golfStack.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'T99GolferStep1'}
        >
            <T99golfStack.Screen
                options={{
                    title: getString('limit'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="T99GolferStep1"
                component={GolferStep1}
            />
            <T99golfStack.Screen
                options={{
                    title: getString('applyForALoan'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="T99GolferStep2"
                component={GolferStep2}
            />
            <T99golfStack.Screen
                options={{
                    title: getString('applyForALoan'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="T99GolferStep3"
                component={GolferStep3}
            />
            <T99golfStack.Screen
                options={{
                    title: getString('applyForALoan'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="T99GolferStep4"
                component={GolferStep4}
            />
            <T99golfStack.Screen
                options={{
                    title: getString('golferCreditPackage2'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="T99GolferStep5"
                component={GolferStep5}
            />
        </T99golfStack.Navigator>
    );
};

export const DisbursementStack = () => {
    const defaultOptions = createDefaultStackNavigationOptions();
    return (
        <DisburStack.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'DisbursementStep1'}
        >
            <DisburStack.Screen
                options={{
                    title: getString('limit'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="DisbursementStep1"
                component={DisbursementStep1}
            />
            <DisburStack.Screen
                options={{
                    title: getString('requestDisbursement'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="DisbursementStep2"
                component={DisbursementStep2}
            />
            <DisburStack.Screen
                options={{
                    title: getString('SignTheConfirmation'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="DisbursementStep3"
                component={DisbursementStep3}
            />
            <DisburStack.Screen
                options={{
                    title: getString('disbursementHistory'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="DisbursementHistory"
                component={DisbursementHistoryScreen}
            />
            <DisburStack.Screen
                options={{
                    title: getString('signUpToIncreaseYourLimit'),
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                }}
                name="SignUpIncreaseLimit"
                component={SignUpIncreaseLimitScreen}
            />
        </DisburStack.Navigator>
    );
};

const InvestmentContractStack = (props: IProps) => {
    const defaultOptions = createDefaultStackNavigationOptions();
    return (
        <Investment.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'InvestmentList'}
        >
            <Investment.Screen
                name="InvestmentList"
                component={InvestmentList}
                options={{
                    headerShown: true,
                    title: getString('investmentContractManagement'),
                }}
            />
            <Investment.Screen
                name="InvestmentDetail"
                component={InvestmentDetail}
                options={{
                    headerShown: true,
                    title: getString('investmentContractManagement'),
                }}
            />
            <Investment.Screen
                name="DetailsContract"
                component={DetailsContractScreen}
                options={{
                    headerShown: true,
                    title: getString('detailsContract'),
                }}
            />
            <Investment.Screen
                name="InformationQuery"
                component={InformationQuery}
                options={{
                    headerShown: true,
                    title: getString('informationQuery'),
                }}
            />
            {/* <Investment.Screen
                name="RequestSuccess"
                component={RequestSuccess}
            /> */}
            <Investment.Screen
                name="ScreenAccount"
                component={ScreenAccount}
                options={{
                    headerShown: true,
                    title: getString('beneficiaryAccount'),
                }}
            />
            {/* <Investment.Screen
                name="DetailsLoanExtension"
                component={DetailsLoanExtension}
                options={{
                    headerShown: true,
                    title: getString('loanExtension'),
                }}
            /> */}
        </Investment.Navigator>
    );
};


export const AppStack = (props: IProps) => {
    const defaultOptions = createDefaultStackNavigationOptions();
    const defaultNotifications = createLeftTitleHeaderOptions(() =>
        props.navigation.goBack(),
    );
    const { panResponder } = useAutoLogout();

    return (
        <View 
        {...panResponder.panHandlers} 
        style={{ flex: 1 }}>
            <Stack.Navigator
                screenOptions={defaultOptions}
                initialRouteName={'AppTab'}
            >
                <Stack.Screen
                    name="AppTab"
                    component={AppTab}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    options={{ title: getString('personal') }}
                    name="InformationVerification"
                    component={InformationVerification}
                />
                <Stack.Screen
                    options={{ title: getString('accountVerification2') }}
                    name="GolferVerification"
                    component={GolferVerification}
                />
                <Stack.Screen
                    options={{ title: getString('assetInformation') }}
                    name="EarningInformation"
                    component={EarningInformation}
                />
                <Stack.Screen
                    options={{ title: getString('informationAccount') }}
                    name="InformationAccount"
                    component={InformationAccount}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="EkycStack"
                    component={EkycMainStack}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="BeneficiaryStack"
                    component={BeneficiaryStack}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="DigitalFinance"
                    component={DigitalFinance}
                />
                <Stack.Screen
                    options={{ title: getString('transactionHistory') }}
                    name="TransactionHistory"
                    component={TransactionHistoryScreen}
                />
                <Stack.Screen
                    options={{ title: getString('interestCalculator') }}
                    name="CalculateProfitStackParamList"
                    component={SelectCalculateProfitTypeScreen}
                />
                <Stack.Screen
                    options={{ title: getString('interestCalculator') }}
                    name="ProductCalculateProfitStackParamList"
                    component={SelectProductCalculateProfitTypeEstimate}
                />
                <Stack.Screen
                    options={{ title: getString('interestCalculator') }}
                    name="InterestInformation"
                    component={InterestInfor}
                />
                <Stack.Screen
                    options={{ title: getString('interestCalculator') }}
                    name="EstimatedInterestRate"
                    component={EstimatedInterestRate}
                />
                <Stack.Screen
                    options={{
                        title: getString('notification'),
                    }}
                    name="Notifications"
                    component={Notifications}
                />
                <Stack.Screen
                    options={{
                        title: getString('notification'),
                        headerStyle: {
                            borderBottomWidth: 1,
                        },
                    }}
                    name="DetailNotifications"
                    component={DetailNotifications}
                />
                <Stack.Screen
                    options={{
                        ...defaultNotifications,
                        title: getString('privacyAndPolicy'),
                    }}
                    name="PrivacyAndPolicy"
                    component={PrivacyAndPolicy}
                />
                <Stack.Screen
                    options={{ title: getString('verifyYourAccount') }}
                    name="IncomeInformation"
                    component={IncomeInformation}
                />
                <Stack.Screen
                    options={{ title: getString('verifyYourAccount') }}
                    name="AssetAuthentication"
                    component={AssetAuthentication}
                />
                <Stack.Screen
                    options={{ title: getString('assetInformation') }}
                    name="AddIncomeInformation"
                    component={AddIncomeInformation}
                />
                <Stack.Screen
                    options={{ title: getString('verifyYourAccount') }}
                    name="ConfirmationOfResidence"
                    component={ConfirmationOfResidence}
                />
                <Stack.Screen
                    options={{ title: getString('addAsset') }}
                    name="AddProperty"
                    component={AddProperty}
                />
                <Stack.Screen
                    name="CenterSupport"
                    component={ScreenCenterSupport}
                />
                <Stack.Screen
                    name={'MapScreen'}
                    component={MapScreen}
                    options={{
                        ...defaultOptions,
                        title: getString('transactionOffice'),
                    }}
                />
                <Stack.Screen
                    name={'ChangePassword'}
                    component={ChangePassword}
                />
                <Stack.Screen name={'DonePassword'} component={DonePassword} />
                <Stack.Screen
                    name="SearchAutocomplete"
                    component={SearchAutocomplete}
                    options={{
                        title: getString('payTheStore'),
                    }}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="T99investStack"
                    component={T99InvestStack}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="T99pawnStack"
                    component={T99PawnStack}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="T99golferStack"
                    component={T99golferStack}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="T99doneProduct"
                    component={T99doneProduct}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="DisbursementStack"
                    component={DisbursementStack}
                />
                <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
                <Stack.Screen
                    name="InvestmentList"
                    component={InvestmentContractStack}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BorrowingContract"
                    component={BorrowingContractStack}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignContract"
                    component={SignContractScreen}
                    options={{
                        headerShown: true,
                        title: getString('signContract'),
                    }}
                />
                <Stack.Screen
                    name="SignLoanContract"
                    component={SignLoanContractScreen}
                    options={{
                        headerShown: true,
                        title: getString('signContract'),
                    }}
                />
                <Stack.Screen
                    name="RequestSuccessContract"
                    component={RequestLoanAmount}
                    options={{
                        headerShown: true,
                        title: getString('signContract'),
                    }}
                />
                <Stack.Screen
                    options={{ title: getString('contractPayments') }}
                    name="ContractPayments"
                    component={ContractPayments}
                />
                <Stack.Screen
                    options={{ title: getString('contractPayments') }}
                    name="PaySomeoneContract"
                    component={PaySomeoneContract}
                />
                <Stack.Screen
                    options={{ title: getString('pay') }}
                    name="PaymentMethod"
                    component={PaymentMethod}
                />
                <Stack.Screen
                    options={{ title: getString('listOfContracts') }}
                    name="Settlement"
                    component={Settlement}
                />
                <Stack.Screen
                    options={{ title: getString('contractSettlement') }}
                    name="ContractSettlementInformation"
                    component={ContractSettlementInformation}
                />
                <Stack.Screen
                    options={{ title: getString('pay') }}
                    name="SelectMethodPay"
                    component={SelectMethodPay}
                />
                <Stack.Screen
                    options={{ title: getString('onlinePayment') }}
                    name="OnlinePayment"
                    component={OnlinePayment}
                />
                <Stack.Screen
                    options={{ title: getString('pay') }}
                    name="SuccessPayment"
                    component={SuccessPayment}
                />
                <Stack.Screen
                    options={{ title: getString('debtPaymentDue') }}
                    name="DebtPaymentDue"
                    component={DebtPaymentDue}
                />
                <Stack.Screen
                    options={{ title: getString('debtPaymentDue') }}
                    name="DebtPaymentDueDetail"
                    component={DebtPaymentDueDetail}
                />
                <Stack.Screen
                    options={{
                        title: getString('partialRepaymentOfPrincipal'),
                    }}
                    name="PartialRepayment"
                    component={PartialRepayment}
                />
                <Stack.Screen
                    options={{
                        title: getString('partialRepaymentOfPrincipal'),
                    }}
                    name="PartialRepaymentDetail"
                    component={PartialRepaymentDetail}
                />
                <Stack.Screen
                    options={{ title: getString('paymentOfInterestAndFees') }}
                    name="InterestFees"
                    component={InterestFees}
                />
                <Stack.Screen
                    options={{ title: getString('paymentOfInterestAndFees') }}
                    name="InterestFeeDetail"
                    component={InterestFeeDetail}
                />
                <Stack.Screen
                    options={{ title: getString('payBankTransfer') }}
                    name="PayTransfer"
                    component={PayTransfer}
                />
                <Stack.Screen
                    options={{
                        headerShown: true,
                        title: getString('payAtStore'),
                    }}
                    name="PayCashStore"
                    component={PayCashStore}
                />
                <Stack.Screen
                    name="Transaction"
                    component={TransactionInvestmentScreen}
                    options={{
                        headerShown: true,
                        title: getString('deal'),
                    }}
                />
                <Stack.Screen
                    name="RequestDisbursement"
                    component={RequestDisbursement}
                    options={{
                        headerShown: true,
                        title: getString('requestDisbursement'),
                    }}
                />
                <Stack.Screen
                    name="LoanExtension"
                    component={LoanExtensionScreen}
                    options={{
                        headerShown: true,
                        title: getString('loanExtension'),
                    }}
                />
                <Stack.Screen
                    name="RequestFeeWaiver"
                    component={RequestFeeWaiverScreen}
                    options={{
                        headerShown: true,
                        title: getString('requestFeeWaiver'),
                    }}
                />
                <Stack.Screen
                    name="RequestChangePayment"
                    component={RequestChangePaymenScreen}
                    options={{
                        headerShown: true,
                        title: getString('requestChangeRepayment'),
                    }}
                />
                <Stack.Screen
                    name="BorrowingContractDetails"
                    component={DetailsContractBorrowing}
                    options={{
                        headerShown: true,
                        title: getString('informationDetails'),
                    }}
                />

                <Stack.Screen
                    name="HistoryPayment"
                    component={HistoryPayment}
                    options={{
                        headerShown: true,
                        title: getString('paymentHistory'),
                    }}
                />
                <Stack.Screen
                    name="Pdf"
                    component={PdfContractScreen}
                    options={{
                        headerShown: true,
                        title: getString('loanContract'),
                    }}
                />
                <Stack.Screen
                    name="DetailsLoanExtension"
                    component={DetailsLoanExtension}
                    options={{
                        headerShown: true,
                        title: getString('loanExtension'),
                    }}
                />
                <Stack.Screen
                    name="EkycSuccess"
                    component={EkycSuccessScreen}
                />
                <Stack.Screen
                    name="BiometricScreen"
                    component={BiometricScreen}
                />
                <Stack.Screen
                    name="RequestSuccess"
                    component={RequestSuccess}
                />
            </Stack.Navigator>
        </View>
    );
};
