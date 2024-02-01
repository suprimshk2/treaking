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
import { IOfferSlice } from 'features/offers/interfaces';
import { createOfferSlice } from 'features/offers/stores';
import { createVendorSlice } from 'features/vendor/store';
import { IVendorSlice } from 'features/vendor/interfaces';
import { createProductSlice } from 'features/product/store';
import { IProductSlice } from 'features/product/interfaces';
import { createAuthSlice } from './auth';
import { createLayoutSlice } from './layout';
import createSelectors from './selectors';

const useBoundStoreBase = create<
  IAuthSlice &
    ILayoutSlice &
    IRoleSlice &
    IUserSlice &
    IVendorSlice &
    IProductSlice &
    IQuizSlice &
    IOfferSlice
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createOfferSlice(...a),
    ...createLayoutSlice(...a),
    ...createUserSlice(...a),
    ...createQuizSlice(...a),
    ...createVendorSlice(...a),
    ...createProductSlice(...a),
    ...createRoleSlice(...a),
  }))
);

export const useBoundStore = createSelectors(useBoundStoreBase);
