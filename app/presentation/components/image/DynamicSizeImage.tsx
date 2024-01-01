import {Images} from 'app/presentation/theme';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ImageResizeMode} from 'react-native';
import styled from 'styled-components';

interface IProps {
    imageSource: string;
    maxHeight: number;
    preferSquareSize?: number;
    preferSquareSource?: string;
    style?: any;
    placeholderStyle?: any;
    resizeMode?: ImageResizeMode;
}

// TODO: Not ready for common use. Currently use in offer only
export const DynamicSizeImage = React.memo((props: IProps) => {
    const {style, placeholderStyle, resizeMode, imageSource, maxHeight, preferSquareSize, preferSquareSource} = props;
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Image.getSize(imageSource, (_width: number, _height: number) => {
            setLoading(false);
            const ratio = _width / _height;
            // Consider is quare
            if (ratio > 0.9 && ratio < 1.1 && preferSquareSize) {
                setWidth(preferSquareSize);
                setHeight(preferSquareSize);
                return;
            }
            const height = maxHeight;
            const width = height * ratio; 
            setWidth(width);
            setHeight(height);
        }, error => {
            setLoading(false);
        });
    }, [imageSource, setWidth, setHeight, maxHeight, preferSquareSize]);

    if(loading) {
        return <LoadingContainer>
            <ActivityIndicator animating size={'small'} color={'gray'} />
        </LoadingContainer>;
    }

    if (!width || !height) {
        return <PlaceholderImage 
            style={placeholderStyle}
            resizeMode='contain'
            source={Images.Icons.Close}
        />
    }

    return <Image
        style={[style, {
            width,
            height
        }]}
        resizeMode={resizeMode ?? 'contain'}
        source={{uri: width === height && preferSquareSource ? preferSquareSource : imageSource}}
    />
});

const LoadingContainer = styled.View`
    height: 30;
    width: 30;
`;

const PlaceholderImage = styled.Image`
    width: 30;
    height: 30;
`;