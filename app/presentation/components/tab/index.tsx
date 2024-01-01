import { theme } from 'app/presentation/theme';
import { neutral, primary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import styled from 'styled-components';
import TextPrimary from '../text/TextPrimary';

interface ITabItem {
    idActive: any;
    onPress: (data: any) => void;
    data?: Array<{ title: string; value: any }>;
    styles?: object;
}

const TabItem = (props: ITabItem) => {
    const { idActive, onPress, data, styles } = props;

    const ViewContainer = styled.View`
        flex-direction: row;
        align-items: baseline;
        background-color: ${neutral.white};
        width: 100%;
        padding-top: ${Dimensions.Spacing.medium};
        padding-left: ${Dimensions.Spacing.large};
        padding-bottom: ${Dimensions.Spacing.medium};
        padding-right: ${Dimensions.Spacing.large};
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: ${neutral.s190};
    `;
    const TabItemContainer = styled.TouchableOpacity`
        border-radius: ${Dimensions.Spacing.larger};
        padding-top: ${Dimensions.Spacing.small};
        padding-bottom: ${Dimensions.Spacing.small};
        padding-horizontal: ${Dimensions.Spacing.large};
        margin-right: 4;
        background-color: ${idActive ? primary.s600 : neutral.white};
        border: ${`1px solid ${theme.color.grayBackgroundColor}`};
        justify-content: center;
        padding-Horizontal:${Dimensions.moderateScale(16)};
        margin-Right:${Dimensions.moderateScale(4)}

    `;
    const TabItemTitle = styled(TextPrimary)`
        text-transform: uppercase;
        font-family: ${theme.font.Regular};
        font-size: ${Dimensions.FontSize.medium};
        color: ${neutral.s400};
    `;

    return (
        <ViewContainer>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {(data || []).map((item, index) => {
                    const isActive = idActive === item.value;
                    return (
                        <TabItemContainer
                            style={[
                                styles,
                                {
                                    backgroundColor: isActive
                                        ? primary.s600
                                        : `1px solid ${theme.color.grayBackgroundColor}`,
                                },
                            ]}
                            key={index}
                            onPress={() => {
                                onPress(item.value);
                            }}
                        >
                            <TabItemTitle
                                style={{
                                    color: isActive
                                        ? neutral.grayScale
                                        : neutral.s400,
                                }}
                            >
                                {item.title}
                            </TabItemTitle>
                        </TabItemContainer>
                    );
                })}
            </ScrollView>
        </ViewContainer>
    );
};
const styles = StyleSheet.create({
    container: {
        // paddingHorizontal
    },
});
export default TabItem;
