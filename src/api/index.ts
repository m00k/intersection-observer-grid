import * as VM from './model';

type Factory<T> = (_: unknown, index: number) => T;
const rangeFn = <T>(l: number) => 
    (fn: Factory<T>): Array<T> => 
        (new Array(l))
            .fill(0, 0)
            .map(fn)
;

const CATEGORIES_TOTAL = 16;
const categoryFn: Factory<VM.Category> = (_, id) => ({ id, name: `Category_${id}` });
export const categories: Array<VM.Category> = rangeFn<VM.Category>(CATEGORIES_TOTAL)(categoryFn);

const categoriesMedian = Math.ceil(CATEGORIES_TOTAL / 2);
const categoryItemsFn = (category: VM.Category) => (_: unknown, id: number): VM.Item => ({ id, name: `Item_${id}`, category });
export const itemsTotalByCategoryIndex: number[] = categories
    .map((_, i) => categoriesMedian - Math.abs((categoriesMedian - i - 1)))
    .map(x => Math.max(3, x * 3))
;
export const items: Array<VM.Item> = itemsTotalByCategoryIndex
    .flatMap((l, i) => (new Array(l).fill(i, 0)))
    .map((l, id) => categoryItemsFn(categories[l])(l, id))
;