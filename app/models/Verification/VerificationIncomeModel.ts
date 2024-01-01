export default class VerificationIncomeModel {
    incomeType:             number;
    companyName:            string;
    jobName:                string;
    jobPosition:            string;
    companyAddress:         string;
    province:               string;
    district:               string;
    incomeAmount:           number;
    incomeDemonstratePaper: any;
    additionalIncome:       any;
    contractId:             any;
    documentId:             any;
    customerId:             string;
    isDeleted:              boolean;
    deleterId:              any;
    deletionTime:           any;
    lastModificationTime:   any;
    lastModifierId:         any;
    creationTime:           Date;
    creatorId:              string;
    id:                     string;
    constructor(
        incomeType = 0,
        companyName = '',
        jobName = '',
        jobPosition = '',
        companyAddress = '',
        province = '',
        district = '',
        incomeAmount = 0,
        incomeDemonstratePaper = '',
        additionalIncome = '',
        contractId = '',
        documentId = '',
        customerId = '',
        isDeleted = false ,
        deleterId = '',
        deletionTime = '',
        lastModificationTime = '',
        lastModifierId = '',
        creationTime = new Date,
        creatorId = '',
        id = '',
    ){
        this.incomeType = incomeType;
        this.companyName = companyName;
        this.jobName = jobName;
        this.jobPosition = jobPosition;
        this.companyAddress = companyAddress;
        this.province = province;
        this.district = district;
        this.incomeAmount = incomeAmount;
        this.incomeDemonstratePaper = incomeDemonstratePaper;
        this.additionalIncome = additionalIncome;
        this.contractId = contractId;
        this.documentId = documentId;
        this.customerId = customerId;
        this.isDeleted = isDeleted;
        this.deleterId = deleterId;
        this.deletionTime = deletionTime;
        this.lastModificationTime = lastModificationTime;
        this.lastModifierId = lastModifierId;
        this.creationTime = creationTime;
        this.creatorId = creatorId;
        this.id = id;
    }
    static parseFromJson = (data: any) : VerificationIncomeModel => {
        const obj = new VerificationIncomeModel();
        const {
            incomeType,
            companyName,
            jobName,
            jobPosition,
            companyAddress,
            province,
            district,
            incomeAmount,
            incomeDemonstratePaper,
            additionalIncome,
            contractId,
            documentId,
            customerId,
            isDeleted,
            deleterId,
            deletionTime,
            lastModificationTime,
            lastModifierId,
            creationTime,
            creatorId,
            id,
        } = data;
        obj.incomeType = incomeType;
        obj.companyName = companyName;
        obj.jobName = jobName;
        obj.jobPosition = jobPosition;
        obj.companyAddress = companyAddress;
        obj.province = province;
        obj.district = district;
        obj.incomeAmount = incomeAmount;
        obj.incomeDemonstratePaper = incomeDemonstratePaper;
        obj.additionalIncome = additionalIncome;
        obj.contractId = contractId;
        obj.documentId = documentId;
        obj.customerId = customerId;
        obj.isDeleted = isDeleted;
        obj.deleterId = deleterId;
        obj.deletionTime = deletionTime;
        obj.lastModificationTime = lastModificationTime;
        obj.lastModifierId = lastModifierId;
        obj.creationTime = creationTime;
        obj.creatorId = creatorId;
        obj.id = id;
        return obj;
    } 
}

