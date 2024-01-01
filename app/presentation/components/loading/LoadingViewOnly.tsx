import TextPrimary from 'app/presentation/components/text/TextPrimary';
import {Dimensions} from 'app/presentation/theme';
import Utilities from 'app/shared/helper/utilities';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import styled from 'styled-components';
import {getString} from '../../localization';


interface IProps {
    loadingText?: string;
}

interface IState {
    loading: boolean;
}

class LoadingViewOnly extends React.PureComponent<IProps, IState> {

    static defaultProps = {};

    _timer?: NodeJS.Timeout;

    constructor(props: IProps) {
        super(props);

        this.state = {
            loading: false
        };
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    setLoading = (loading: boolean) => {
        if(loading !== this.state.loading) {
            this.setState({
                loading
            });

            this.setTimerForLoading();
        }
    };

    clearTimer = () => {
        if(this._timer) {
            clearTimeout(this._timer);
        }
    };

    setTimerForLoading = () => {
        this.clearTimer();
        this._timer = setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 30 * 1000);
    };

    _renderLoading = () => {
        const {loadingText} = this.props;
        const _loadingText = loadingText ? loadingText : `${getString('loading')}`;
        return (
            <View style={styles.loadingContainer}>
                <LoadingText>{_loadingText}</LoadingText>
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator animating={true} size='large' color='#fff' />
                </View>
            </View>
        );
    };

    render() {
        if(this.state.loading) {
            return (
                <View
                    style={styles.container}
                    // @ts-ignore
                    testID={Utilities.generateTestID('Global', 'overlay-loading-container')}
                >
                    {this._renderLoading()}
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff90',
        zIndex: 999
    },

    loadingContainer: {
        padding: 12,
        width: 95,
        aspectRatio: 1,
        backgroundColor: '#000',
        borderRadius: 8,
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingText: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        fontSize: Dimensions.moderateScale(22)
    },

    spinnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        marginTop: 4
    }
});

const LoadingText = styled(TextPrimary)`
  color: #fff;
  textAlign: center;
  fontSize: ${Dimensions.FontSize.medium};
`;


export default LoadingViewOnly;


