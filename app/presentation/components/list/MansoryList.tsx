import React, {ReactElement} from 'react';
import {
    NativeScrollEvent,
    RefreshControl,
    RefreshControlProps,
    ScrollView,
    ScrollViewProps,
    StyleProp,
    View
} from 'react-native';

interface IProps<T>
    extends Omit<ScrollViewProps, 'refreshControl' | 'onScroll'> {
    keyPrefix?: string;
    loading?: boolean;
    refreshing?: RefreshControlProps['refreshing'];
    onRefresh?: RefreshControlProps['onRefresh'];
    onEndReached?: () => void;
    onEndReachedThreshold?: number;
    style?: StyleProp<ScrollViewProps>;
    data: T[];
    renderItem: ({item, i}: {item: T, i: number}) => ReactElement;
    LoadingView?: React.ComponentType<any> | React.ReactElement | null;
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
    ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
    ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
    numColumns?: number;
}

interface IState {
    isRefreshing: boolean;
}

const isCloseToBottom = (
    {layoutMeasurement, contentOffset, contentSize}: NativeScrollEvent,
    onEndReachedThreshold: number,
): boolean => {
    const paddingToBottom = contentSize.height * onEndReachedThreshold;

    return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    );
};

class MasonryList<T> extends React.Component<IProps<T>, IState> {
    scrollviewRef?: ScrollView | null;

    constructor(props: IProps<T>) {
        super(props);

        this.state = {
            isRefreshing: false
        };
    }

    scrollTo = ({x, y, animated}: {x?: number, y?: number, animated?: boolean}) => {
        this.scrollviewRef?.scrollTo({
            x,
            y,
            animated
        });
    }

    render() {
        const {
            keyPrefix,
            refreshing,
            data,
            ListHeaderComponent,
            ListEmptyComponent,
            ListFooterComponent,
            renderItem,
            onEndReachedThreshold,
            onEndReached,
            onRefresh,
            loading,
            LoadingView,
            numColumns = 2,
            style,
            horizontal,
            ...rest
        } = this.props;

        const {isRefreshing} = this.state;
        return (
            <ScrollView
                removeClippedSubviews
                {...rest}
                ref={ref => this.scrollviewRef = ref}
                style={[{alignSelf: 'stretch'}, style]}
                refreshControl={
                    <RefreshControl
                        refreshing={!!(refreshing || isRefreshing)}
                        onRefresh={() => {
                            this.setState({
                                isRefreshing: true
                            });
                            onRefresh?.();
                            this.setState({
                                isRefreshing: false
                            });
                        }}
                    />
                }
                scrollEventThrottle={16}
                onScroll={({nativeEvent}: {nativeEvent: NativeScrollEvent}) => {
                    if(isCloseToBottom(nativeEvent, onEndReachedThreshold || 0.1))
                        onEndReached?.();
                }}>
                {ListHeaderComponent}
                {data.length === 0 && ListEmptyComponent ? (
                    React.isValidElement(ListEmptyComponent) ? (
                        ListEmptyComponent
                    ) : (
                        <ListEmptyComponent />
                    )
                ) : (
                    <View style={{flex: 1, flexDirection: horizontal ? 'column' : 'row', justifyContent: 'space-between'}}>
                        {Array.from(Array(numColumns), (_, num) => {
                            return (
                                <View
                                    key={`${keyPrefix}-${num.toString()}`}
                                    style={{
                                        flexDirection: horizontal ? 'row' : 'column',
                                    }}>
                                    {data
                                        .map((el, i) => {
                                            if(i % numColumns === num)
                                                return renderItem({item: el, i});

                                            return null;
                                        })
                                        .filter((e) => !!e)}
                                </View>
                            );
                        })}
                    </View>
                )}
                {loading && LoadingView}
                {ListFooterComponent}
            </ScrollView>
        );
    }
}

export default MasonryList;