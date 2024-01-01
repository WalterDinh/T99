import React, {PureComponent} from 'react';
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {Colors} from 'app/presentation/theme';

const ANDROID_VERSION_LOLLIPOP = 21;

export interface Props {
    buttonStyle?: any;
    shadow?: boolean;
    useTouchableOpacity?: boolean;
    onPress?: () => void;
    disabled?: boolean;
    smoothPress?: boolean;
    style?: any;
    testID?: string;
}

interface State {

}

export default class Button extends PureComponent<Props, State> {

    static defaultProps = {
        smoothPress: true,
        disabled: false,
        useTouchableOpacity: true,
        shadow: false
    };

    constructor(props: Props) {
        super(props);
    }

    onPress = () => {
        const {onPress} = this.props;

        requestAnimationFrame(() => {
            if(onPress) {
                onPress();
            }
        });
    };

    render() {
        const {buttonStyle, shadow, useTouchableOpacity, disabled, style, testID, ...rest} = this.props;
        const shadowStyle = shadow ? styles.shadowButton : {};
        if(Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP && !useTouchableOpacity) {
            return <TouchableNativeFeedback {...rest} disabled={disabled} style={null} onPress={this.onPress}
                background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .1)', false)}>
                {disabled ? <DisabledView style={[shadowStyle, buttonStyle, style]}>{this.props.children}</DisabledView> :
                    <AndroidView style={[shadowStyle, buttonStyle, style]}>{this.props.children}</AndroidView>}
            </TouchableNativeFeedback>;
        }
        return (
            disabled ?
                <DisabledTouchableOpacity testID={testID} activeOpacity={0.8} style={[shadowStyle, buttonStyle, style]}
                    disabled={disabled} {...rest} >
                    {this.props.children}
                </DisabledTouchableOpacity>
                :
                <IOSButton activeOpacity={0.8} onPress={this.onPress} style={[shadowStyle, buttonStyle, style]}
                    disabled={disabled} {...rest} >
                    {this.props.children}
                </IOSButton>
        );
    }
}


const styles = StyleSheet.create({
    shadowButton: {
        shadowColor: Colors.neutral.s900,
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1,
        backgroundColor: '#ffffff',
        marginBottom: 0
    }
});

const IOSButton = styled(TouchableOpacity)`        
    justifyContent: center;
    alignItems: center;
`;

const AndroidView = styled.View`
    justifyContent: center;
    alignItems: center;
    backgroundColor: transparent;
    overflow: hidden;
`;

const DisabledView = styled(AndroidView)`
    opacity: 0.4;    
`;


const DisabledTouchableOpacity = styled(IOSButton)`
    opacity: 0.4;
`;


