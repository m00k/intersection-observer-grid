import { FunctionComponent, h, ComponentChildren } from 'preact';
import * as VM from '../../api/model';
import style from './style.css';

export interface CategoryProps {
    children: ComponentChildren;
    category: VM.Category;
}

const Category: FunctionComponent<CategoryProps> = ({
    children,
    category,
}) => {
    const { name } = category;
    return (
        <section class={style.category}>
            <h3>{name}</h3>
            {children}
        </section>
    );
}

export default Category;
