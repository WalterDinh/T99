export default class LoginModel {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
    refreshToken: string;
    scope: string;

    constructor() {
        this.accessToken = '';
        this.expiresIn = 0;
        this.tokenType = '';
        this.refreshToken = '';
        this.scope = '';
    }
    static parseFromJson = (data: any): LoginModel => {
        const obj = new LoginModel();
        const { access_token, refresh_token, expires_in, token_type, scope } =
            data;
        obj.accessToken = access_token;
        obj.refreshToken = refresh_token;
        obj.expiresIn = expires_in;
        obj.tokenType = token_type;
        obj.scope = scope;

        return obj;
    };
}
