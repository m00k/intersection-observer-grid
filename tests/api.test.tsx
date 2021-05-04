import { categories, CATEGORIES_TOTAL, items, itemsTotalByCategoryIndex } from '../src/api';

describe('api', () => {
    test('should generate sample data', () => {
        // console.log(categories);
        // console.log(itemsTotalByCategoryIndex);
        // console.log(items);

        expect(categories.length).toEqual(CATEGORIES_TOTAL);
        expect(items.length).toEqual(itemsTotalByCategoryIndex.reduce((acc, curr) => acc + curr));
    });
});
