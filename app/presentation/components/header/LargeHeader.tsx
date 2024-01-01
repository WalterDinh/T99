import {Dimensions, theme} from 'app/presentation/theme';
import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import TextPrimary from '../text/TextPrimary';
import Row from '../view/Row';

interface IProps {
    title?: string
    children?: React.ReactElement | React.ReactElement[];
    style?: any;
    overlay?: boolean;
    useNoSafeAreaTop?: boolean;
}

const PADDING_TOP = Dimensions.getStatusBarHeight(true) + Dimensions.Spacing.medium;

export const LargeHeader = React.memo((props: IProps) => {
    const {title, style, children, overlay, useNoSafeAreaTop} = props;
    return <Row style={[overlay ? styles.overlayContainer : styles.container, useNoSafeAreaTop ? {paddingTop: Dimensions.Spacing.medium} : undefined, style]}
        justify={'space-between'}
        align={'center'}
    >
        {children ?? <LargeHeaderTitle>{title ?? ''}</LargeHeaderTitle>}
    </Row>;
});

const styles = StyleSheet.create({
    container: {
        paddingRight: Dimensions.Spacing.huge,
        paddingTop: PADDING_TOP,
        paddingLeft: Dimensions.Spacing.extraHuge,
    },
    overlayContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        paddingRight: Dimensions.Spacing.huge,
        paddingTop: PADDING_TOP,
        paddingLeft: Dimensions.Spacing.extraHuge,
        zIndex: 1000,
    }
});

export const LargeHeaderTitle = styled(TextPrimary)`
    fontFamily: ${theme.font.SemiBold};
    fontSize: 28;
`;