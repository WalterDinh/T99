export default class ResponseModel<T> {
    code: string;
    status: number;
    isError: boolean;
    message?: string;
    rawError?: any;
    data?: T;
    totalItem?: number;

    constructor(code = '', isError = false, message?: string, data?: T, status = 0, totalItem?: number) {
        this.code = code;
        this.isError = isError;
        this.message = message;
        this.data = data;
        this.status = status;
        this.totalItem = totalItem;
    }

    static createSuccess(data: any, totalItem?: number): ResponseModel<any> {
        const response = new ResponseModel();
        response.data = data;
        response.isError = false;
        response.status = 200;
        response.totalItem = totalItem;
        return response;
    }

    static createError(status: number, message: string, code = '', rawError?: any): ResponseModel<any> {
        const response = new ResponseModel();
        response.isError = true;
        response.code = code;
        response.message = message;
        response.rawError = rawError;
        response.status = status;
        return response;
    }

    toString = () => {
        return this.message;
    };
}
