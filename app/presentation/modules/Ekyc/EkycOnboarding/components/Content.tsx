import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Dimensions from 'app/presentation/theme/Dimensions';
import { theme } from 'app/presentation/theme';
import {
    ImageRenderer,
    TextPrimary,
} from 'app/presentation/components';
import Images from 'app/assets/images/index';
import { getString } from 'app/presentation/localization';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';

const ContentEkycOnboarding = (props: { onPress: () => void }) => {
    const { onPress } = props;
    const renderItem = (
        type: 'card' | 'user',
        isLastItem: boolean,
        title: string,
    ) => {
        return (
            <View style={{ alignItems: 'center', marginTop: 8 }}>
                <View style={styles.borderIcon}>
                    <ImageRenderer
                        resizeMode="contain"
                        style={styles.icon}
                        source={
                            type == 'card'
                                ? Images.Icons.CardCircle
                                : Images.Icons.UserCircle
                        }
                    />
                </View>

                <TextPrimary style={styles.label}>{title}</TextPrimary>
                {!isLastItem && (
                    <ImageRenderer
                        resizeMode="contain"
                        style={styles.iconArrow}
                        source={Images.Icons.LongArrowDown}
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxContent}>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                    {renderItem(
                        'card',
                        false,
                        getString('verifyIdentityDocument'),
                    )}
                    {renderItem('user', false, getString('verifyFaceId'))}
                    {renderItem(
                        'card',
                        true,
                        getString('confirmTheValidationResult'),
                    )}
                </ScrollView>
            </View>
            <AppButton
                onPress={onPress}
                name={getString('verifyNow')}
                type={ButtonType.CircleBorderRed}
            />
        </View>
    );
};

export default React.memo(ContentEkycOnboarding);

const styles = StyleSheet.create({
    label: {
        fontSize: Dimensions.FontSize.large,
        paddingVertical: 8,
    },
    container: {
        paddingHorizontal: 22,
        backgroundColor: 'white',
        flex: 1,
        paddingBottom: Dimensions.bottomPadding,
    },
    boxContent: {
        alignItems: 'center',
        flex: 1,
        marginTop: 20,
        paddingHorizontal: Dimensions.moderateScale(40),
    },
    icon: {
        width: Dimensions.moderateScale(44),
        height: Dimensions.moderateScale(44),
    },
    iconArrow: {
        width: Dimensions.moderateScale(24),
        height: Dimensions.moderateScale(24),
    },
    borderIcon: {
        width: Dimensions.moderateScale(44),
        height: Dimensions.moderateScale(44),
    },
    dot: {
        width: 24,
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.color.backgroundColorVariant,
    },
    inactiveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.color.colorFourth,
    },
});
