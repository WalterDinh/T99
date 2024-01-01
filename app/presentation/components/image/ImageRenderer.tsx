import Images from 'app/assets/images/index';
import React from 'react';
import { ActivityIndicator, Image, ImageStyle, StyleProp, StyleSheet, View } from 'react-native';
import FastImage, { ResizeMode } from 'react-native-fast-image';
import styled from 'styled-components';

export interface Props {
    source?: string | number | object;
    hideLoadingIndicator?: boolean;
    style?: StyleProp<ImageStyle>;
    resizeMode?: ResizeMode;
}

interface State {
    loaded: boolean;
    isError: boolean;
}

export default class ImageRenderer extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loaded: false,
            isError: false
        };
    }

    onLoad = () => {
        this.setState({
            loaded: true
        });
    };

    componentDidUpdate(prevProps: any) {
        const { isError } = this.state;
        if (isError && prevProps.source !== this.props.source) {
            this.setState({ isError: false });
        }
    }

    handleError = () => {
        this.setState({ isError: true });
    }

    renderImageWithPlaceholder = (source: any) => {
        const { style , hideLoadingIndicator, ...rest } = this.props;
        const { loaded, isError } = this.state;
        const isStaticSource = typeof source === 'number';
        if (isError) {
            return <Image
                resizeMode={'contain'}
                {...rest}
                style={[{
                    width: '100%',
                    height: '100%'
                }, style]}
                source={Images.Default.FallImage}
            />;
        }
        return <View style={style}>
            {!loaded && !hideLoadingIndicator && !isStaticSource ? <BackgroundLoading>
                <ActivityIndicator animating size={'small'} color={'gray'} />
            </BackgroundLoading> : null}
            {!isStaticSource ?
                <FastImage
                    resizeMode={'contain'}
                    {...rest}
                    onError={this.handleError}
                    source={source}
                    style={[styles.image, style as any]}
                    onLoad={this.onLoad}
                /> : <Image
                    resizeMode={'contain'}
                    {...rest}
                    source={source}
                    style={[styles.image, style]}
                />
            }
        </View>;
    };


    render() {
        const { source } = this.props;
        let _source: any;
        if (source) {
            if (typeof source === 'string' && (source.startsWith('http'))) {
                _source = {
                    uri: source,
                    priority: FastImage.priority.normal
                };
            } else {
                _source = source;
            }
        } else {
            _source = Images.Default.FallImage
        }
        return this.renderImageWithPlaceholder(_source);
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    }
});

const BackgroundLoading = styled.View`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        justifyContent: center;
        alignItems: center;
    `;
