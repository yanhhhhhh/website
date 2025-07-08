import request, { Result } from '@/request';

export interface DictType {
  dictLabel: string;
  dictValue: string;
  dictType: string;
  dictCode: string;
}
export function getDicts(dictType: string) {
  return request.get<Result<DictType[]>>(`/regionWeb/dict/type/${dictType}`);
}
