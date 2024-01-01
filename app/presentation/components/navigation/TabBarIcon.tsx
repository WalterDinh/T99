import {theme} from 'app/presentation/theme';
import EventEmitter, {EventNames} from 'app/shared/helper/EventEmitter';
import React, {useEffect, useState} from 'react';
import {ImageResizeMode} from 'react-native';
import styled from 'styled-components';

interface IProps {
    source: number;
    style?: any;
    resizeMode?: ImageResizeMode;
    name: string;
}

export const TabBarIcon = React.memo((props: IProps) => {
    const {style, source, resizeMode, name} = props;
    const [badge, setBadge] = useState(0);
    useEffect(() => {        
        const subscription = EventEmitter.addListener(EventNames.updateTabBarBadge, data => {
            const {name: tabName, count} = data;
            if(tabName === name) {
                setBadge(count);
            }
        });
        return () => {
            subscription.remove();
        };
    }, [name, setBadge]);
    return <ViewContainer>
        <Icon style={style} source={source} resizeMode={resizeMode} />
        {badge ? <Badge>
        </Badge> : null
        }
    </ViewContainer>;
});

const ViewContainer = styled.View`
`;

const Icon = styled.Image`
    width: 23;
    height: 23;
`;

const Badge = styled.View`
    position: absolute;
    right: -6;
    top: -8;
    backgroundColor: ${theme.color.colorPrimaryVariant};
    borderRadius: 10;
    width: 20;
    height: 20;
    justifyContent: center;
    alignItems: center;
    borderWidth: 2;
    borderColor: #ffffff;
`;