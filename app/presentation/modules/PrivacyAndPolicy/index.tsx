import { TextPrimary } from 'app/presentation/components';
import { theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

const source = {
    html: `<ul style="list-style-type: thai;">
    <li style="color: #0E0E0E; font-size: 15px; line-height: 22px; letter-spacing: -0.28px;">Truy cập và lưu lại thông tin lưu trữ trong tài khoản của bạn, chẳng hạn như email của bạn</li>
    <li style="color: #0E0E0E; font-size: 15px; line-height: 22px; letter-spacing: -0.28px;">Xem số liệu thống kê liên quan đến tài khoản của bạn, chẳng hạn như số lượng ứng dụng bạn cài đặt</li>
    <li style="color: #0E0E0E; font-size: 15px; line-height: 22px; letter-spacing: -0.28px;">Thay đổi mật khẩu tài khoản của bạn</li>
    <li style="color: #0E0E0E; font-size: 15px; line-height: 22px; letter-spacing: -0.28px;">Tạm ngưng hoặc chấm dứt quyền truy cập vào tài khoản của bạn</li>
    <li style="color: #0E0E0E; font-size: 15px; line-height: 22px; letter-spacing: -0.28px;">Nhận thông tin tài khoản của bạn nhằm tuân thủ luật, quy định, quy trình pháp lý hiện hành hoặc yêu cầu có thể thực thi của chính phủ</li>
    <li style="color: #0E0E0E; font-size: 15px; line-height: 22px; letter-spacing: -0.28px;">Hạn chế khả năng xóa hoặc chỉnh sửa thông tin hay các tùy chọn cài đặt bảo mật của bạn</li>
  </ul>`,
};

const PrivacyAndPolicy = (props: any) => {
    const { width } = useWindowDimensions();
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <TextPrimary style={styles.header}>
                    Chính sách bảo mật của t99
                </TextPrimary>
                <TextPrimary style={styles.detail}>
                    Khi sử dụng dịch vụ của chúng tôi, bạn tin tưởng cung cấp
                    thông tin của bạn cho chúng tôi. Chúng tôi hiểu rằng đây là
                    một trách nhiệm lớn và chúng tôi nỗ lực bảo vệ thông tin của
                    bạn cũng như để bạn nắm quyền kiểm soát.
                </TextPrimary>
                <TextPrimary style={styles.title}>
                    1. Thông tin thu thập
                </TextPrimary>
                <TextPrimary style={styles.info}>
                    Chúng tôi thu thập thông tin để cung cấp các dịch vụ tốt hơn
                    cho tất cả người dùng của mình — từ việc xác định những
                    thông tin cơ bản như ngôn ngữ mà bạn nói cho đến những thông
                    tin phức tạp hơn như quảng cáo nào bạn sẽ thấy hữu ích nhất,
                    những người quan trọng nhất với bạn khi trực tuyến hay những
                    video nào trên YouTube mà bạn có thể thích. Thông tin Google
                    thu thập và cách thông tin đó được sử dụng tùy thuộc vào
                    cách bạn dùng các dịch vụ của chúng tôi cũng như cách bạn
                    quản lý các tùy chọn kiểm soát bảo mật của mình. Khi bạn
                    không đăng nhập vào một Tài khoản Google, chúng tôi sẽ lưu
                    trữ thông tin chúng tôi thu thập được cùng với các giá trị
                    nhận dạng duy nhất được liên kết với trình duyệt, ứng dụng
                    hoặc thiết bị bạn đang sử dụng. Cách này cho phép chúng tôi
                    thực hiện được những việc như duy trì các lựa chọn ưu tiên
                    của bạn trong các phiên duyệt web, chẳng hạn như ngôn ngữ
                    bạn ưa thích hay có hiển thị cho bạn các kết quả tìm kiếm
                    hoặc quảng cáo phù hợp hơn dựa trên hoạt động của bạn hay
                    không.
                </TextPrimary>
                <TextPrimary style={styles.infoTwo}>
                    Khi bạn đã đăng nhập, chúng tôi cũng thu thập cả thông tin
                    mà chúng tôi lưu trữ cùng với Tài khoản Google của bạn.
                    Chúng tôi xem những thông tin này là thông tin cá nhân.
                </TextPrimary>
                <TextPrimary style={styles.title}>
                    2. Các trường hợp bạn chia sẻ thông tin của mình
                </TextPrimary>
                <TextPrimary style={styles.detailTitle}>
                    Chúng tôi không chia sẻ thông tin cá nhân của bạn với các
                    công ty, tổ chức hoặc cá nhân bên ngoài Google ngoại trừ
                    trong các trường hợp sau đây:
                </TextPrimary>
                <TextPrimary style={styles.note}>
                    Có sự đồng ý của bạn
                </TextPrimary>
                <RenderHTML contentWidth={width} source={source} />
                <TextPrimary style={styles.noteTwo}>Vì lý do pháp lý</TextPrimary>
                <TextPrimary style={styles.weShare}>
                    Chúng tôi sẽ chia sẻ thông tin cá nhân ra bên ngoài Google
                    nếu chúng tôi thực sự tin rằng việc truy cập, sử dụng, duy
                    trì hoặc tiết lộ thông tin như vậy là cần thiết một cách hợp
                    lý để:
                </TextPrimary>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        fontFamily: theme.font.Regular,
        paddingHorizontal: 22,
        paddingTop: 16,
        paddingBottom: 40,
        flex: 1,
        backgroundColor: neutral.white,
    },
    info: {
        fontFamily: theme.font.Regular,
        fontSize: 15,
        lineHeight: 22,
        letterSpacing: -0.28,
        color: '#0E0E0E',
        paddingBottom: 41,
    },
    infoTwo: {
        fontFamily: theme.font.Regular,
        fontSize: 15,
        lineHeight: 22,
        letterSpacing: -0.28,
        color: '#0E0E0E',
        paddingBottom: 24,
    },

    header: {
        fontFamily: theme.font.Medium,
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#818181',
        lineHeight: 16,
        paddingBottom: 22,
        letterSpacing: 0.07,
    },
    detail: {
        fontSize: 17,
        color: '#0E0E0E',
        paddingBottom: 24,
        letterSpacing: -0.41,
    },
    title: {
        paddingBottom: 12,

        fontSize: 20,
        lineHeight: 25,
        color: '#0E0E0E',
        letterSpacing: 0.38,
    },
    detailTitle: {
        fontSize: 15,
        lineHeight: 22,
        letterSpacing: -0.28,
        color: '#0E0E0E',
    },
    detailTitleTwo: {
        fontSize: 15,
        lineHeight: 22,
        letterSpacing: -0.28,
        color: '#0E0E0E',
        paddingTop: 45,
        paddingBottom: 24,
    },
    note: {
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
        fontFamily: theme.font.Bold,
        color: '#0E0E0E',
        paddingTop: 16
        // paddingVertical: 16,
    },
    noteTwo: {
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
        fontFamily: theme.font.Bold,
        color: '#0E0E0E',
        paddingBottom: 16
        // paddingVertical: 16,
    },
    weShare: {
        fontFamily: theme.font.Regular,
        fontSize: 15,
        lineHeight: 22,
        letterSpacing: -0.28,
        color: '#0E0E0E',
        paddingBottom: 24,
        marginBottom: 30,
    },
});
export default PrivacyAndPolicy;
