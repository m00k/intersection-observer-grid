import { FunctionalComponent, h } from 'preact';
import Grid from '../../components/grid';
import { categories, categoriesWithItems } from '../../api';
import { StateUpdater, useEffect, useRef, useState } from 'preact/hooks';

const baseStyles = [
    'color: #fff',
    'background-color: #090',
    'padding: 4px',
    'border-radius: 2px'
].join(';');

type IntersectionTarget =
    | 'page'
    | 'container'
    | 'nav'
    | 'category'

const calcMaxIntersectionRatio = (intersectionEntries: IntersectionObserverEntry[], currMax: number): number => {
    return intersectionEntries
        .reduce((acc, curr, i, arr) => {
            const accRatio = arr[acc].intersectionRatio;
            const currRatio = curr.intersectionRatio;
            if (accRatio === currRatio) return acc < i ? acc : i
            return accRatio >= currRatio ? acc : i
        }, currMax)
}

const useHandleCategoryIntersectionChanged = (
    intersectionEntries: IntersectionObserverEntry[],
    stateUpdater: StateUpdater<number>,
) => (index: number): IntersectionObserverCallback => {
    const intersectionObserverCallback = (index: number, entries: IntersectionObserverEntry[]): void => {
        const entry = entries?.[0]
        intersectionEntries[index] = entry
        stateUpdater(currentActiveCategoryIndex => calcMaxIntersectionRatio(intersectionEntries, currentActiveCategoryIndex))
    }    
    return (entries: IntersectionObserverEntry[]): void => intersectionObserverCallback(index, entries)
}

const GridBlock: FunctionalComponent = () => {
    const containerRef = useRef<HTMLElement>()
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
    // TODO (cb):
    // const [intersectionTarget, setIntersectionTarget] = useState(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const initialIntersectionEntries = categories.map(_ => ({ intersectionRatio: 0 } as IntersectionObserverEntry))
    const intersectionEntriesRef = useRef<IntersectionObserverEntry[]>(initialIntersectionEntries)
    const handleCategoryIntersectionChangedFn = useHandleCategoryIntersectionChanged(intersectionEntriesRef.current, setActiveCategoryIndex)
    useEffect(() => { console.log(`%cactive category index: ${activeCategoryIndex}`, baseStyles) }, [activeCategoryIndex])

    return (
        <Grid.Container ref={containerRef}>
            <Grid.Header {...{ categories }} />
            {categories.map((category, index) => (
                <Grid.Category key={category.id} {...{ category, containerRef, onIntersectionChanged: handleCategoryIntersectionChangedFn(index) }}>
                    <Grid.ItemList>
                        {categoriesWithItems[category.id].map(item => (
                            <Grid.ItemDetail key={item.id} {...{ item }} />)
                        )}
                    </Grid.ItemList>
                </Grid.Category>
            ))}
        </Grid.Container>
    );
};

export default GridBlock;
