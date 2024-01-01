import {
    ImageStyle,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ImageRenderer } from 'app/presentation/components';
import { Dimensions, theme } from 'app/presentation/theme';
import Img from '../../../assets/images';
import InfoUserBase from './InfoUserBase';
import TextPrimary from '../text/TextPrimary';
import { useGetUser } from 'app/presentation/hooks/useGetUser';

export enum AccountType {
    Standard = 'standard',
    Pro = 'pro',
    Golfer = 'golfer',
}

interface IProps {
    name?: string;
    accountType?: AccountType;
    style?: StyleProp<ViewStyle>;
    styleNoti?: StyleProp<ViewStyle>;
    sourceAvatar?: any;
    unread?: boolean;
    onClickAvatar: () => void;
    onPressIconRight: () => void;
    styleBgIconRight?: StyleProp<ViewStyle>;
    styleIconRight?: StyleProp<ImageStyle>;
    styleContainer?: StyleProp<ViewStyle>;
    sourceIconRight?: string | React.ReactElement<View>;
}

const InfoUser = (props: IProps) => {
    const {
        name,
        accountType,
        sourceAvatar,
        style,
        styleContainer,
        unread,
        onClickAvatar,
        sourceIconRight,
        onPressIconRight,
        styleBgIconRight,
        styleIconRight,
    } = props ?? {};
    const sumNotification = 4;

    const userName = useGetUser()?.user?.fullName || '';
    const avatar = useGetUser()?.user?.avatar || '';
    const id = useGetUser()?.user?.cif || '';
    return (
        <TouchableOpacity
            onPress={onClickAvatar}
            style={[styles.container, style]}
        >
            <InfoUserBase
                name={userName}
                id={id}
                disabled
                accountType={accountType}
                styleContainer={styleContainer}
                sourceAvatar={avatar}
                sourceIconRight={
                    <TouchableOpacity onPress={onPressIconRight}>
                        <View style={[styles.notification, styleBgIconRight]}>
                            <ImageRenderer
                                source={
                                    sourceIconRight || Img.Icons.Notification
                                }
                                style={[styles.iconNoti, styleIconRight]}
                            />
                            {!!unread && (
                                <View
                                    style={
                                        !!sumNotification
                                            ? styles.unread
                                            : styles.mark
                                    }
                                >
                                    {!!sumNotification && (
                                        <TextPrimary
                                            style={styles.numberUnRead}
                                        >
                                            {sumNotification}
                                        </TextPrimary>
                                    )}
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                }
                onPressIconRight={onPressIconRight}
                styleIconRight={styleIconRight}
            />
        </TouchableOpacity>
    );
};

export default InfoUser;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.color.backgroundColorVariant,
        paddingHorizontal: Dimensions.Spacing.medium,
        paddingVertical: Dimensions.Spacing.small,
        borderRadius: 4,
        shadowColor: theme.color.colorSecondary,

        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 5,
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
        top: 2,
        left: 20,
        minWidth: 16,
        minHeight: 16,
        borderRadius: 8,
        backgroundColor: theme.color.colorPrimaryVariant,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mark: {
        position: 'absolute',
        top: 5,
        right: 6,
        minWidth: 8,
        minHeight: 8,
        borderRadius: 4,
        backgroundColor: theme.color.colorPrimaryVariant,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberUnRead: {
        color: theme.color.textColorVariant,
        fontSize: Dimensions.FontSize.small,
    },
});
