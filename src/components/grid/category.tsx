import { ComponentChildren, FunctionComponent, h, RefObject } from 'preact';
import { useCallback, useRef } from 'preact/hooks';
import * as VM from '../../api/model';
import { useIntersectionObserver } from '../../components/grid/useIntersectionObserver';
import style from './style.css';

export interface CategoryProps {
    category: VM.Category;
    containerRef: RefObject<HTMLElement>;
    children: ComponentChildren;
    onIntersectionChanged: IntersectionObserverCallback;
}

const Category: FunctionComponent<CategoryProps> = ({
    category,
    containerRef,
    children,
    onIntersectionChanged,
}) => {
    const { name } = category
    const threshold = [0, 0.1, 0.3, 0.5, 0.7, 0.9]
    const options: IntersectionObserverInit = { root: containerRef.current, threshold }
    const ref = useRef<HTMLElement>()
    useIntersectionObserver(ref, onIntersectionChanged, options)

    return (
        <section ref={ref} class={style.category}>
            <h3>{name}</h3>
            {children}
        </section>
    );
}

export default Category
