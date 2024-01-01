import {getConfig} from 'app/config';
import {Images} from 'app/presentation/theme';
import React, {ForwardedRef, useCallback} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import Input, {IProps as IInputProps} from './Input';

interface IProps extends IInputProps {
    viewContainerStyle?: any;
    onPress: () => void;
}

export const InputDropdown = React.forwardRef((props: IProps, ref: ForwardedRef<TextInput>) => {
    const {onPress, viewContainerStyle, key, editable, ...rest} = props;

    const configs = getConfig();

    const iconRight = useCallback(() => {
        return <RightIcon
            resizeMode={'contain'}
            source={Images.Icons.AngleDown}
        />
    }, []);

 
    return <TouchableOpacity style={viewContainerStyle} activeOpacity={0.8} onPress={onPress} disabled={editable === false}>
        <Input
            iconRight={iconRight()}
            inputContainerStyle={styles.containerInputStyle}
            pointerEvents="none"
            inputStyle={styles.dropdownInput}
            onTouchEnd={editable ? onPress : undefined}
            {...rest}
            key={key ?? undefined}
            // @ts-ignore
            ref={ref}
            editable={false}
            ignoreDisableStyle
        />
    </TouchableOpacity>;
});

const styles = StyleSheet.create({
    dropdownInput: {
        textTransform: 'capitalize',
    },
    rightIcon: {
        width: 12,
        height: 12,
        marginTop: -10
    },
    containerInputStyle: {
        paddingRight: 0,
    }
});

const RightIcon = styled.Image`
    width: 12;
    height: 12;
`;
