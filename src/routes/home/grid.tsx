import { FunctionalComponent, h } from 'preact';
import Grid from '../../components/grid';
import { categories, categoriesWithItems } from '../../api';
import { useRef, useState } from 'preact/hooks';

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

const GridBlock: FunctionalComponent = () => {
    const containerRef = useRef<HTMLElement>()
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
    const [intersectionTarget, setIntersectionTarget] = useState(null)
    const intersectionEntriesRef = useRef<IntersectionObserverEntry[]>(categories.map(_ => ({ intersectionRatio: 0 } as IntersectionObserverEntry)))
    const intersectionObserverTimeoutRef = useRef<number>(-1)
    const intersectionObserverCallback = (index: number, entries: IntersectionObserverEntry[]): void => {
        const entry = entries?.[0]
    
        intersectionEntriesRef.current[index] = entry
        const intersectionEntries = intersectionEntriesRef.current
        const newActiveCategoryIndex: number = intersectionEntries
            .reduce((acc, curr, i, arr) => {
                return arr[acc].intersectionRatio >= curr.intersectionRatio
                    ? acc
                    : i
            }, activeCategoryIndex)

        if (intersectionObserverTimeoutRef.current) window.clearTimeout(intersectionObserverTimeoutRef.current)
        intersectionObserverTimeoutRef.current = window.setTimeout(() => {
            console.log(`%cactive category index: ${newActiveCategoryIndex}`, baseStyles)
            // TODO (cb):
            // setActiveCategoryIndex(newActiveCategoryIndex)
        }, 100)
    }
    const handleIntersectionChangedFn = (index: number): IntersectionObserverCallback => 
        (entries: IntersectionObserverEntry[]) => intersectionObserverCallback(index, entries)

    return (
        <Grid.Container ref={containerRef}>
            <Grid.Header {...{ categories }} />
            {categories.map((category, index) => (
                <Grid.Category key={category.id} {...{ category, containerRef, onIntersectionChanged: handleIntersectionChangedFn(index) }}>
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
