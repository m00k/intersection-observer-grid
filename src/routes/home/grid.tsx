import { Fragment, FunctionalComponent, h, RefCallback, RefObject } from 'preact';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { categories, categoriesWithItems } from '../../api';
import Grid from '../../components/grid';

const baseStyles = [
    'color: #fff',
    'background-color: #090',
    'padding: 4px',
    'border-radius: 2px'
].join(';');

// TODO: move type
export type IntersectionTarget =
    | 'page'
    | 'container'
    | 'nav'
    | 'category'

type IndexChangedHandler = (index: number) => void;

const calcIndexWithMaxIntersectionRatio = (intersectionEntries: IntersectionObserverEntry[]): number => {
    return intersectionEntries
        .reduce((acc, curr, i, arr) => {
            const accRatio = arr[acc]?.intersectionRatio || 0;
            const currRatio = curr.intersectionRatio;
            if (accRatio === currRatio) return acc < i ? acc : i
            return accRatio >= currRatio ? acc : i
        }, 0)
}

const threshold = [0, 0.2, 0.4, 0.6, 0.8, 1];

export const useIntersectionObserver = (
    callback: IntersectionObserverCallback,
    containerRef?: RefObject<Element>,
    pOptions?: Omit<IntersectionObserverInit, 'root'>,
): IntersectionObserver => {
    return useMemo(() => {
        console.log('############## observer init')
        const options = { ...pOptions, root: containerRef?.current }
        return new IntersectionObserver(callback, options)
    // NOTE: adding pOptions will re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback, containerRef])
}

const GridBlock: FunctionalComponent = () => {
    const containerRef = useRef<HTMLElement>()
    const [activeIndex, setActiveIndex] = useState(0)
    const categoryIntersectionsRef = useRef<IntersectionObserverEntry[]>()
    const handleCategoryIntersection: IntersectionObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        categoryIntersectionsRef.current = categoryIntersectionsRef.current || [...entries]
        entries.forEach(e => {
            const updateIndex = categoryIntersectionsRef.current.findIndex(ce => (ce.target as HTMLElement)?.dataset?.id === (e.target as HTMLElement)?.dataset?.id)
            updateIndex > -1 && (categoryIntersectionsRef.current[updateIndex] = e)
        })
        const nextActiveIndex = calcIndexWithMaxIntersectionRatio(categoryIntersectionsRef.current)
        setActiveIndex(nextActiveIndex)
    }, [])
    const observer = useIntersectionObserver(
        handleCategoryIntersection,
        containerRef,
        { threshold },
    );
    const categoryRefCallback: RefCallback<HTMLDivElement> = useCallback(r => (r && observer.observe(r)), [observer])

    // TODO
    // disconnect while scrolling into view -> observer.disconnect() vs categoryIntersectionsRef.current.forEach(e => observer.unobserve(e.target))
    // reconnect after nav scrolling is done -> categoryIntersectionsRef.current.forEach(e => observer.observe(e.target))

    // const [intersectionTarget, setIntersectionTarget] = useState<IntersectionTarget>('page') // TODO: 'category' ?

    // const setIntersectionState = (index: number, target: IntersectionTarget): void => {
    //     if (target === 'nav') {
    //         containerRef.current.children[index].scrollIntoView({behavior: 'smooth'})
    //         setIntersectionTarget(target)
    //         setActiveIndex(index)
    //         // TODO: back to curr after timeout
    //     }
    //     if (target === 'category' && target === intersectionTarget) {
    //         setIntersectionTarget(target)
    //         setActiveIndex(index)
    //     }

    // }
    // const cb: IndexChangedHandler = index => {
    //     setIntersectionState(index, 'category')
    // }
    // const onCategoryIntersectionChanged = useHandleCategoryIntersectionChanged(cb)
    // const onNavigation: IndexChangedHandler = index => setIntersectionState(index, 'nav')

    useEffect(() => { console.log(`%cactive category index: ${activeIndex}`, baseStyles) }, [activeIndex])
    useEffect(() => { console.log(`observer: ${observer}`, baseStyles) }, [observer])
    useEffect(() => { console.log(`containerRef: ${containerRef}`, baseStyles) }, [containerRef])
    useEffect(() => { console.log(`handleCategoryIntersection:`, baseStyles) }, [handleCategoryIntersection])
    useEffect(() => { console.log(`categoryRefCallback:`, baseStyles) }, [categoryRefCallback])

    return (
        <Fragment>
            <Grid.Nav {...{ categories, activeIndex, intersectionTarget: null, onNavigation: Function.prototype }} />
            <Grid.Container ref={containerRef}>
                {categories.map(category => (
                    <Grid.Category
                        key={category.id}
                        ref={categoryRefCallback}
                        {...{
                            category,
                            containerRef,
                        }}>
                        <Grid.ItemList>
                            {categoriesWithItems[category.id].map(item => (
                                <Grid.ItemDetail key={item.id} {...{ item }} />)
                            )}
                        </Grid.ItemList>
                    </Grid.Category>
                ))}
            </Grid.Container>
        </Fragment>
    );
};

export default GridBlock;
