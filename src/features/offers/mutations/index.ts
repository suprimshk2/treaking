import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { IError, IListResponse } from 'shared/interfaces/http';
import { useBoundStore } from 'shared/stores/useBoundStore';

import { formatSortParam } from 'shared/utils/misc';

import * as offerAPI from '../api';
import { IAddOfferSchema, IEditOfferSchema, IOffer } from '../interfaces';
import { infiniteOfferKeys } from '../queries';

export const useAddOfferMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const filters = useBoundStore.getState().offerTableFilters;
  const { sortBy, sortOrder } = useBoundStore.getState().offerSort;
  const { totalOffers, setTotalOffers } = useBoundStore.getState();

  return useMutation({
    mutationFn: ({ data }: { data: IAddOfferSchema }) =>
      offerAPI.addOffer(data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Offer added successfully', {
        variant: 'success',
      });

      const queryKey = infiniteOfferKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
      });
      const queryData: InfiniteData<IListResponse<IOffer>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }
      queryData.pages[0].rows.unshift(res.data);
      const newPagesArray = [...queryData.pages];

      queryClient.setQueryData<InfiniteData<IListResponse<IOffer>>>(
        queryKey,
        (data) => ({
          pages: newPagesArray,
          pageParams: data?.pageParams || [],
        })
      );

      // Update the total offers in the store
      setTotalOffers(totalOffers + 1);
    },
  });
};

export const useEditOfferMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { sortBy, sortOrder } = useBoundStore.getState().offerSort;
  const filters = useBoundStore.getState().offerTableFilters;

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IEditOfferSchema }) =>
      offerAPI.editOffer(id, data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Offer edited successfully', {
        variant: 'success',
      });

      const queryKey = infiniteOfferKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
      });

      const queryData: InfiniteData<IListResponse<IOffer>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      // Update the offer in the list with updated data

      queryData.pages.find((page) => {
        const exist = page.rows.findIndex(
          (item: IOffer) => item.offerId === res.data.offerId
        );
        if (exist >= 0) {
          // eslint-disable-next-line no-param-reassign
          page.rows[exist] = res.data;
          return exist;
        }
        return false;
        // return {
        //   ...page,
        //   rows: page.rows.map((item: IOffer) => {
        //     if (item._id !== res.data._id) return item;
        //     return res.data;
        //   }),
        // };
      });

      queryClient.setQueryData<InfiniteData<IListResponse<IOffer>>>(
        queryKey,
        (data) => ({
          pages: queryData.pages,
          pageParams: data?.pageParams || [],
        })
      );
    },
  });
};

export const useDeleteOfferMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const filters = useBoundStore.getState().offerTableFilters;
  // const { totalOffers, setTotalOffers } = useBoundStore.getState();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => offerAPI.deleteOffer(id),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Offer deleted successfully', {
        variant: 'success',
      });
      const { sortBy, sortOrder } = useBoundStore.getState().offerSort;
      const queryKey = infiniteOfferKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
      });

      const queryData: InfiniteData<IOffer[]> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      // Invalidated the query instead of manual update because removing a item from the pages interferes with
      // how `hasNextPage` is calculated.
      queryClient.invalidateQueries({ queryKey });

      // However, if you want to do a manual update you can do it like this (shown below)
      // ------------
      // Remove the deleted offer from the list
      // const newPagesArray =
      //   queryData.pages.map((page) =>
      //     page.filter((offer) => offer._id !== context.id)  // context can be taken from arg like onSuccess: (res, context) => {}
      //   ) ?? [];

      // queryClient.setQueryData<InfiniteData<IOffer[]>>(queryKey, (data) => ({
      //   pages: newPagesArray,
      //   pageParams: data?.pageParams || [],
      // }));

      // Update the total offers in the store
      // setTotalOffers(totalOffers - 1);
    },
    onError: (err: IError) => {
      enqueueSnackbar(err.message || 'Error deleting offer', {
        variant: 'error',
      });
    },
  });
};
