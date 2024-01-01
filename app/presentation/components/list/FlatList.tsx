import images from 'app/assets/images';
import TextPrimary from 'app/presentation/components/text/TextPrimary';
import ScreenNotAccount from 'app/presentation/modules/BeneficiaryInformation/ScreenNotAccount';
import { Colors, theme, Dimensions } from 'app/presentation/theme';
import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    FlatListProps,
    StyleSheet,
} from 'react-native';
import styled from 'styled-components';
import { getString } from '../../localization';
import DoneScreen from '../donescreen';

interface Props extends FlatListProps<any> {
    emptyText?: string;
    separatorType?: 'space' | 'line';
    separatorSize?: number;
    isLoadMore?: boolean;
    isLoading?: boolean;
}

interface State {}

export default class MyFlatList extends React.PureComponent<Props, State> {
    _list?: FlatList<any> | null;

    static defaultProps = {
        separatorType: 'space',
        isLoadMore: false,
    };

    renderEmpty = () => {
        const { emptyText } = this.props;
        const text = emptyText ? emptyText : getString('noData');
        return (
            <EmptyContainer>
                <DoneScreen source={images.Icons.CardDone}  titleContent={text}/>
                {/* <Label>{text}</Label> */}
            </EmptyContainer>
        );
    };

    renderLoadMore = () => {
        const { isLoadMore } = this.props;
        if (isLoadMore) {
            return (
                <ViewCenter>
                    <ActivityIndicator
                        animating
                        size={'large'}
                        color={'grey'}
                    />
                </ViewCenter>
            );
        }

        return null;
    };

    renderSeparator = () => {
        const { separatorType, separatorSize, horizontal } = this.props;
        if (separatorType === 'space') {
            if (horizontal)
                return (
                    <HSeparator
                        style={{
                            marginLeft:
                                separatorSize ?? Dimensions.Spacing.large,
                        }}
                    />
                );
            return (
                <Separator
                    style={{
                        marginTop: separatorSize ?? Dimensions.Spacing.medium,
                    }}
                />
            );
        }
        return <LineSeparator style={{ height: separatorSize ?? 1 }} />;
    };

    render() {
        const { isLoading } = this.props;
        if (isLoading) {
            return (
                <ViewCenter>
                    <ActivityIndicator
                        animating
                        size={'large'}
                        color={'grey'}
                    />
                </ViewCenter>
            );
        }
        return (
            <FlatList
                style={{ width: '100%'}}
                contentContainerStyle={styles.contentContainer}
                ListEmptyComponent={this.renderEmpty}
                ItemSeparatorComponent={this.renderSeparator}
                ListFooterComponent={this.renderLoadMore}
                initialNumToRender={5}
                onEndReachedThreshold={0.6}
                extraData={this.props.isLoadMore}
                {...this.props}
                ref={(ref) => (this._list = ref)}
            />
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: Dimensions.Spacing.large,
        paddingVertical: Dimensions.Spacing.large,
        // backgroundColor: theme.color.backgroundColorPrimary,
    },
});

const EmptyContainer = styled.View`
    padding-vertical: ${Dimensions.Spacing.medium};
    padding-horizontal: ${Dimensions.Spacing.large};
    justify-content: center;
    align-items: center;
`;

const Label = styled(TextPrimary)`
    color: ${theme.color.labelColor};
`;

const Separator = styled.View`
    margintop: ${Dimensions.Spacing.medium};
`;

const HSeparator = styled.View`
    marginleft: ${Dimensions.Spacing.large};
`;

const LineSeparator = styled.View`
    height: 1;
    width: 100%;
    backgroundcolor: ${Colors.neutral.s100};
`;

const ViewCenter = styled.View`
    width: 100%;
    paddinghorizontal: ${Dimensions.Spacing.medium};
    paddingvertical: ${Dimensions.Spacing.medium};
    justify-content: center;
    align-items: center;
`;
