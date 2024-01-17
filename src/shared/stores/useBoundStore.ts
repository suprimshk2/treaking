import { IUserSlice } from 'features/users/interfaces';
import { createUserSlice } from 'features/users/stores';
import { IAuthSlice } from 'shared/interfaces/auth';
import { ILayoutSlice } from 'shared/interfaces/layout';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRoleSlice } from 'features/settings/roles-and-permissions/stores';
import { IRoleSlice } from 'features/settings/roles-and-permissions/interfaces';

import { createQuizSlice } from 'features/quiz/store';
import { IQuizSlice } from 'features/quiz/interfaces';
import { createAuthSlice } from './auth';
import { createLayoutSlice } from './layout';
import createSelectors from './selectors';

const useBoundStoreBase = create<
  IAuthSlice & ILayoutSlice & IUserSlice & IRoleSlice & IQuizSlice
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createLayoutSlice(...a),
    ...createUserSlice(...a),
    ...createQuizSlice(...a),
    ...createRoleSlice(...a),
  }))
);

export const useBoundStore = createSelectors(useBoundStoreBase);
