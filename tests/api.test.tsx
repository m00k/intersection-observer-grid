import { categories, CATEGORIES_TOTAL, categoriesWithItems, itemsTotalByCategoryIndex } from '../src/api';

describe('api', () => {
    test('should generate sample data', () => {
        // console.log(categories);
        // console.log(itemsTotalByCategoryIndex);
        console.log(categoriesWithItems[0]);

        expect(categories.length).toEqual(CATEGORIES_TOTAL);
        expect(categoriesWithItems.flatMap(x => x).length).toEqual(itemsTotalByCategoryIndex.reduce((acc, curr) => acc + curr));
    });
});
