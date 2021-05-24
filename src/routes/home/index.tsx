import { FunctionalComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';
import withData from '../../app/grid/components/withData';
import GridBlock from '../../app/grid/grid';
import { locationHashToIndex } from '../../app/grid/services';
import style from './style.css';

const GridBlockWithData = withData(GridBlock);
const Home: FunctionalComponent = () => {
    const initialIndex = useMemo(() => locationHashToIndex(), [])
    return (
        <div class={style.home}>
            <GridBlockWithData {...{initialIndex}} />
        </div>
    );
};

export default Home;
