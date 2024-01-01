export interface EkycVnptResultsModel {
    COMPARE_RESULT: CompareResult;
    FRONT_IMAGE: string;
    INFO_RESULT: InfoResult;
    LIVENESS_CARD_FRONT_RESULT: Result;
    LIVENESS_CARD_REAR_RESULT: Result;
    RECENT_LOCATION_RESULT: any;
    LIVENESS_RESULT: Result;
    MASKED_FACE_RESULT: MaskedFaceResult;
    REGISTER_RESULT: Result;
    PORTRAIT_IMAGE: string;
}

export interface CompareResult {
    challengeCode?: string;
    dataBase64?: string;
    dataSign?: string;
    imgs?: Imgs;
    logID?: string;
    message?: string;
    object?: COMPARERESULTObject;
    server_version?: string;
    statusCode?: number;
}

export interface Imgs {
    img_face?: string;
    img_front?: string;
}

export interface COMPARERESULTObject {
    match_warning?: string;
    msg?: string;
    multiple_faces?: boolean;
    prob?: number;
    result?: string;
}

export interface InfoResult {
    challengeCode?: string;
    dataBase64?: string;
    dataSign?: string;
    imgs?: Imgs;
    logID?: string;
    message?: string;
    object?: INFORESULTObject;
    server_version?: string;
    statusCode?: number;
    errors?: string[];
}

export interface INFORESULTObject {
    back_corner_warning?: string;
    back_expire_warning?: string;
    back_type_id?: number;
    birth_day?: string;
    birth_day_prob?: number;
    card_type?: string;
    checking_result_back?: CheckingResult;
    checking_result_front?: CheckingResult;
    citizen_id?: string;
    citizen_id_prob?: number;
    corner_warning?: string;
    cover_prob_front?: number;
    dupplication_warning?: boolean;
    expire_warning?: string;
    features?: string;
    features_prob?: number;
    gender?: string;
    general_warning?: any[];
    id?: string;
    id_fake_prob?: number;
    id_fake_warning?: string;
    id_probs?: string;
    issue_date?: string;
    issue_date_prob?: number;
    issue_date_probs?: number[];
    issue_place?: string;
    issue_place_prob?: number;
    match_front_back?: MatchFrontBack;
    mrz?: string[];
    mrz_prob?: number;
    mrz_probs?: number[];
    msg?: string;
    msg_back?: string;
    name?: string;
    name_prob?: number;
    name_probs?: any[];
    nation_policy?: string;
    nationality?: string;
    origin_location?: string;
    origin_location_prob?: number;
    quality_back?: QualityBack;
    quality_front?: QualityFront;
    recent_location?: string;
    recent_location_prob?: number;
    tampering?: Tampering;
    type_id?: number;
    valid_date?: string;
    valid_date_prob?: number;
}

export interface CheckingResult {
    check_photocopied_prob?: number;
    check_photocopied_result?: string;
    corner_cut_prob?: number[];
    corner_cut_result?: string;
    edited_prob?: number;
    edited_result?: string;
    recaptured_prob?: number;
    recaptured_result?: string;
}

export interface MatchFrontBack {
    match_bod?: string;
    match_id?: string;
    match_name?: string;
    match_sex?: string;
    match_valid_date?: string;
}

export interface QualityBack {
    blur_score?: number;
    bright_spot_param?: BrightSpotParam;
    bright_spot_score?: number;
    final_result?: FinalResult;
    luminance_score?: number;
    resolution?: number[];
}

export interface BrightSpotParam {
    average_intensity?: number;
    bright_spot_threshold?: number;
    total_bright_spot_area?: number;
}

export interface FinalResult {
    bad_luminance_likelihood?: string;
    blurred_likelihood?: string;
    bright_spot_likelihood?: string;
    low_resolution_likelihood?: string;
}

export interface QualityFront {
    blur_score?: number;
    bright_spot_param?: BrightSpotParam;
    bright_spot_score?: number;
    final_result?: FinalResult;
    luminance_score?: number;
    resolution?: number[];
}

export interface Tampering {
    is_legal?: string;
    warning?: any[];
}

export interface Result {}

export interface MaskedFaceResult {
    challengeCode: string;
    dataBase64: string;
    dataSign: string;
    imgs: { img: string };
    logID: string;
    message: string;
    object: any;
    server_version: string;
    statusCode: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toEkycModel(json: string): EkycVnptResultsModel {
        return JSON.parse(json);
    }

    public static toCompareResultModel(json: string): CompareResult {
        return JSON.parse(json);
    }

    public static toInfoResultModel(json: string): InfoResult {
        return JSON.parse(json);
    }

    public static ekycModelToJson(value: EkycVnptResultsModel): string {
        return JSON.stringify(value);
    }
}
