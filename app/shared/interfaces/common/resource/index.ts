import { ApiType } from '../../../../data/gateway/api/type';

export interface IResource {
  Type: ApiType;
  Path: string;
}
