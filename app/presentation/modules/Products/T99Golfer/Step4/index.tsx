import { StackNavigationProp } from '@react-navigation/stack'
import { Process } from 'app/presentation/components/process'
import { getString } from 'app/presentation/localization'
import { T99golfParamList } from 'app/presentation/navigation/routes/routeParams'
import { Dimensions, theme } from 'app/presentation/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'
import AdditionalInformationGolfer from '../../Components/AdditionalInformationGolfer'


//! Validation Schema
const ValidationSchema = Yup.object().shape({
    fullName: Yup.number()
        .required(getString('thisFieldRequired')),
    gender: Yup.number()
        .min(0, getString('thisFieldRequired')),
    dateOfBirth: Yup.string()
        .required(getString('thisFieldRequired')),
    phoneNumber: Yup.string()
        .required(getString('thisFieldRequired')),
    documentType: Yup.string()
        .required(getString('thisFieldRequired')),
    documentCode: Yup.string()
        .required(getString('thisFieldRequired')),
    email: Yup.string()
        .required(getString('thisFieldRequired')),
    province: Yup.string()
        .required(getString('thisFieldRequired')),
    district: Yup.string()
        .required(getString('thisFieldRequired')),
    detailedAddress: Yup.string()
        .required(getString('thisFieldRequired')),

});

interface IProps {
    navigation: StackNavigationProp<
        T99golfParamList,
        'T99GolferStep4'
    >;
}

const index = (props: IProps) => {
    const { navigation } = props

    const onSubmit = (values: object) => {
        navigation.navigate('T99GolferStep5')
    }
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <Process
                infoStyles={styles.process}
                styleProcess={{ marginTop: Dimensions.Spacing.extraLarge }}
                title={getString('additionalInformation')}
                totalScreen={3}
                screenPosition={3}
            />
            <View style={styles.content}>
                <AdditionalInformationGolfer
                    initValues={
                        {
                            monthlyRevenue: '',
                            job: '',
                            incomeSource: '',
                            province: '',
                            district: '',
                            detailedAddress: '',

                            fullName1: '',
                            relationship1: '',
                            phoneNumber1: '',

                            fullName2: '',
                            relationship2: '',
                            phoneNumber2: '',

                            salesStaffCode: '',
                        }
                    }
                    onSubmit={onSubmit}
                />
            </View >
        </KeyboardAwareScrollView >
    )
}

export default index

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
})