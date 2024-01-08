import { ILayoutSlice } from 'shared/interfaces/layout';
import { StateCreator } from 'zustand';

export const createLayoutSlice: StateCreator<ILayoutSlice> = (set) => ({
  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
});
