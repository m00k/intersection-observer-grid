import { FunctionalComponent, h } from 'preact';
import Grid from '../../components/grid';
import { categories, items } from '../../api';


const GridBlock: FunctionalComponent = () => {
    return (
        <Grid.Container>
            <Grid.Header {...{categories}} />
            <Grid.ItemList {...{items}}>
                {items.map(item => (<Grid.ItemDetail key={item.id} {...{item}} />))}
            </Grid.ItemList>
        </Grid.Container>
    );
};

export default GridBlock;
