export class PlatformUpgradeVersionModel {
    version: string;
    mandatory: boolean;
    changelog?: string;
    upgradeLink: string;

    constructor() {
        this.version = '';
        this.upgradeLink = '';
        this.mandatory = false;
    }

    static parseFromJson = (data: any): PlatformUpgradeVersionModel => {
        const {version, mandatory, upgradedLog, upgradedLink} = data;
        const obj = new PlatformUpgradeVersionModel();
        obj.version = version?.trim();
        obj.mandatory = mandatory;
        obj.changelog = upgradedLog?.trim();
        obj.upgradeLink = upgradedLink?.trim();
        return obj;
    }
}

export class AppUpgradeVersionModel {
    android: PlatformUpgradeVersionModel;
    ios: PlatformUpgradeVersionModel;

    constructor() {
        this.android = new PlatformUpgradeVersionModel();
        this.ios = new PlatformUpgradeVersionModel();
    }

    static parseFromJson = (data: any): AppUpgradeVersionModel => {
        const {iOsVersionUpgrade, androidVersionUpgrade} = data;
        const obj = new AppUpgradeVersionModel();
        if(iOsVersionUpgrade) {
            obj.ios = PlatformUpgradeVersionModel.parseFromJson(iOsVersionUpgrade);
        }
        if(androidVersionUpgrade) {
            obj.android = PlatformUpgradeVersionModel.parseFromJson(androidVersionUpgrade);
        }
        return obj;
    }
}

export class PlatformSettings {
    enableBirthdayCapture: boolean;
    enableGenderCapture: boolean;
    anonymousSignupPopupInterval: number;
    appVersionUpgrade?: AppUpgradeVersionModel;
    findOutMoreFAQId: number;
    thankYouMessage: string;

    constructor() {
        this.anonymousSignupPopupInterval = 0;
        this.enableBirthdayCapture = false;
        this.enableGenderCapture = false;
        this.findOutMoreFAQId = 0;
        this.thankYouMessage = '';
    }

    static parseFromJson = (data: any): PlatformSettings => {
        const {enableBirthdayCapture, enableGenderCapture, showRegisterPopupInterval,
            iOsVersionUpgrade, androidVersionUpgrade, findOutMoreFAQId, thankYouMessage} = data;
        const obj = new PlatformSettings();
        obj.enableBirthdayCapture = enableBirthdayCapture;
        obj.enableGenderCapture = enableGenderCapture;
        obj.anonymousSignupPopupInterval = showRegisterPopupInterval;
        obj.findOutMoreFAQId = findOutMoreFAQId;
        if(iOsVersionUpgrade || androidVersionUpgrade) {
            obj.appVersionUpgrade = AppUpgradeVersionModel.parseFromJson({iOsVersionUpgrade, androidVersionUpgrade});
        }
        obj.thankYouMessage = thankYouMessage;
        return obj;
    }
}