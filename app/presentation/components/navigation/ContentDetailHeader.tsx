import {Dimensions, Images, theme} from 'app/presentation/theme';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import styled from 'styled-components';
import {Row} from '..';

interface IProps {
    onBackPress: () => void;
    onRightPress?: () => void;
    hideRight?: boolean;
    style?: any;
    overlay: boolean;
    light: boolean;
    lightImage?: boolean;
    rightComponent?: React.ReactElement | React.ReactElement[];
}

export const ContentDetailHeader = React.memo((props: IProps) => {
    const {onBackPress, onRightPress, style, overlay, hideRight = false, light, rightComponent, lightImage} = props;
    return <ViewContainer align='center' style={[overlay ? styles.overlay : undefined, style]}>
        <Button onPress={onBackPress} activeOpacity={0.8}>
            <BackIcon
                resizeMode={'contain'}
                source={Images.Icons.Back}
                style={[styles.share, {tintColor: light ? theme.color.colorPrimary : lightImage ? 'black' : '#fff'}]}
            />
        </Button>
        {!hideRight && !rightComponent ? <Button onPress={onRightPress} activeOpacity={0.8}>
            <BackIcon
                resizeMode={'contain'}
                source={Images.Icons.Close}
                style={[styles.share, {tintColor: light ? theme.color.colorPrimary : '#fff'}]}
            />
        </Button> : null}
        {rightComponent}
    </ViewContainer>;
});

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: Platform.select({
            ios: Dimensions.getStatusBarHeight(true),
            android: 0
        })
    },
    share: {
        height: 25,
        width: 25
    }
});

const ViewContainer = styled(Row)`
    paddingHorizontal: ${Dimensions.Spacing.extraLarge};
    justifyContent: space-between;
    alignItems: center;
`;

const BackIcon = styled.Image`
    width: 32;
    height: 32;
    paddingHorizontal: ${Dimensions.Spacing.small};
`;

const Button = styled.TouchableOpacity`
    paddingHorizontal: 5;
    paddingVertical: 15;
`;