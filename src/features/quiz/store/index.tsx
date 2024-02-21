import { StateCreator } from 'zustand';
import { IQuizSlice, IQuizTableFilter } from '../interfaces';
import { quizConfig } from '../constant/config';

export const createQuizSlice: StateCreator<IQuizSlice> = (set) => ({
  quizTableFilters: quizConfig.QUIZ_TABLE_DEFAULT_FILTER,
  setQuizTableFilters: (newFilters: Partial<IQuizTableFilter>) =>
    set((state) => ({
      quizTableFilters: { ...state.quizTableFilters, ...newFilters },
    })),
  quizSort: {
    // sortBy: null,
    sortOrder: null,
  },
  changeQuizSortByAndOrder: (newOrder) =>
    set((state) => ({
      quizSort: { ...state.quizSort, ...newOrder },
    })),
  resetQuizTableFilters: () =>
    set(() => ({
      quizTableFilters: { ...quizConfig.QUIZ_TABLE_DEFAULT_FILTER },
    })),
});
