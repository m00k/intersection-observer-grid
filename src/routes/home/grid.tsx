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
    const [, setActiveCategoryIndex] = useState(0)
    // const [intersectionTarget, setIntersectionTarget] = useState(null)
    const intersectionEntriesRef = useRef<IntersectionObserverEntry[]>(categories.map(_ => ({ intersectionRatio: 0 } as IntersectionObserverEntry)))
    const intersectionObserverCallback = (index: number, entries: IntersectionObserverEntry[]): void => {
        const entry = entries?.[0]
    
        intersectionEntriesRef.current[index] = entry
        const intersectionEntries = intersectionEntriesRef.current
        setActiveCategoryIndex(curr => {
            const next = intersectionEntries
                .reduce((acc, curr, i, arr) => {
                    return arr[acc].intersectionRatio >= curr.intersectionRatio
                        ? acc
                        : i
                }, curr)
            console.log(`%cactive category index: ${next}`, baseStyles)
            return next
        });
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
