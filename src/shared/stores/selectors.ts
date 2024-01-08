import { StoreApi, UseBoundStore } from 'zustand';

type State = object;

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<State>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  /**
   * Taken straight from the official Zustand doc (https://docs.pmnd.rs/zustand/guides/auto-generating-selectors)
   * So, it should be safe to disable the rule here.
   */
  // eslint-disable-next-line no-restricted-syntax
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export default createSelectors;
