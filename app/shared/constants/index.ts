import { AllRouteParamList } from 'app/presentation/navigation/routes/routeParams';

/**
 * ===================================================SHARED SECTION======================================================
 */
export enum ActionStatus {
    None = 'none',
    Fetching = 'fetching',
    Refreshing = 'refreshing',
    LoadMore = 'loadmore',
    Done = 'done',
}

export enum CurrencyCode {
    Dollar = 'usd',
    VND = 'VND',
}

export enum SortDirections {
    Ascending = 'ASC',
    Descending = 'DESC',
}

export const PageSize = {
    Default: 20,
};

export const Gender = {
    Male: 'male',
    Female: 'female',
};

export const DateTimeFormat = {
    FullDateTime: 'DD/MM/YYYY hh:mm:ss',
    DateTimeAmPm: 'DD/MM/YYYY hh A',
    DateTime24h: 'DD/MM/YYYY HH:mm',
    Time: 'hh:mm:ss',
    FullDate: 'DD MMM YYYY',
    TimeHourMinPM: 'HH:mm A',
    FullDateDash: 'DD-MM-YYYY',
    APIFormat: 'YYYY-MM-DD HH:mm:ss',
    FullDateShortMonth: 'MMM DD, YYYY',
    APIDateFormat: 'YYYY-MM-DD',
    FullDateForwardSlash: 'DD/MM/YYYY',
};

export enum PriceFormat {
    Default = '0,0.00',
    Comma = '0,0',
    Plus = '+0,0',
}

export const CreditCardTypes = {
    Visa: 'visa',
    MasterCard: 'mastercard',
    AmericanExpress: 'american-express',
};

export enum UserType {
    User = 1,
    Merchant = 2,
}

export const MIN_INTEREST_PICK = 3;
export const MAX_INTEREST_PICK = 3;

export const BUILD_NUMBER = 1;
export const HOTLINE = '1900077799';

export const DeepLinkRoutes: Record<string, keyof AllRouteParamList> = {};

export const DeepLinkKeys: Record<string, string> = {
    offers: 'loyaltyNowId',
    articles: 'articleId',
    transactionsbot: 'transactionsbot',
    cardbot: 'cardbot',
    'mini-courses': 'slug',
};

export const CoursePermissions = {
    SIGNATURE_COURSES_FREE_ACCESS: 'signature-courses.free-access',
    MINI_COURSES_FREE_ACCESS: 'mini-courses.free-access',
};

export const CourseType = {
    STANDARD_EXPERIENCE: 'standard',
    SIGNATURE_EXPERIENCE: 'signature',
};

export const PreferableSize = {
    brandIcon: {
        width: 210,
        height: 210,
    },
};

export const DemoOffersRatio = {
    demo_offer1: 1552 / 980,
    demo_offer2: 1050 / 980,
    demo_offer3: 1629 / 980,
    demo_offer4: 1143 / 980,
};

export const LOCALE = '@language';
export const DEFAULT_SECTION_ID = 'default';
export const SEARCH_HISTORY = 'searchHistory';

export const ACTION_PREFIX = 'START';
export const REFRESH_ACTION_PREFIX = 'REFRESH';
export const LOADMORE_ACTION_PREFIX = 'LOADMORE';
export const SUCCESS_ACTION_SUFFIX = 'SUCCESS';
export const FAILED_ACTION_SUFFIX = 'FAILED';

export const YOUTUBE_ID_REGEX =
    '^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?.com|youtu.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)';

export const NOTIFICATION_CHANNEL = 'benefit_notification';
/**
 * ===================================================PRESENTATION SECTION======================================================
 */

/**
 * ===================================================DATA SECTION======================================================
 */
export const User = {
    Key: 'KeyUser',
    Auth: 'AuthToken',
    RememberLogin: 'RememberLoginKey',
    Location: 'Location',
    NameSignup: 'NameSignup',
    TransactionNotifications: 'TransactionNotifications',
    FirstTimeLogin: 'FirstTimeLogin',
    ResendedVerifyEmail: 'ResendedVerifyEmail',
    TokenType: 'TokenType',
    PhoneNumber: 'PhoneNumber',
    Password: 'Password',
    IDBiometric: 'IDBiometric',
};

export const TokenType = {
    Customer: 'Token.Customer',
    CustomerRefreshToken: 'Token.CustomerRefreshToken',
    Admin: 'Token.Admin',
    Integration: 'Token.Integration',
    DeviceToken: 'Token.DeviceToken',
    DebugAccessToken: 'Token.DebugAccessToken',
};

export const General = {
    Countries: '@Countries',
    HasOpenOnboarding: '@hasOpenOnboarding',
};

