import { ApiType } from 'app/data/gateway/api/type';
import { IResource } from 'app/shared/interfaces/common/resource';
import { getApiController } from '../ResourceController';

const LoanList = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}loan`,
});

export default {
    LoanList
};
