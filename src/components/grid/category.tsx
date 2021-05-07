import { ComponentChildren, FunctionComponent, h, RefObject } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import * as VM from '../../api/model';
import { useIntersectionObserver } from '../../components/grid/useIntersectionObserver';
import { IntersectionTarget } from '../../routes/home/grid';
import style from './style.css';

export type CategoryIntersectionObserverCallback =
    (index: number, entry: IntersectionObserverEntry) => void

export interface CategoryProps {
    index: number;
    category: VM.Category;
    containerRef: RefObject<HTMLElement>;
    activeIndex: number;
    intersectionTarget: IntersectionTarget;
    onCategoryIntersectionChanged: CategoryIntersectionObserverCallback;
    children: ComponentChildren;
}

const Category: FunctionComponent<CategoryProps> = ({
    index,
    category,
    containerRef,
    activeIndex,
    intersectionTarget,
    onCategoryIntersectionChanged,
    children,
}) => {
    const { name } = category
    const threshold = [0.1, 0.3, 0.5, 0.7, 0.9]
    const options: IntersectionObserverInit = { root: containerRef.current, threshold }
    const ref = useRef<HTMLElement>()
    const handleIntersectionChanged: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0]
        onCategoryIntersectionChanged(index, entry)
    }
    useIntersectionObserver(ref, handleIntersectionChanged, options)
    useEffect(() => {
        if (intersectionTarget === 'category') return
        if (activeIndex !== index) return
        // TODO: 'smooth' not supported on safari
        ref.current.scrollIntoView({behavior: 'smooth'})
    }, [activeIndex, index, intersectionTarget])

    return (
        <section ref={ref} class={style.category}>
            <h3>{name}</h3>
            {children}
        </section>
    );
}

export default Category
