import { ENV } from 'app/config/env';

interface IConstructor {
    environment: ENV;
    endPoint: string;
    identityEndPoint: string;
    enableDeveloperConsole: boolean;
    enableNetworkDebugger: boolean;
    universalLink: string;
    deeplinkScheme: string;
    dynamicLinkUrl: string;
    accessTokenEkycVnpt: string;
    tokenIdEkycVnpt: string;
    tokenKeyEkycVnpt: string;
}

export default class Config {
    environment: ENV;
    endPoint: string;
    identityEndPoint: string;
    enableDeveloperConsole: boolean;
    enableNetworkDebugger: boolean;
    universalLink: string;
    deeplinkScheme: string;
    dynamicLinkUrl: string;
    accessTokenEkycVnpt: string;
    tokenIdEkycVnpt: string;
    tokenKeyEkycVnpt: string;

    constructor(data: IConstructor) {
        const {
            environment,
            endPoint,
            enableDeveloperConsole,
            enableNetworkDebugger,
            universalLink,
            deeplinkScheme,
            dynamicLinkUrl,
            accessTokenEkycVnpt,
            tokenIdEkycVnpt,
            tokenKeyEkycVnpt,
            identityEndPoint,
        } = data;
        this.environment = environment;
        this.endPoint = endPoint;
        this.enableDeveloperConsole = enableDeveloperConsole;
        this.enableNetworkDebugger = enableNetworkDebugger;
        this.universalLink = universalLink;
        this.deeplinkScheme = deeplinkScheme;
        this.dynamicLinkUrl = dynamicLinkUrl;
        this.accessTokenEkycVnpt = accessTokenEkycVnpt;
        this.tokenIdEkycVnpt = tokenIdEkycVnpt;
        this.tokenKeyEkycVnpt = tokenKeyEkycVnpt;
        this.identityEndPoint = identityEndPoint;
    }
}
