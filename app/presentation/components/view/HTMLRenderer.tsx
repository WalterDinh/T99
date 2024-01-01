import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import HTML, {CustomRendererProps, RenderHTMLProps, TBlock} from 'react-native-render-html';
import WebView from 'react-native-webview';
import LinkingHelper from '../../../shared/helper/LinkingHelper';
import {Dimensions, theme} from '../../theme';
import ImageRenderer from '../image/ImageRenderer';

interface IProps extends RenderHTMLProps {
    htmlContent?: string;
    onLinkPress?: (evt: any, href: string) => void;
    webViewStyle?: any;
    imageStyle?: any;
    contentStyle?: any;
}

type Props = Omit<IProps, 'source'>;
const defaultContentWidth = (Dimensions.screenWidth() - 2 * Dimensions.Spacing.extraHuge);

const customerRenderers = (props: Props) => {
    const progressSizeImg = (tnodeWidth: number, tnodeHeight: number, defaultStyle: any) => {
        const contentWidth = parseInt(props?.contentStyle?.width) > 0 ? parseInt(props?.contentStyle?.width) : defaultContentWidth;
        const currentAspectRatio = tnodeWidth / tnodeHeight;
        if(tnodeWidth > 0) {
            if(tnodeWidth < contentWidth) { // within the allowable size
                return {
                    ...defaultStyle,
                    width: tnodeWidth,
                    height: tnodeHeight,
                };
            } else {
                if(tnodeHeight > 0) { // has overWidth and has height
                    return {
                        ...defaultStyle,
                        width: contentWidth,
                        height: contentWidth / currentAspectRatio,
                        aspectRatio: currentAspectRatio,
                    };
                } else { // has overWidth and hasn't height
                    return {
                        ...defaultStyle,
                        width: contentWidth,
                        height: contentWidth / (16 / 9),
                        aspectRatio: 16 / 9,
                    };
                }
            }
        } else {
            return { // has no size
                ...defaultStyle,
                width: contentWidth,
                height: contentWidth / (16 / 9),
                aspectRatio: 16 / 9,
            };
        }
    }
    return {
        img: (props: CustomRendererProps<TBlock>) => {
            const {tnode, style} = props;
            const tnodeWidth = tnode.attributes && parseInt(tnode.attributes.width) > 0 ? parseInt(tnode.attributes.width) : 0;
            const tnodeHeight = tnode.attributes && parseInt(tnode.attributes.height) > 0 ? parseInt(tnode.attributes.height) : 0;
            const src = tnode.attributes && tnode.attributes.src ? tnode.attributes.src : '';
            return <ImageRenderer
                key={Math.random().toString()}
                source={src}
                style={progressSizeImg(tnodeWidth, tnodeHeight, style)}
                resizeMode={'cover'}
            />;
        },
        iframe: (props: CustomRendererProps<TBlock>) => {
            const {tnode, style} = props;
            const src = tnode.attributes && tnode.attributes.src ? tnode.attributes.src : '';
            return <WebView
                key={Math.random().toString()}
                source={{uri: src}}
                style={[styles.customImage, style]}
                javaScriptEnabled
            />;
        },
    };
};

const HTMLRenderer = (props: Props) => {
    const {htmlContent, onLinkPress, contentStyle, ...rest} = props;

    const _onLinkPress = useCallback((evt: any, href: string) => {
        if(onLinkPress) {
            onLinkPress(evt, href);
        } else {
            LinkingHelper.openUrl(href).catch(console.info);
        }
    }, [onLinkPress]);

    if(htmlContent) {
        return (
            <HTML
                defaultTextProps={{
                    allowFontScaling: false
                }}
                renderers={customerRenderers(props)}
                renderersProps={{
                    a: {
                        onPress: _onLinkPress
                    }
                }}
                tagsStyles={tagStyles}
                baseStyle={{
                    fontFamily: theme.font.Regular,
                    fontSize: Dimensions.FontSize.large,
                    color: theme.color.textColor,
                    width: defaultContentWidth,
                    ...contentStyle,
                }}
                systemFonts={[
                    theme.font.Regular,
                    theme.font.Bold,
                    theme.font.Medium
                ]}
                contentWidth={defaultContentWidth}
                {...rest}
                source={{html: htmlContent}}
            />
        );
    }

    return null;
};

export const defaultTextStyle = {
    fontFamily: theme.font.Regular,
    fontSize: Dimensions.FontSize.large,
    color: theme.color.textColor,
};

export const tagStyles = {
    body: defaultTextStyle,
    p: defaultTextStyle,
    a: {
        ...defaultTextStyle,
        color: 'blue'
    },
    strong: {
        ...defaultTextStyle,
        fontFamily: theme.font.Bold,
    },
    li: defaultTextStyle,
    ul: defaultTextStyle,
    ol: defaultTextStyle,
};

const styles = StyleSheet.create({
    customImage: {
        width: defaultContentWidth,
        height: defaultContentWidth / (16 / 9),
        aspectRatio: 16 / 9,
    }
});

export default React.memo(HTMLRenderer);
