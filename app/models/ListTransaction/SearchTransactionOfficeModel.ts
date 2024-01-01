export default class SearchTransactionOfficeModel {
    transactionCode: string;
    transactionName: string;
    regionId: string;
    branchId: string;
    fax: string;
    hotline: string;
    address: string;
    email: string;
    phoneNumber: string;
    stk: string;
    status: number;
    surrogate: string;
    unitLevelId: string;
    location: {
        lat: number;
        lng: number;
    };
    isDeleted: boolean;
    deleterId: null;
    deletionTime: null;
    lastModificationTime: Date;
    lastModifierId: string;
    creationTime: Date;
    creatorId: string;
    extraProperties: ExtraProperties;
    concurrencyStamp: string;
    id: string;

    constructor(
        transactionCode = '',
        transactionName = '',
        regionId = '',
        branchId = '',
        fax = '',
        hotline = '',
        address = '',
        email = '',
        phoneNumber = '',
        stk = '',
        status = 0,
        surrogate = '',
        unitLevelId = '',
        location = {
            lat: 10.762622,
            lng: 106.660172,
        },
        isDeleted = false,
        deleterId = null,
        deletionTime = null,
        lastModificationTime = new Date(),
        lastModifierId = '',
        creationTime = new Date(),
        creatorId = '',
        extraProperties = { POSITION_IN_DEPARTMENT : [] } ,
        concurrencyStamp = '',
        id = '',
    ) {
        this.transactionCode = transactionCode;
        this.transactionName = transactionName;
        this.regionId = regionId;
        this.branchId = branchId;
        this.fax = fax;
        this.hotline = hotline;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.stk = stk;
        this.status = status;
        this.surrogate = surrogate;
        this.unitLevelId = unitLevelId;
        this.location = location;
        this.isDeleted = isDeleted;
        this.deleterId = deleterId;
        this.deletionTime = deletionTime;
        this.lastModificationTime = lastModificationTime;
        this.lastModifierId = lastModifierId;
        this.creationTime = creationTime;
        this.creatorId = creatorId;
        this.extraProperties = extraProperties;
        this.concurrencyStamp = concurrencyStamp;
        this.id = id;
    }
    static parseFromJson = (data: any): SearchTransactionOfficeModel => {
        const obj = new SearchTransactionOfficeModel();
        const {
            transactionCode,
            transactionName,
            regionId,
            branchId,
            fax,
            hotline,
            address,
            email,
            phoneNumber,
            stk,
            status,
            surrogate,
            unitLevelId,
            location,
            isDeleted,
            deleterId,
            deletionTime,
            lastModificationTime,
            lastModifierId,
            creationTime,
            creatorId,
            extraProperties,
            concurrencyStamp,
            id,
        } = data;
        obj.transactionCode = transactionCode;
        obj.transactionName = transactionName;
        obj.regionId = regionId;
        obj.branchId = branchId;
        obj.fax = fax;
        obj.hotline = hotline;
        obj.address = address;
        obj.email = email;
        obj.phoneNumber = phoneNumber;
        obj.stk = stk;
        obj.status = status;
        obj.surrogate = surrogate;
        obj.unitLevelId = unitLevelId;
        obj.location = location;
        obj.isDeleted = isDeleted;
        obj.deleterId = deleterId;
        obj.deletionTime = deletionTime;
        obj.lastModificationTime = lastModificationTime;
        obj.lastModifierId = lastModifierId;
        obj.creationTime = creationTime;
        obj.creatorId = creatorId;
        obj.extraProperties = extraProperties;
        obj.concurrencyStamp = concurrencyStamp;
        obj.id = id;

        return obj;
    };
}
export interface ExtraProperties {
    POSITION_IN_DEPARTMENT?: PositionInDepartment[];
}
export interface PositionInDepartment {
    Id: string;
    PositionName: string;
}
