import { FunctionalComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';
import GridBlock from '../../app/grid/grid';
import { locationHashToIndex } from '../../app/grid/services';
import style from './style.css';

const Home: FunctionalComponent = () => {
    const initialIndex = useMemo(() => locationHashToIndex(), [])
    return (
        <div class={style.home}>
            <GridBlock {...{initialIndex}} />
        </div>
    );
};

export default Home;
