const KeyIntentConstants = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    TOKEN_ID: 'TOKEN_ID',
    TOKEN_KEY: 'TOKEN_KEY',
    /*
    Thực hiện chọn xác thực loại giấy tờ để bắt đầu.
       IDENTITY_CARD(1),
       PASSPORT(2),
       MILITARY_CARD(3),
       DRIVER_LICENSE(4);
     */
    DOCUMENT_TYPE: 'DOCUMENT_TYPE',
    /*
     Hiển thị màn hình chọn loại giấy tờ hay không. (Mặc định là false, Nếu cờ này là true thì không cần truyền vào DOCUMENT_TYPE ).
     */
    SELECT_DOCUMENT: 'SELECT_DOCUMENT',
    /* Lựa chọn phiên bản tiêu chuẩn hoặc nâng cao. (Khác nhau ở bước chụp chân dung. Phiên bản nâng cao sẽ có chống fake khuôn mặt 3D)
        STANDARD =  0,
        ADVANCED =  1
    * */
    VERSION_SDK: 'VERSION_SDK',
    SHOW_RESULT: 'SHOW_RESULT',//Có hiển thị màn hình kết quả của Vnpt hay không. (Mặc định là không)
    SHOW_DIALOG_SUPPORT: 'SHOW_DIALOG_SUPPORT',//Có hiển thị dialog hướng dẫn sử dụng hay không. (Mặc định là có)
    /*
     Camera mặc định tại bước chụp chân dung. (Mặc định là camera trước).
     FRONT = 0,
     BACK = 1;
     */
    CAMERA_FOR_PORTRAIT: 'CAMERA_FOR_PORTRAIT',
    SHOW_SWITCH: 'SHOW_SWITCH',//Có hiển thị nút chuyển camera trước sau tại màn hình chụp chân dung hay không (Mặc định là không)
    LIVENESS_STANDARD: 'LIVENESS_STANDARD',// LIVENESS_ADVANCED: Chống fake khi chụp ảnh chân dung. Khi chọn bản cơ bản thì config key liveness_standard, khi chọn nâng cao thì config key liveness_advanced tương ứng. (Mặc định là không)
    CALL_ADD_FACE: 'CALL_ADD_FACE',//Có gọi thực hiện add dữ liệu khuôn mặt và thông tin người dùng vào database hay không. (Mặc định là không)
    CHECK_MASKED_FACE: 'CHECK_MASKED_FACE',// Có thực hiện kiểm tra che mặt hay không.(có là true, không là false);
    CHECK_LIVENESS_CARD: 'CHECK_LIVENESS_CARD',//Có thực hiện kiểm tra giấy tờ thật giả hay không
    GUIDE_CARD_ID: 'GUIDE_CARD_ID',// tên ảnh dialog hướng dẫn chứng minh thư/ thẻ căn cước. (có thể thay đổi tên ảnh)
    GUIDE_PASSPORT: 'GUIDE_PASSPORT',// tên ảnh dialog hướng dẫn passport. (có thể thay đổi tên ảnh)
    GUIDE_MILITARY_ID: 'GUIDE_MILITARY_ID',// tên ảnh dialog hướng dẫn chứng minh thư quân đội. (có thể thay đổi tên ảnh)
    GUIDE_LICENSE: 'GUIDE_LICENSE',//tên ảnh dialog hướng dẫn bằng lái xe. (có thể thay đổi tên ảnh)
    GUIDE_PORTRAIT_BASIC: 'GUIDE_PORTRAIT_BASIC',//tên ảnh dialog hướng dẫn chụp khuôn mặt bản cơ bản. (có thể thay đổi tên ảnh)
    GUIDE_PORTRAIT_PRO: 'GUIDE_PORTRAIT_PRO',// tên ảnh dialog hướng dẫn chụp khuôn mặt bản nâng cao. (có thể thay đổi tên ảnh)
    IS_SHOW_HELP: 'IS_SHOW_HELP',// true/false
    LANGUAGE: 'LANGUAGE',//cài đặt ngôn ngữ dùng trong sdk.
    LIVENESS_FACE: 'LIVENESS_FACE',// Chống fake khi chụp ảnh chân dung. Khi chọn bản cơ bản thì config key liveness_standard, khi chọn nâng cao thì config key liveness_advanced tương ứng. (Mặc định là không)

    CHANGE_THEME: 'CHANGE_THEME',//Có cho phép tùy biến thay đổi thiết kế nhận diện thương hiệu (màu sắc, dialog hướng dẫn, logo) hay không. (có là true, không là false).
    /*
      Thay đổi logo mặc định
       Với andorid :
         + Tạo thư mục "assets" trong project theo đường dẫn ../appname/android/app/src/main/assets
         + Thêm file image vào trong thư mục assets VD logo.png
     */
    LOGO: 'LOGO',
    WIDTH_LOGO: 'WIDTH_LOGO',
    HEIGHT_LOGO: 'HEIGHT_LOGO',
    CHANGE_COLOR: 'CHANGE_COLOR',//màu của button
    CHANGE_TEXT_COLOR: 'CHANGE_TEXT_COLOR',//màu của chữ
};

const KeyResultConstants = {
    INFO_RESULT: '',// chuỗi json thông tin giấy tờ sau khi bóc tách. Trường hợp nếu ảnh giấy tờ bị mờ nhòe, thiếu số hoặc mất góc, trong chuỗi json mà service trả về sẽ xuất hiện trường thông tin cảnh báo với tên key là “warning_msg” thuộc key “object” với các giá trị có thể là : “Giấy tờ bị mất góc”, “Giấy tờ bị mờ/nhòe”.
    COMPARE_RESULT: '',// chuỗi json thông tin so sánh khuôn mặt trên giấy tờ và ảnh chụp chân dung.
    LIVENESS_RESULT: '',// chuỗi json thông tin ảnh chụp chân dung là thật hay fake.
    REGISTER_RESULT: '',// chuỗi json thông tin trả về sau khi thực hiện ADD_FACE
    LIVENESS_CARD_FRONT_RESULT: '',// chuỗi json thông tin trả về check thật giả với giấy tờ mặt trước
    LIVENESS_CARD_REAR_RESULT: '',// chuỗi json thông tin trả về check thật giả với giấy tờ mặt sau
    MASKED_FACE_RESULT: '',// chuỗi json thông tin trả về khi thực hiện check khuôn mặt chân dung có che mặt hay không
    FRONT_IMAGE: '',//ảnh mặt trước giấy tờ.
    REAR_IMAGE: '',// ảnh mặt sau giấy tờ.
    PORTRAIT_IMAGE: '',// ảnh chân dung.
    ORIGIN_LOCATION_RESULT: '',//chuỗi json thông tin trả về kết quả mapping address của trường ORIGIN_LOCATION.
    RECENT_LOCATION_RESULT: '',// chuỗi json thông tin trả kết quả mapping address của RECENT_LOCATION.
    ISSUE_PLACE_RESULT: '',// chuỗi json thông tin trả kết quả mapping address của ISSUE_PLACE_RESULT.
    BIRTH_PLACE_RESULT: '',//chuỗi json thông tin trả kết quả mapping address của BIRTH_PLACE_RESULT.
};
export {
    KeyIntentConstants,
    KeyResultConstants,
};

