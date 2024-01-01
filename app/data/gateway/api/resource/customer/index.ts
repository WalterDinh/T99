import { ApiType } from 'app/data/gateway/api/type';
import { IResource } from 'app/shared/interfaces/common/resource';
import { getApiController } from '../ResourceController';

const CustomerKyc = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}user/customer-kyc`,
});


const CustomerKycStatus = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}user/kyc-status`,
});

const CheckEkycByPhone = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}user/kyc-status-without-auth`,
});
export default {
    CustomerKyc,
    CustomerKycStatus,
    CheckEkycByPhone
};
