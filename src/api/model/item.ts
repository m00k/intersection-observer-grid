import { Category } from './category';

export interface Item {
    category: Category;
    id: number;
    name: string;
}