import { FunctionalComponent, h } from 'preact';
import Grid from '../../components/grid';
import { categories, items } from '../../api';
import { useRef } from 'preact/hooks';
import { useIntersectionObserver } from '../../components/grid/useIntersectionObserver';


const GridBlock: FunctionalComponent = () => {
    const containerRef = useRef<HTMLElement>()
    const categoryRef = useRef<HTMLElement>()
    const options: IntersectionObserverInit = { root: window.document.body }
    useIntersectionObserver(categoryRef, () => console.log('############', 'intersect'), options)

    return (
        <Grid.Container ref={containerRef}>
            <Grid.Header {...{categories}} />
            <Grid.ItemList {...{items}}>
                {items.map(item => (<Grid.ItemDetail key={item.id} {...{item}} />))}
            </Grid.ItemList>
        </Grid.Container>
    );
};

export default GridBlock;