export const EventEmit = {
    RefreshNotification: 'RefreshNotification',
};

export enum CheckStatusActive {
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
    Gray = 'gray',
    Red = 'red',
    Green = 'green',
    HalfGray = 'halfGray',
    OutlineGray = 'outlineGray',
    OutlineError = 'outlineError',
    OutlineDefault = 'outlineDefault',
    OutlineWarning = 'outlineWarning',
    OutlineSuccess = 'outlineSuccess',
    GreenFillSuccess = 'greenFillSuccess',
    GreenBackgroundWhite = 'greenBackgroundWhite',
    RedBackgroundWhite = 'redBackgroundWhite',
    textCompleted = 'textCompleted',
    textIndebtedness = 'textIndebtedness',
    textLiquidated = 'textLiquidated',
    textOverdue = 'textOverdue',
    textWaitingForLiquidation = 'textWaitingForLiquidation',
}

export enum StatusOwe {
    Indebtedness = 'Indebtedness',
    Overdue = 'Overdue',
    WaitingForLiquidation = 'WaitingForLiquidation',
    Completed = 'Completed',
    Liquidated = 'Liquidated',
}

export enum ContractDebtGroup {
    InPeriod = 1, // Nợ trong hạn
    OverPeriod = 2, // Nợ quá hạn
    Liquidation = 3, // đã thanh lý
    WaitForLiquidation = 4, // chờ thanh lý
    HasEnded = 5, // Đã tất toán
}

export enum CheckModeHeader {
    Bank = 'bank',
    TwoActive = 'twoActive',
    IdAndTitle = 'idAndTitle',
    Outline = 'outline',
}

export enum StatusToast {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
}
export enum CheckStatusText {
    Success = 'success',
    Error = 'error',
    NeutralBlack = 'neutralBlack',
    SecondaryBrand = 'secondaryBrand',
}
export enum ProductsType {
    Invest = 'Invest',
    Pawn = 'Pawn',
    Golfer = 'Golfer',
}

export enum InvestStep {
    PersonalInformation = 'personalInformation',
    PropertyInformation = 'propertyInformation',
    LoanInformation = 'loanInformation',
    LoanInformationGolfer = 'loanInformationGolfer',
    TransactionOffice = 'transactionOffice',
    TransactionOfficeInvest = 'transactionOfficeInvest',
}
export const LinkNews = 'https://t99.vn/thong-tin-tai-chinh';
export const LinkT99Web = 'https://t99.vn';
export const LinkSim = 'https://mylocal.vn/sim-sieu-data';
export const LinkResort = 'https://risemountresort.com';
export enum OtpType {
    RegisterAccount = 2,
    ChangePassword = 3,
    ForgotPassword = 4,
}

export enum DebtRepaymentPlanStatus {
    Undue = 1,
    PayAPart = 2,
    Done = 3,
    OutOfDate = 4,
}

export enum ContractStatusType {
    borrowing = 1,
    close = 2,
}
export enum AssetType {
    RealEstate = 2,
    Pledge = 1,
    Golf = 3,
}
export enum OnlineContact {
    Phone = 'phone',
    Email = 'email',
    Website = 'website',
}

export enum DisbursementMethod {
    Banking = 1,
    Cash = 2,
}

export enum SignType {
    Online = 1,
    Offline = 2,
}

export enum LoanStatus {
    Draft = 1,
    WaitApprove = 2,
    WaitInit = 3,
    WaitPublish = 4,
    WaitDisbursed = 5,
    Disbursed = 6,
}

export enum ChoosePayments {
    Settlement = 'settlement',
    PartialRepaymentPrincipal = 'partialRepaymentPrincipal',
    DebtPaymentDue = 'debtPaymentDue',
}

export enum TransactionType {
    //[("Thu nợ đến hạn")]
    DebtCollectionDue = 1,
    //[("Thu nợ trước hạn")]
    EarlyDebtCollection = 2,
    //[("Tất toán trước hạn")]
    EarlyRepayment = 3,
    //[("Miễn giảm lãi phí")]
    InterestAndFeeReduction = 4,
    //[("Thu hộ")]
    Collection = 5,
    //[("Giải ngân")]
    Disbursement = 6,
    //[("Gia hạn hợp đồng")]
    ContractExtension = 7,
    //[("Thay đổi lịch trả nợ")]
    ChangeRepaymentSchedule = 8,
    //[("Top up tk chuyên thu")]
    Topup = 9,
    //[("Giao dịch hoàn tiền")]
    Refund = 10,
    //[("Giao dịch chi tiền")]
    Paying = 11,
}
