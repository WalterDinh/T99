export default class ResponseDataModel<T> {
    message?: string;
    data?: T;
    httpStatusCode?: number;
    total?: number;
    totalDone?: number;
    totalNotDone?: number;
    totalLock?: number;
    totalFilter?: number;
    success?: boolean;

    constructor(
        message?: string,
        data?: T,
        httpStatusCode?: number,
        total = 0,
        totalDone= 0,
        totalNotDone= 0,
        totalLock= 0,
        totalFilter= 0,
        success?: boolean,
    ) {
        this.message = message;
        this.data = data;
        this.httpStatusCode = httpStatusCode;
        this.total = total;
        this.totalDone= totalDone;
        this.totalNotDone= totalNotDone;
        this.totalLock= totalLock;
        this.totalFilter= totalFilter;
        this.success= success;
    }


    toString = () => {
        return this.message;
    };
}
