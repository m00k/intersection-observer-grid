import { ComponentChildren, FunctionComponent, h } from 'preact';
import { forwardRef } from 'preact/compat';
import * as VM from '../../../api/model';
import style from '../styles/index.css';

export interface CategoryProps {
    category: VM.Category;
    children: ComponentChildren;
}

const Category: FunctionComponent<CategoryProps> = ({
    category,
    children,
}, ref) => {
    const { name, id } = category

    return (
        <section ref={ref} class={style.category} data-id={id}>
            <h3>{name}</h3>
            {children}
        </section>
    );
}

export default forwardRef(Category)
