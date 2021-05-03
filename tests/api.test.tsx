import { categories, items, itemsTotalByCategoryIndex } from '../src/api';

describe('api', () => {
    test('should generate sample data', () => {
        console.log(categories);
        console.log(itemsTotalByCategoryIndex);
        console.log(items);

        expect(categories.length).toEqual(16);
    });
});
