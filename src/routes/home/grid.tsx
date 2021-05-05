import { FunctionalComponent, h } from 'preact';
import Grid from '../../components/grid';
import { categories, categoriesWithItems } from '../../api';
import { useRef } from 'preact/hooks';

const GridBlock: FunctionalComponent = () => {
    const containerRef = useRef<HTMLElement>()

    return (
        <Grid.Container ref={containerRef}>
            <Grid.Header {...{ categories }} />
            {categories.map(category => (
                <Grid.Category key={category.id} {...{ category, containerRef }}>
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
