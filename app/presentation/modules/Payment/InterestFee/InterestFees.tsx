import { StackNavigationProp } from '@react-navigation/stack';
import CommonCard from 'app/presentation/components/card/CommonCard';
import InputSearchAndFilter from 'app/presentation/components/input/InputSearchAndFilter';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckModeHeader } from 'app/shared/constants';
import React from 'react';
import { FlatList, View } from 'react-native';
import { stylesInterestFee } from './style';
interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'InterestFees'>;
}
const InterestFees = (props: IProps) => {
    const { navigation } = props;

    const renderItem = ({ item, index }: any) => {
        return (
            <CommonCard
                onPress={() => navigation.navigate('InterestFeeDetail')}
                styleCommonCard={stylesInterestFee.formItem}
                key={index}
                checkMode={CheckModeHeader?.TwoActive}
                dataCard={[
                    {
                        styleTitle: {
                            color: Colors.secondary.brand,
                            fontSize: Dimensions.moderateScale(17),
                            lineHeight: Dimensions.moderateScale(22),
                            fontFamily: theme.font.Medium,
                        },
                        fixTitle: index % 2 ? 'T99_Pawn' : 'T99_Golf',
                    },
                    {
                        title: getString('contractCode'),
                        styleTitle: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Regular,
                        },
                        value: 'A3004563',
                        styleValue: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Medium,
                        },
                    },
                    {
                        title: getString('dateDue'),
                        styleTitle: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Regular,
                        },
                        value: '25/06/2022',
                        styleValue: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Medium,
                        },
                    },
                ]}
            />
        );
    };
    return (
        <View>
            <InputSearchAndFilter onPressFilter={() => {}} />
            <FlatList data={[1, 2]} renderItem={renderItem} />
        </View>
    );
};
export default InterestFees;

