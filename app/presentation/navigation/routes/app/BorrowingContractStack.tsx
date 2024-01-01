import { createStackNavigator } from "@react-navigation/stack";
import { getString } from "app/presentation/localization";
import BorrowingContractScreen from "app/presentation/modules/ContractManagement/BorrowingContract";
import DetailsContractBorrowing from "app/presentation/modules/DetailsContractBorrowing";
import InformationQuery from "app/presentation/modules/InformationQuery";
import PaymentPlan from "app/presentation/modules/PaymentPlan";
import TimePayment from "app/presentation/modules/TimePayment";
import { createDefaultStackNavigationOptions } from "../../header/config";
import { ContractParamList } from "../routeParams";
import React from 'react';
import TransactionBorrowingScreen from "app/presentation/modules/TransactionBorrowing";
import RequestDisbursement from "app/presentation/modules/RequestDisbursement";
import LoanExtensionScreen from "app/presentation/modules/LoanExtension";
import RequestFeeWaiverScreen from "app/presentation/modules/RequestFeeWaiver";
import RequestChangePaymentScreen from "app/presentation/modules/RequestChangePaymen";

const BorrowingContract = createStackNavigator<ContractParamList>();

interface IProps {
}
export const BorrowingContractStack = (props: IProps) => {
    const defaultOptions = createDefaultStackNavigationOptions();

    return (
        <BorrowingContract.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'BorrowingContract'}
        >
            <BorrowingContract.Screen
                name="BorrowingContract"
                component={BorrowingContractScreen}
                options={{
                    headerShown: true,
                    title: getString('borrowingContract'),
                }}
            />
            <BorrowingContract.Screen
                name="BorrowingContractDetails"
                component={DetailsContractBorrowing}
                options={{
                    headerShown: true,
                    title: getString('informationDetails'),
                }}
            />
            <BorrowingContract.Screen
                name="InformationQuery"
                component={InformationQuery}
                options={{
                    headerShown: true,
                    title: getString('informationQuery'),
                }}
            />
            <BorrowingContract.Screen
                name="PaymentPlan"
                component={PaymentPlan}
                options={{
                    headerShown: true,
                    title: getString('paymentPlan'),
                }}
            />
            <BorrowingContract.Screen
                name="TimePayment"
                component={TimePayment}
                options={{
                    headerShown: true,
                }}
            />
            <BorrowingContract.Screen
                name="Transaction"
                component={TransactionBorrowingScreen}
                options={{
                    headerShown: true,
                    title: getString('deal'),
                }}
            />
            <BorrowingContract.Screen
                name="RequestDisbursement"
                component={RequestDisbursement}
                options={{
                    headerShown: true,
                    title: getString('requestDisbursement'),

                }}
            />
            <BorrowingContract.Screen
                name="LoanExtension"
                component={LoanExtensionScreen}
                options={{
                    headerShown: true,
                    title: getString('loanExtension'),
                }}
            />
            <BorrowingContract.Screen
                name="RequestFeeWaiver"
                component={RequestFeeWaiverScreen}
                options={{
                    headerShown: true,
                    title: getString('requestFeeWaiver'),
                }}
            />
            <BorrowingContract.Screen
                name="RequestChangePayment"
                component={RequestChangePaymentScreen}
                options={{
                    headerShown: true,
                    title: getString('requestChangeRepayment'),
                }}
            />

        </BorrowingContract.Navigator>
    );
};