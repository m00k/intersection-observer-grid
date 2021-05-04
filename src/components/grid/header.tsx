import { FunctionComponent, h } from 'preact';
import * as VM from '../../api/model';
import style from './style.css';

export interface HeaderProps {
    categories: Array<VM.Category>;
}

const Header: FunctionComponent<HeaderProps> = ({
    categories
}) => {
    return (
        <nav class={style.header}>
            {categories?.map(({name, id}) => (
                <a key={id} href="#">{name}</a>
            ))}
        </nav>
    );
}

export default Header