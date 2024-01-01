import {
    ImageStyle,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import { Dimensions, theme } from 'app/presentation/theme';
import Img from '../../../assets/images';
import StatusActive from 'app/presentation/components/items/StatusActive';
import { CheckStatusActive } from 'app/shared/constants';
import { getString } from 'app/presentation/localization';
import { AccountType } from './InfoUser';

interface IProps {
    name: string;
    id: number;
    onClickAvatar?: () => void;
    accountType?: AccountType;
    styleContainer?: StyleProp<ViewStyle>;
    sourceAvatar?: any;
    sourceIconLeft?: string | React.ReactElement<View>,
    onPressIconLeft?: () => void;
    sourceIconRight?: string | React.ReactElement<View>,
    onPressIconRight?: () => void;
    styleIconRight?: StyleProp<ImageStyle>;
    disabled?: boolean
}

const InfoUserBase = (props: IProps) => {
    const { name, accountType, id, sourceAvatar, styleContainer, onClickAvatar, styleIconRight, onPressIconRight, sourceIconLeft, onPressIconLeft, sourceIconRight, disabled } =
        props ?? {};
    const checkType = () => {
        switch (accountType) {
            case AccountType.Standard:
                return (
                    <StatusActive
                        title={getString('t99Standard')}
                        styleIn={styles.typeAccount}
                        status={CheckStatusActive.HalfGray}
                        styleTitle={styles.textTypeAccount}
                    />
                );
            case AccountType.Pro:
                return (
                    <StatusActive
                        title={getString('t99Pro')}
                        styleIn={styles.typeAccount}
                        status={CheckStatusActive.Green}
                        styleTitle={styles.textTypeAccount}
                    />
                );

            case AccountType.Golfer:
                return (
                    <StatusActive
                        title={getString('t99Golfer')}
                        styleIn={styles.typeAccount}
                        status={CheckStatusActive.Red}
                        styleTitle={styles.textTypeAccount}
                    />
                );

            default:
                null;
        }
    };

    return (
        <View style={[styles.container, styleContainer]}>
            {(!!sourceIconLeft  && (typeof sourceIconLeft === 'string' || typeof sourceIconLeft === 'number')) && <TouchableOpacity onPress={onPressIconLeft}>
                <ImageRenderer source={sourceIconLeft} style={styles.imgIconLeft} />
            </TouchableOpacity>}
            {(!!sourceIconLeft && typeof sourceIconLeft !== 'string' && typeof sourceIconLeft !== 'number' ) && sourceIconLeft}

            <View style={styles.infoUser}>
                <TouchableOpacity disabled={disabled} onPress={onClickAvatar}>
                    <ImageRenderer
                        source={sourceAvatar || Img.Icons.ProfileCircle}
                        style={styles.image}
                        resizeMode={'cover'}
                    />
                </TouchableOpacity>

                <View style={styles.text}>
                    <TextPrimary style={styles.title}>{name}</TextPrimary>
                    <View style={styles.description}>
                        {checkType()}
                        <TextPrimary style={styles.id}>ID: {id}</TextPrimary>
                    </View>
                </View>
            </View>

            {(!!sourceIconRight && (typeof sourceIconRight === 'string' || typeof sourceIconRight === 'number')) &&
                <TouchableOpacity onPress={onPressIconRight}>
                    <ImageRenderer source={sourceIconRight} style={[styles.iconNoti, styleIconRight]} />
                </TouchableOpacity>}
            {(!!sourceIconRight && (typeof sourceIconRight !== 'string' || typeof sourceIconRight !== 'number')) && sourceIconRight}

        </View>
    );
};


export default InfoUserBase;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgIconLeft: {
        width: 18,
        height: 18,
        marginRight: 8,
    },
    image: {
        height: 48,
        width: 48,
        borderRadius: 24,
    },
    infoUser: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        paddingLeft: Dimensions.Spacing.medium,
    },
    title: {
        marginBottom: Dimensions.Spacing.tiny,
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.extraLarge,
        color: theme.color.textColor,
        lineHeight: 22,
        letterSpacing: -0.41,
    },
    description: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeAccount: {
        marginRight: Dimensions.Spacing.small,
        paddingHorizontal: Dimensions.Spacing.small,
        paddingVertical: Dimensions.Spacing.tiny,
        borderRadius: 26,
    },
    textTypeAccount: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.semiSmall,
        lineHeight: 14,
    },
    id: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
        color: theme.color.disabledColor,
        lineHeight: 16,
    },
    notification: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color.backgroundColorSecondaryVariant,
        marginLeft: Dimensions.Spacing.large,
        padding: Dimensions.Spacing.small,
        borderRadius: 20,
    },
    iconNoti: {
        height: 24,
        width: 24,
    },
    unread: {
        position: 'absolute',
        top: 5,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.color.colorPrimaryVariant,
    },

});
