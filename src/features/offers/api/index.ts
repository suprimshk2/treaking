import { IListResponse, IResponse } from 'shared/interfaces/http';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { baseRequest } from 'shared/utils/axios';
import apiRoute from '../constants/apiRoute';
import {
  IAddOfferSchema,
  IEditOfferSchema,
  IOffer,
  IOfferTableFilter,
} from '../interfaces';

export const getOffers = async (
  filters: IOfferTableFilter
): Promise<IOffer[]> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getAll,
    params: filters,
  });

  if (error) {
    return Promise.reject(error);
  }

  /**
   * Set the total count (of offers)
   *
   * Why use store and not take directly from queryData?
   * - cuz the `useInfiniteQuery` hook is designed to provide a paginated response
   * for infinite scrolling, so it returns only the data for the current page and the next page.
   * The total count is lost as only the list of data are returned from the API function (see src/features/offers/api/index -> getInfiniteOffers())
   */
  const setTotal = useBoundStore.getState().setTotalOffers;
  setTotal(response.data?.data?.count || 0);

  return response?.data?.data?.rows;
};

export const getInfiniteOffers = async (
  filters: IOfferTableFilter
): Promise<IListResponse<IOffer>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getAll,
    params: filters,
  });

  if (error) {
    return Promise.reject(error);
  }

  /**
   * Set the total count (of offers)
   *
   * Why use store and not take directly from queryData?
   * - cuz the `useInfiniteQuery` hook is designed to provide a paginated response
   * for infinite scrolling, so it returns only the data for the current page and the next page.
   * The total count is lost as only the list of data are returned from the API function (see src/features/offers/api/index -> getInfiniteOffers())
   */
  const setTotal = useBoundStore.getState().setTotalOffers;
  setTotal(response.data?.data?.count || response.data?.data?.total || 0);

  return response?.data?.data;
};

export const getOfferById = async (id: string): Promise<IResponse<IOffer>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getOne.replace(':id', id),
    params: {
      paramType: 'offerId',
    },
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const addOffer = async (
  data: IAddOfferSchema
): Promise<IResponse<IOffer>> => {
  const { response, error } = await baseRequest({
    method: 'POST',
    url: apiRoute.add,
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const editOffer = async (
  id: string,
  data: IEditOfferSchema
): Promise<IResponse<IOffer>> => {
  const { response, error } = await baseRequest({
    method: 'PATCH',
    url: apiRoute.edit.replace(':id', id),
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const deleteOffer = async (
  id: string
): Promise<IResponse<{ isDeleted: boolean }>> => {
  const { response, error } = await baseRequest({
    method: 'DELETE',
    url: apiRoute.delete.replace(':id', id),
    params: {
      paramType: 'offerId',
    },
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};
