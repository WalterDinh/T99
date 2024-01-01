import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { theme } from 'app/presentation/theme'
import NotificationItem, { CategoryType } from 'app/presentation/components/notificationitem'
import { IconType } from 'app/presentation/components/notificationitem/IconNotification'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams'
import { MyFlatList, TextPrimary } from 'app/presentation/components'
import TabItem from 'app/presentation/components/tab'

const dataTitle = [
    {
        title: 'tất cả',
        value: 1

    },
    {
        title: 'hồ sơ',
        value: 2

    },
    {
        title: 'Giao dịch',
        value: 3

    },
    {
        title: 'Ưu đãi',
        value: 4

    }
]
const dataDummy = [
    {
        id: 1,
        title: 'Ưu đãi 30% thanh toán nạp thẻ',
        titleTime: '22/06/2022',
        iconType: IconType.Update,
        titleContent: 'Bạn nhận được mã khuyến mãi giảm 30% khi thanh toán nạp thẻ điện thoại.',
        typeCategory: CategoryType.Endow,
        unread: true,
    },
    {
        id: 2,
        title: 'Thanh toán thành công',
        titleTime: '22/06/2022',
        iconType: IconType.CheckDone,
        titleContent: `Bạn đã thanh toán thành công kỳ 1 - Hợp đồng số 31231241.`,
        typeCategory: CategoryType.Transaction,
        unread: true,

    },
    {
        id: 3,
        title: 'Hồ sơ vay được phê duyệt',
        titleTime: '22/06/2022',
        iconType: IconType.Check,
        titleContent: 'Hồ sơ vay của bạn đã được phê duyệt. Vui lòng kiểm tra thông tin hợp đồng.',
        typeCategory: CategoryType.Document,
        unread: false,
    },
    {
        id: 4,
        title: 'Hồ sơ vay bị từ chối',
        titleTime: '22/06/2022',
        iconType: IconType.Close,
        titleContent: 'Vui lòng liên hệ với chúng tôi để biết thêm chi tiết về hồ sơ của bạn.',
        typeCategory: CategoryType.Document,
        unread: false,
    },
    {
        id: 5,
        title: 'Giải ngân thành công',
        titleTime: '22/06/2022',
        iconType: IconType.CheckDoneGray,
        titleContent: 'Bạn đã thanh toán thành công kỳ 1 - Hợp đồng số 31231241.',
        typeCategory: CategoryType.Transaction,
        unread: false,
    },
]

interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'Notifications'>;
}


const index = (props: IProps) => {
    const { navigation } = props
    const [categoryId, setCategoryId] = useState(1)

    const renderNotificationItem = ({item}: {item: any}) => {
        return (
            <NotificationItem
                title={item.title}
                titleTime={item.titleTime}
                iconType={item.iconType}
                titleContent={item.titleContent}
                unread = {item.unread}
                typeCategory={item.typeCategory}
                onPress={()=> {
                    navigation.navigate('DetailNotifications',{
                        id: item.id,
                        title: item.title,
                        titleTime: item.titleTime,
                        titleContent: item.titleContent,
                        typeCategory: item.typeCategory,
                        iconType: item.iconType,
                    })
                }}
            />
        )
    }
    return (
        <View style={styles.container}>
            <TabItem data={dataTitle} idActive={categoryId} onPress={(id) => { setCategoryId(id) }} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <MyFlatList
                    data={dataDummy}
                    renderItem={renderNotificationItem}
                    ItemSeparatorComponent={undefined}
                    contentContainerStyle={styles.contentContainer}
                />
            </ScrollView>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant,

    },
    contentContainer: {
        backgroundColor: theme.color.backgroundColorPrimary
    }
})