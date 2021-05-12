import { Fragment, h, VNode } from 'preact';
import { useRef } from 'preact/hooks';
import { categories, categoriesWithItems } from '../../api';
import Grid from './components';
import { scrollNavItemIntoViewFn, useGridObserver } from './services';

const GridBlock = ({
    initialIndex
}: {
    initialIndex: number;
}): VNode => {
    const containerRef = useRef<HTMLElement>()
    const navRef = useRef<HTMLElement>()
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
