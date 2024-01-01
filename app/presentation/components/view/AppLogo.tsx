import { Images } from 'app/presentation/theme';
import React from 'react';
import styled from 'styled-components';

interface IProps {
    style?: any;
    onPress?: () => void;
}

export const AppLogo = React.memo((props: IProps) => {
    const { style, onPress } = props;
    return <ViewContainer onPress={onPress} style={style} activeOpacity={0.8}>
        <Logo resizeMode={'contain'} source={Images.Icons.Close} />
    </ViewContainer>;
});

const ViewContainer = styled.TouchableOpacity`
    
`;

const Logo = styled.Image`
    width: 125;
    height: 31;
    tintColor: #000;
`;