import { InfiniteData, useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { formatSortParam } from 'shared/utils/misc';
import { queryClient } from 'App';
import { IListResponse } from 'shared/interfaces/http';
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
