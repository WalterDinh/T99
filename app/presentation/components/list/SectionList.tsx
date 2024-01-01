import TextPrimary from 'app/presentation/components/text/TextPrimary';
import {Colors, theme, Dimensions} from 'app/presentation/theme';
import {getString} from '../../localization';
import React from 'react';
import {ActivityIndicator, SectionList, SectionListProps, StyleSheet} from 'react-native';
import styled from 'styled-components';

interface Props extends SectionListProps<any> {
    emptyText?: string;
    separatorType?: 'space' | 'line' | 'none';
    isLoadMore?: boolean;
    isLoading?: boolean;
    separatorSize?: number;
}

interface State {

}

export default class MySectionList extends React.PureComponent<Props, State> {
    _list?: SectionList<any>;

    static defaultProps = {
        separatorType: 'space',
        isLoadMore: false
    };

    renderEmpty = () => {
        const {emptyText} = this.props;
        const text = emptyText ? emptyText : getString('listEmpty');
        return (
            <EmptyContainer>
                <Label>{text}</Label>
            </EmptyContainer>
        );
    };

    renderLoadMore = () => {
        const {isLoadMore} = this.props;
        if(isLoadMore) {
            return (
                <ViewCenter>
                    <ActivityIndicator animating size={'large'} />
                </ViewCenter>
            );
        }

        return null;
    };

    renderSeparator = () => {
        const {separatorType, separatorSize} = this.props;

        switch(separatorType) {
            case 'line':
                return <LineSeparator height={separatorSize} />;
            case 'space':
                return <Separator marginTop={separatorSize} />;
            default:
                return null;
        }
    };

    render() {
        const {isLoading} = this.props;
        if(isLoading) {
            return (
                <ViewCenter>
                    <ActivityIndicator animating size={'large'} />
                </ViewCenter>
            );
        }
        return <SectionList
            style={{width: '100%'}}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderLoadMore}
            initialNumToRender={5}
            onEndReachedThreshold={0.6}
            extraData={this.props.isLoadMore}
            {...this.props}
            ref={(ref: SectionList<any>) => this._list = ref}
        />;
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: Dimensions.Spacing.large,
        paddingVertical: Dimensions.Spacing.large,
        backgroundColor: theme.color.backgroundColorPrimary
    }
});

const EmptyContainer = styled.View`
    paddingVertical: ${Dimensions.Spacing.medium};
    paddingHorizontal: ${Dimensions.Spacing.large};
    justifyContent: center;
    alignItems: center;
`;

const Label = styled(TextPrimary)`
    color: ${theme.color.labelColor};
`;

const Separator = styled.View.attrs((props: any) => ({
    marginTop: props.marginTop !== undefined ? props.marginTop : Dimensions.Spacing.large
}))`
    marginTop: ${(props: any) => props.marginTop};
`;

const LineSeparator = styled.View.attrs((props: any) => ({
    height: props.height !== undefined ? props.height : 1
}))`
    height: ${(props: any) => props.height};
    width: 100%;
    backgroundColor: ${Colors.neutral.s300};
`;

const ViewCenter = styled.View`
    width: 100%;
    paddingHorizontal: ${Dimensions.Spacing.medium};
    paddingVertical: ${Dimensions.Spacing.medium};
    justifyContent: center;
    alignItems: center;
`;
