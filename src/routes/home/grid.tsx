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
            const accRatio = arr[acc]?.intersectionRatio || 0;
            const currRatio = curr.intersectionRatio;
            if (accRatio === currRatio) return acc < i ? acc : i
            return accRatio >= currRatio ? acc : i
        }, 0)
}

const useHandleCategoryIntersectionChanged = (
    handleActiveCategoryChanged: (index: number) => void
): CategoryIntersectionObserverCallback => {
    const categoryIntersectionsRef = useRef<IntersectionObserverEntry[]>([])
    const categoryIntersections = categoryIntersectionsRef.current
    return (index: number, entry: IntersectionObserverEntry): void => {
        categoryIntersections[index] = entry
        handleActiveCategoryChanged(calcMaxIntersectionRatio(categoryIntersections))
    }    
}

// TODO: const [intersectionTarget, setIntersectionTarget] = useState(null)
const GridBlock: FunctionalComponent = () => {
    const containerRef = useRef<HTMLElement>()
    const [activeIndex, setActiveIndex] = useState(0)
    const onCategoryIntersectionChanged: CategoryIntersectionObserverCallback = useHandleCategoryIntersectionChanged(setActiveIndex)
    useEffect(() => { console.log(`%cactive category index: ${activeIndex}`, baseStyles) }, [activeIndex])

    return (
        <Grid.Container ref={containerRef}>
            <Grid.Nav {...{ categories, activeIndex }} />
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
