import { categories, CATEGORIES_TOTAL, categoriesWithItems, itemsTotalByCategoryIndex } from '../src/api';

describe('api', () => {
    test('should generate sample data', () => {
        // console.log(categories);
        // console.log(itemsTotalByCategoryIndex);
        // console.log(categoriesWithItems[0]);

        expect(categories.length).toEqual(CATEGORIES_TOTAL);
        const itemsTotalInCategoriesWithItems = categoriesWithItems.flatMap(x => x).length
        const itemsTotalAsSumOverCategoriesLength = itemsTotalByCategoryIndex.reduce((acc, curr) => acc + curr)
        expect(itemsTotalInCategoriesWithItems).toEqual(itemsTotalAsSumOverCategoriesLength);
    });
});
