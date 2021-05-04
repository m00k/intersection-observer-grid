import { FunctionalComponent, h } from 'preact';
import Grid from '../../components/grid';

const GridBlock: FunctionalComponent = () => {
    return (
        <Grid.Container>
            <Grid.Header />
            <Grid.ItemList />
        </Grid.Container>
    );
};

export default GridBlock;
