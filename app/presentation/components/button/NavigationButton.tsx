import {Dimensions} from 'app/presentation/theme';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {TextPrimary} from '..';

interface IProps {
    onPress: () => void;
    title?: string;
    titleStyle?: any;
    icon?: React.ReactElement | number;
    iconStyle?: any;
}

export const NavigationButton = React.memo((props: IProps) => {
    const {onPress, title, icon, iconStyle, titleStyle} = props;
    let _icon: React.ReactElement | undefined;
    if(typeof icon === 'number') {
        _icon = <Image style={[styles.icon, iconStyle]} resizeMode={'contain'} source={icon} />
    }
    return <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
        {title ? <TextPrimary style={titleStyle}>{title}</TextPrimary> : null}
        {_icon}
    </TouchableOpacity>
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Dimensions.Spacing.small,
    },
    title: {
        marginRight: Dimensions.Spacing.small
    },
    icon: {
        width: 20,
        height: 20
    }
});