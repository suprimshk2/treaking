import { ILookupFilter } from 'shared/interfaces/misc';
import { baseRequest } from 'shared/utils/axios';
import apiRoute from './apiRoute';

export const getData = async (param: ILookupFilter) => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.get,
    params: { [param.key]: param.value },
  });

  if (error) {
    return Promise.reject(error);
  }
  return response?.data;
};
