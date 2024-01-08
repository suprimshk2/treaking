/* eslint-disable @typescript-eslint/no-explicit-any */
import _, { PropertyName, TruncateOptions, intersection } from 'lodash';

export const merge = (obj: object, sources?: any) => _.merge(obj, sources);

export const debounce = (func: (...args: any[]) => any, wait: number) =>
  _.debounce(func, wait);

export const pickBy = (
  obj: object,
  predicate?: _.ValueKeyIteratee<never> | undefined
) => _.pickBy(obj, predicate);

export const isEmpty = (obj: object) => _.isEmpty(obj);

export const size = (collection: object | string | null | undefined) =>
  _.size(collection);

export const omit = (object: object, paths: PropertyName[]) =>
  _.omit(object, paths);

export const truncate = (str: string, options?: TruncateOptions) =>
  _.truncate(str, options);

export const compareArraysIntersectionExits = (a: string[], b: string[]) => {
  const result = intersection(a, b);
  if (result.length > 0) return true;
  return false;
};
