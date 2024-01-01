import {Dimensions, theme} from 'app/presentation/theme';
import React from  'react';
import styled from 'styled-components';
import {TextPrimary} from '..';

interface IProps {
    containerStyle?: any;
    loading: boolean;
}

export const EmptyPage = React.memo((props: IProps) => {
    const {containerStyle, loading} = props;
    if(loading) return null;
    return <ViewContainer style={containerStyle}>
        <Content>Could not load page.</Content>
    </ViewContainer>;
});

const ViewContainer = styled.View`
    width: 100%;
    height: 100%;
    justifyContent: center;
    alignItems: center;
`;

const Content = styled(TextPrimary)`
    color: ${theme.color.labelColor};
    fontSize: ${Dimensions.FontSize.large};
`;