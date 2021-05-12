import { Fragment, FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';
import { categories, categoriesWithItems } from '../../api';
import Grid from '../../components/grid';
import { scrollChildIntoViewFn } from '../../components/grid/nav';
import { useGridObserver } from '../../components/grid/useGridObserver';

// TODO: move
const getInitialIndex = (): number => {
    const categoryName = window.location.hash || ''
    const idIndex = categoryName.indexOf('_')
    return idIndex > -1 ? +categoryName.substring(idIndex + 1) : 0
}

const GridBlock: FunctionalComponent = () => {
    const containerRef = useRef<HTMLElement>()
    const navRef = useRef<HTMLElement>()
    const initialIndex = getInitialIndex()
    const [activeIndex, categoryRefCallback, onNavigation] = useGridObserver(initialIndex, scrollChildIntoViewFn(navRef), containerRef)

    return (
        <Fragment>
            <Grid.Nav ref={navRef} {...{ categories, activeIndex, onNavigation }} />
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
