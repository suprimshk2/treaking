import { IResponse } from 'shared/interfaces/http';

const sortByOrder = (data: any) => {
  data?.sort?.((a: any, b: any) => {
    if (a?.subModules?.length) {
      sortByOrder(a.subModules);
    }
    if (b?.subModules?.length) {
      sortByOrder(a.subModules);
    }

    return a.order > b.order ? 1 : -1;
  });
};

export const sortPermissionByOrder = (res: any): IResponse<any> => {
  sortByOrder(res.data?.modules);
  return {
    ...res,
    data: {
      ...res.data,
      modules: res.data?.modules,
    },
  };
};
