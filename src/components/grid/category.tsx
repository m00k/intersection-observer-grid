import { ComponentChildren, FunctionComponent, h, RefObject } from 'preact';
import { useRef } from 'preact/hooks';
import * as VM from '../../api/model';
import { useIntersectionObserver } from '../../components/grid/useIntersectionObserver';
import style from './style.css';

export interface CategoryProps {
    category: VM.Category;
    containerRef: RefObject<HTMLElement>;
    children: ComponentChildren;
}

const log: (name: string) => IntersectionObserverCallback = name => (entries: IntersectionObserverEntry[]): void => {
    // TODO (cb):
    // multiply the intersection ratio of a category with the number of items
    // to get a more accurate result?
    const entry = entries?.[0];
    if (entry?.isIntersecting) {
        const baseStyles = [
            'color: #fff',
            'background-color: #090',
            'padding: 4px',
            'border-radius: 2px'
        ].join(';');
        console.log(`%cintersection: ${Math.round(entry?.intersectionRatio * 100)}% ${name}`, baseStyles)
    }
}

const Category: FunctionComponent<CategoryProps> = ({
    category,
    containerRef,
    children
}) => {
    const { name } = category;
    const threshold = [0.1, 0.3, 0.5, 0.7, 0.9]
    const options: IntersectionObserverInit = { root: containerRef.current, threshold }
    const ref = useRef<HTMLElement>();
    useIntersectionObserver(ref, log(name), options)

    return (
        <section ref={ref} class={style.category}>
            <h3>{name}</h3>
            {children}
        </section>
    );
}

export default Category;
