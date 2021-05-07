import { FunctionalComponent, h } from 'preact';
import Grid from '../../components/grid';
import { categories, categoriesWithItems } from '../../api';
import { useEffect, useRef, useState } from 'preact/hooks';
import { CategoryIntersectionObserverCallback } from '../../components/grid/category';

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

const calcMaxIntersectionRatio = (intersectionEntries: IntersectionObserverEntry[]): number => {
    return intersectionEntries
        .reduce((acc, curr, i, arr) => {
            const accRatio = arr[acc].intersectionRatio;
            const currRatio = curr.intersectionRatio;
            if (accRatio === currRatio) return acc < i ? acc : i
            return accRatio >= currRatio ? acc : i
        }, 0)
}

const useHandleCategoryIntersectionChanged = (
    handleActiveCategoryChanged: (index: number) => void
): CategoryIntersectionObserverCallback => {
    const initialIntersectionEntries = categories.map(() => ({ intersectionRatio: 0 } as IntersectionObserverEntry))
    const intersectionEntriesRef = useRef<IntersectionObserverEntry[]>(initialIntersectionEntries)
    const intersectionEntries = intersectionEntriesRef.current
    return (index: number, entry: IntersectionObserverEntry): void => {
        intersectionEntries[index] = entry
        handleActiveCategoryChanged(calcMaxIntersectionRatio(intersectionEntries))
    }    
}

// TODO (cb):
// const [intersectionTarget, setIntersectionTarget] = useState(null)

const GridBlock: FunctionalComponent = () => {
    const containerRef = useRef<HTMLElement>()
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
    const onCategoryIntersectionChanged: CategoryIntersectionObserverCallback = useHandleCategoryIntersectionChanged(setActiveCategoryIndex)
    useEffect(() => { console.log(`%cactive category index: ${activeCategoryIndex}`, baseStyles) }, [activeCategoryIndex])

    return (
        <Grid.Container ref={containerRef}>
            <Grid.Header {...{ categories }} />
            {categories.map((category, index) => (
                <Grid.Category key={category.id} {...{ index, category, containerRef, onCategoryIntersectionChanged }}>
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
