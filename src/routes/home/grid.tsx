import { Fragment, FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';
import { categories, categoriesWithItems } from '../../api';
import Grid from '../../components/grid';
import { scrollNavItemIntoViewFn } from '../../components/grid/nav.service';
import { useGridObserver } from '../../components/grid/useGridObserver';
import locationHashToIndex from './locationHashToIndex';

const GridBlock: FunctionalComponent = () => {
    const containerRef = useRef<HTMLElement>()
    const navRef = useRef<HTMLElement>()
    const initialIndex = locationHashToIndex()
    const [activeIndex, categoryRefCallback, onNavigation] = useGridObserver(initialIndex, scrollNavItemIntoViewFn(navRef), containerRef)

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
