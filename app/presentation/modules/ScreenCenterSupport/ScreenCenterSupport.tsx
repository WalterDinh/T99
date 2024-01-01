import { StackNavigationProp } from '@react-navigation/stack';
import images from 'app/assets/images';
import { TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import {
    AppStackParamList
} from 'app/presentation/navigation/routes/routeParams';
import { Colors, theme } from 'app/presentation/theme';
import { neutral, primary, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { HOTLINE, LinkT99Web, OnlineContact } from 'app/shared/constants';
import { LinkingHelper } from 'app/shared/helper';
import React from 'react';
import {
    ImageBackground, ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import styled from 'styled-components';
import FormMedia from './FormMedia';
import FormOnline from './FormOnline';
interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'CenterSupport'>;
}
const ScreenCenterSupport = (props: IProps) => {
    //! State
    const { navigation } = props;
    //! Function
    const onPressOnline = (type: string) => {
        if(type === OnlineContact.Website ){
            navigation.navigate('WebViewScreen', { url: LinkT99Web });
        }
        if(type === OnlineContact.Email ){
            LinkingHelper.mailTo('info@t99.vn')
        }
        if(type === OnlineContact.Phone ){
            LinkingHelper.phoneCall(HOTLINE);
        }
    }
    //! Render
    return (
        <View style={styles.container}>
            <ImageBackground
                source={images.Backgrounds.Background}
                resizeMode="stretch"
                style={styles.imageBackground}
            >
                <ScrollView style={styles.formContent}>
                    <View style={styles.formSubCenterSup}>
                        <TextPrimary style={styles.textSubCenterSup}>
                            {getString('doYouNeedHelp')}
                        </TextPrimary>
                    </View>

                    <FormOnline onPressOnline={onPressOnline} />

                    <TextPrimary style={styles.title}>
                        {getString('transactionOffice')}
                    </TextPrimary>
                    <View style={styles.addressDefault} >
                        <ImageIconCircle
                            source={images.Icons.location}
                            style={{ width: 24, height: 24 }}
                        />
                        <TextPrimary style={styles.addressDefaultTitle} >{getString('address2')}</TextPrimary>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('MapScreen')
                    }} style={styles.listTransactions} >
                        <TextPrimary style={styles.listTransactionsTitle}>{getString('listTransactionOffice')}</TextPrimary>
                        <ImageIconCircle
                            source={images.Icons.ListTransaction}
                            style={{ width: 20, height: 20, marginLeft: 8 }}
                        />
                    </TouchableOpacity>
                    <FormMedia />
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

export default ScreenCenterSupport;
const ImageIconCircle = styled.Image``;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
    },
    title: {
        textTransform: 'uppercase',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.moderateScale(18),
        color: primary.brand,
        marginBottom: Dimensions.moderateScale(15),
    },
    imageBackground: {
        flex: 1,
    },
    formContent: {
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    formCenterSupport: {
        paddingTop: Dimensions.moderateScale(20),
        paddingBottom: Dimensions.moderateScale(12),
    },
    textCenterSup: {
        fontSize: Dimensions.moderateScale(34),
        lineHeight: Dimensions.moderateScale(41),
        fontFamily: theme.font.Regular
    },
    formSubCenterSup: {
        paddingBottom: Dimensions.moderateScale(24),
    },
    textSubCenterSup: {
        fontSize: Dimensions.moderateScale(15),
        lineHeight: Dimensions.moderateScale(22),
        color: Colors.neutral.s400,
    },
    addressDefault: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: neutral.s175,
        borderRadius: Dimensions.Spacing.small,
        paddingHorizontal: Dimensions.Spacing.small,
        paddingVertical: Dimensions.moderateScale(18)
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: neutral.s175,
        borderRadius: Dimensions.moderateScale(10),
        paddingHorizontal: Dimensions.moderateScale(11),
        paddingVertical: Dimensions.moderateScale(17.5),
    },
    addressDefaultTitle: {
        marginLeft: Dimensions.moderateScale(10),
        color: secondary.brand,
        fontSize: Dimensions.FontSize.large,
        flex: 1,
        marginRight: Dimensions.moderateScale(50) 
    },
    listTransactions: {
        marginTop: Dimensions.Spacing.small,
        marginBottom: Dimensions.moderateScale(20),
        flexDirection: 'row',
        justifyContent: 'center' ,
        backgroundColor: neutral.s175,
        borderRadius: Dimensions.Spacing.small,
        paddingVertical: Dimensions.moderateScale(11)
    },
    listTransactionsTitle: {
        color: secondary.brand,
        fontSize: Dimensions.FontSize.large,
    }
});
