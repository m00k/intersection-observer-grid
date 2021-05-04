import { FunctionalComponent, h } from 'preact';
import GridBlock from './grid';
import style from './style.css';

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <p>This is the Home component.</p>
            <GridBlock />
        </div>
    );
};

export default Home;
