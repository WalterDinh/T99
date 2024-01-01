import { StackNavigationProp } from '@react-navigation/stack';
import Images from 'app/assets/images';
import {
    BackgroundImage,
    ImageRenderer,
    TextPrimary,
} from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import UsageLimitCard from 'app/presentation/components/card/UsageLimitCard';
import { getString } from 'app/presentation/localization';
import { T99golfParamList } from 'app/presentation/navigation/routes/routeParams';
import { Dimensions, theme } from 'app/presentation/theme';
import React from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import * as Yup from 'yup';
import { useGetUser } from 'app/presentation/hooks/useGetUser';
import { LinkingHelper } from 'app/shared/helper';
import { HOTLINE } from 'app/shared/constants';

//! Validation Schema
const ValidationSchema = Yup.object().shape({
    loan: Yup.number().required(getString('thisFieldRequired')),
    unit: Yup.string().required(getString('thisFieldRequired')),
    period: Yup.string().required(getString('thisFieldRequired')),
});

interface IProps {
    navigation: StackNavigationProp<T99golfParamList, 'T99GolferStep1'>;
}

const index = (props: IProps) => {
    const { navigation } = props;
    const onSubmit = () => {
        navigation.navigate('T99GolferStep2');
    };
    const userName = useGetUser()?.user?.fullName || '';

    return (
        <View style={styles.container}>
            <BackgroundImage source={Images.Backgrounds.Background}>
                <View style={styles.content}>
                    <UsageLimitCard
                        title={getString('creditLimit')}
                        subtitle={getString('notActivatedYet')}
                        name={userName}
                        styleContainer={styles.containerCard}
                    />
                    <ScrollView
                        style={styles.mainContent}
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                marginTop: 24,
                            }}
                        >
                            <ImageRenderer
                                source={Images.Icons.CardDone}
                                style={styles.img}
                            />
                            <TextPrimary style={styles.textNote}>
                                {getString(
                                    'youAreNotEligibleForAGolferCreditLine',
                                )}
                                .
                            </TextPrimary>
                            <TextPrimary style={styles.textNote}>
                                {getString('pleaseContactCallCenter')}{' '}
                                <TextPrimary
                                    onPress={() => {
                                        LinkingHelper.phoneCall(HOTLINE);
                                    }}
                                    style={[
                                        styles.textNote,
                                        styles.textNoteBold,
                                        {color: theme.color.textColorSecondaryVariant},
                                    ]}
                                >
                                    {getString('hotline')}
                                </TextPrimary>{' '}
                                {getString('forConsultingSupport')}
                            </TextPrimary>
                        </View>
                        <AppButton
                            name={getString('signUpForALimit')}
                            iconRight={Images.Icons.RightIconWhite}
                            iconStyle={styles.iconStyle}
                            styleBtn={styles.btn}
                            onPress={onSubmit}
                        />
                    </ScrollView>
                </View>
            </BackgroundImage>
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: Dimensions.Spacing.large,
    },
    containerCard: {
        marginHorizontal: Dimensions.moderateScale(14),
    },
    mainContent: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant,
        marginTop: Dimensions.Spacing.extraLarge,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    img: {
        height: 180,
        width: 180,
        marginBottom: Dimensions.Spacing.small,
    },
    textNote: {
        color: theme.color.labelColor,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraLarge,
        paddingVertical: Dimensions.Spacing.small,
        textAlign: 'center',
    },
    textNoteBold: {
        fontFamily: theme.font.Bold,
    },
    btn: {
        marginTop: Dimensions.Spacing.small,
        marginBottom: Dimensions.bottomPadding,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});
