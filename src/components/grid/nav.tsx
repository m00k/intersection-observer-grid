import { FunctionComponent, h } from 'preact';
import * as VM from '../../api/model';
import style from './style.css';

export interface NavProps {
    categories: Array<VM.Category>;
    activeIndex: number;
}

const Nav: FunctionComponent<NavProps> = ({
    categories,
    activeIndex,
}) => {
    return (
        <nav class={style.nav}>
            {categories?.map(({name, id}, index) => (
                <a
                    key={id}
                    href="#" 
                    style={{color: activeIndex === index ? 'hotpink' : 'inherit'}}
                    onClick={e => console.log(index, e)}>{name}
                </a>
            ))}
        </nav>
    );
}

export default Nav