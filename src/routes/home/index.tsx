import { FunctionalComponent, h } from 'preact';
import GridBlock from './grid';
import style from './style.css';

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <GridBlock />
        </div>
    );
};

export default Home;
