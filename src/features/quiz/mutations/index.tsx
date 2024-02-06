import { InfiniteData, useMutation, useQuery } from '@tanstack/react-query';

import { formatSortParam } from 'shared/utils/misc';
import { queryClient } from 'App';
import { IError, IListResponse } from 'shared/interfaces/http';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { enqueueSnackbar } from 'notistack';
import { infiniteQuizKeys } from '../queries';
import * as quizAPI from '../api';
import { formatQuizDetail } from '../utils';

import { IAddQuizSchema, IFormattedQuizFormSchema, IQuiz } from '../interfaces';
import { WinnerAddFormSchemaType } from '../schemas';

export const useAddQuizMutation = () => {
  const filters = useBoundStore.getState().quizTableFilters;
  const { sortBy, sortOrder } = useBoundStore.getState().quizSort;

  return useMutation({
    mutationFn: ({ data }: { data: IFormattedQuizFormSchema }) =>
      quizAPI.addQuiz(data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Quiz added successfully', {
        variant: 'success',
      });

      const queryKey = infiniteQuizKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
      });
      const queryData: InfiniteData<IListResponse<IAddQuizSchema>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }
      queryData.pages[0].rows.unshift(res.data);
      const newPagesArray = [...queryData.pages];

      // // add the newly created user to the list
      // // const newPagesArray = [
      // //   [res.data, ...queryData.pages[0].rows],
      // //   ...queryData.pages.slice(1),
      // // ];

      queryClient.setQueryData<InfiniteData<IListResponse<IAddQuizSchema>>>(
        queryKey,
        (data) => ({
          pages: newPagesArray,
          pageParams: data?.pageParams || [],
        })
      );

      // Update the total users in the store
      // setTotalUsers(totalUsers + 1);
    },
    onError: (error: IError) => {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    },
  });
};
export const useEditQuizMutation = () => {
  const { sortBy, sortOrder } = useBoundStore.getState().quizSort;
  const filters = useBoundStore.getState().quizTableFilters;

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IFormattedQuizFormSchema;
    }) => quizAPI.editQuiz(id, data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Quiz edited successfully', {
        variant: 'success',
      });

      const queryKey = infiniteQuizKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
      });

      const queryData: InfiniteData<IListResponse<IQuiz>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      queryData.pages.find((page) => {
        const exist = page.rows.findIndex(
          (item: IQuiz) => item.gameId === res.data.gameId
        );
        if (exist >= 0) {
          // eslint-disable-next-line no-param-reassign
          page.rows[exist] = res.data;
          return exist;
        }
        return false;
        // return {
        //   ...page,
        //   rows: page.rows.map((item: IQuiz) => {
        //     if (item._id !== res.data._id) return item;
        //     return res.data;
        //   }),
        // };
      });

      queryClient.setQueryData<InfiniteData<IListResponse<IQuiz>>>(
        queryKey,
        (data) => ({
          pages: queryData.pages,
          pageParams: data?.pageParams || [],
        })
      );
    },
  });
};

export const useDeleteQuizMutation = () => {
  const filters = useBoundStore.getState().quizTableFilters;

  return useMutation({
    mutationFn: ({ id }: { id: string }) => quizAPI.deleteQuiz(id),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Game deleted successfully', {
        variant: 'success',
      });
      const { sortBy, sortOrder } = useBoundStore.getState().userSort;
      const queryKey = infiniteQuizKeys.list({
        ...filters,
        // ...formatSortParam({
        //   sortBy,
        //   sortOrder,
        // }),
      });

      const queryData: InfiniteData<any[]> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      // Invalidated the query instead of manual update because removing a item from the pages interferes with
      // how `hasNextPage` is calculated.
      queryClient.invalidateQueries({ queryKey });

      // However, if you want to do a manual update you can do it like this (shown below)
      // ------------
      // Remove the deleted user from the list
      // const newPagesArray =
      //   queryData.pages.map((page) =>
      //     page.filter((user) => user._id !== context.id)  // context can be taken from arg like onSuccess: (res, context) => {}
      //   ) ?? [];

      // queryClient.setQueryData<InfiniteData<IUser[]>>(queryKey, (data) => ({
      //   pages: newPagesArray,
      //   pageParams: data?.pageParams || [],
      // }));

      // Update the total users in the store
      // setTotalUsers(totalUsers - 1);
    },
    onError: (err: IError) => {
      enqueueSnackbar(err.message || 'Error deleting user', {
        variant: 'error',
      });
    },
  });
};

export const useQuizDetailQuery = (
  id: string,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    select: formatQuizDetail,
    queryKey: infiniteQuizKeys.detail(id),
    queryFn: () => quizAPI.getQuizById(id),
    enabled,
  });
  console.log(queryInfo.data, 'queryInfo');

  return {
    ...queryInfo,
    data: queryInfo?.data,
  };
};
export const useWinnerDetailQuery = (
  id: string,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteQuizKeys.detail(id),
    queryFn: () => quizAPI.getQuizWinnerById(id),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data?.data,
  };
};
export const useAddWinnerMutation = () => {
  const { sortBy, sortOrder } = useBoundStore.getState().quizSort;
  const filters = useBoundStore.getState().quizTableFilters;

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: WinnerAddFormSchemaType }) =>
      quizAPI.addWinnerQuiz(id, data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'winner added successfully', {
        variant: 'success',
      });

      const queryKey = infiniteQuizKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
      });

      const queryData: InfiniteData<IListResponse<IQuiz>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      queryData.pages.find((page) => {
        const exist = page.rows.findIndex(
          (item: IQuiz) => item.gameId === res.data.gameId
        );
        if (exist >= 0) {
          // eslint-disable-next-line no-param-reassign
          page.rows[exist] = res.data;
          return exist;
        }
        return false;
        // return {
        //   ...page,
        //   rows: page.rows.map((item: IQuiz) => {
        //     if (item._id !== res.data._id) return item;
        //     return res.data;
        //   }),
        // };
      });

      queryClient.setQueryData<InfiniteData<IListResponse<IQuiz>>>(
        queryKey,
        (data) => ({
          pages: queryData.pages,
          pageParams: data?.pageParams || [],
        })
      );
    },
  });
};
