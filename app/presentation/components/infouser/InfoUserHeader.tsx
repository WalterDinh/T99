import {
    ImageStyle,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import { ImageRenderer } from 'app/presentation/components';
import { Dimensions, theme } from 'app/presentation/theme';
import Img from '../../../assets/images';
import InfoUserBase from './InfoUserBase';
import FormNoti, { NotiType } from '../notification/FormNoti';

export enum AccountType {
    Standard = 'standard',
    Pro = 'pro',
    Golfer = 'golfer',
}

interface IProps {
    name: string;
    id: number;
    onClickAvatar: () => void;
    accountType?: AccountType;
    styleContainer?: StyleProp<ViewStyle>;
    sourceAvatar?: any;
    unread?: boolean;
    sourceIconLeft?: string | React.ReactElement<View>,
    onPressIconLeft?: () => void;
    sourceIconRight?: string | React.ReactElement<View>,
    onPressIconRight?: () => void;
    styleBgIconRight?: StyleProp<ViewStyle>;
    styleIconRight?: StyleProp<ImageStyle>;
    notiType?: NotiType;
    titleNoti?: string;

}



const InfoUserHeader = (props: IProps) => {
    const { name, id, onClickAvatar, accountType, styleContainer,
        sourceAvatar, unread, sourceIconLeft, onPressIconLeft,
        sourceIconRight, onPressIconRight, styleBgIconRight, styleIconRight,
        notiType, titleNoti,
    } =
        props;

    return (
        <View style={styles.header}>
            <View style={styles.headerInfo}>
                <InfoUserBase
                    name={name}
                    id={id}
                    onClickAvatar={onClickAvatar}
                    accountType={accountType}
                    styleContainer={styleContainer}
                    sourceAvatar={sourceAvatar}
                    sourceIconLeft={sourceIconLeft}
                    onPressIconLeft={onPressIconLeft}
                    sourceIconRight={
                        <TouchableOpacity onPress={onPressIconRight}>
                            <View
                                style={[styles.notification, styleBgIconRight]}
                            >
                                <ImageRenderer
                                    source={sourceIconRight || Img.Icons.Notification}
                                    style={[styles.iconNoti,styleIconRight]}
                                />
                                {!!unread && <View style={styles.unread}></View>}
                            </View>
                        </TouchableOpacity>
                    }
                    onPressIconRight={onPressIconRight}
                    styleIconRight={styleIconRight}
                />
                {!!notiType && <FormNoti
                    notiType={notiType}
                    title={titleNoti || ''}
                    styleContainer={{ marginTop: 12, borderRadius: 25 }}
                />}
            </View>
            <View style={styles.footerHeader}></View>
        </View>
    );
};

export default InfoUserHeader;

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
    header: {
        backgroundColor: theme.color.backgroundColorVariant,
    },
    headerInfo: {
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingBottom: Dimensions.Spacing.large,
    },
    btnTitle: {
        flexDirection: 'row',
    },
    titleBtnTitle: {
        paddingRight: Dimensions.Spacing.tiny,
        color: theme.color.textColorSecondaryVariant,
        fontSize: Dimensions.FontSize.small,
        fontFamily: theme.font.Regular,
        lineHeight: 16,
    },
    iconTitle: {
        height: 16,
        width: 16,
    },
    content: {
        marginTop: Dimensions.Spacing.large,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    titleFeature: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.textColor,
        lineHeight: 25,
    },
    footerHeader: {
        height: 8,
        backgroundColor: theme.color.backgroundColorSecondaryVariant,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    notification: {
        justifyContent: 'center',
        alignItems: 'center',
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
