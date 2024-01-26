import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { formatSortParam } from 'shared/utils/misc';
import { queryClient } from 'App';
import { IError, IListResponse } from 'shared/interfaces/http';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { infiniteQuizKeys } from '../queries';
import * as quizAPI from '../api';
import { IAddQuizSchema, IFormattedQuizFormSchema } from '../interfaces';

export const useAddQuizMutation = () => {
  const filters = useBoundStore.getState().quizTableFilters;
  const { sortBy, sortOrder } = useBoundStore.getState().quizSort;

  return useMutation({
    mutationFn: ({ data }: { data: IFormattedQuizFormSchema }) =>
      quizAPI.addQuiz(data),
    onSuccess: (res) => {
      console.log(res, 'logg ress');

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
  });
};

export const useDeleteQuizMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const filters = useBoundStore.getState().userTableFilters;
  // const { totalUsers, setTotalUsers } = useBoundStore.getState();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => quizAPI.deleteQuiz(id),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'User deleted successfully', {
        variant: 'success',
      });
      const { sortBy, sortOrder } = useBoundStore.getState().userSort;
      const queryKey = infiniteQuizKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
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
    queryKey: infiniteQuizKeys.detail(id),
    queryFn: () => quizAPI.getQuizById(id),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data?.data,
  };
};
