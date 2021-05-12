import { FunctionComponent, h } from 'preact';
import { forwardRef } from 'preact/compat';
import * as VM from '../../api/model';
import style from './style.css';

export interface NavProps {
    categories: Array<VM.Category>;
    activeIndex: number;
    onNavigation: (index: number) => void;
}

const Nav: FunctionComponent<NavProps> = ({
    categories,
    activeIndex,
    onNavigation,
}, ref) => {
    return (
        <nav
            ref={ref}
            class={style.nav}
        >
            {categories?.map(({ name, id }, index) => {
                return (
                    <a
                        key={id}
                        href={`#${name}`}
                        style={{ color: activeIndex === index ? 'var(--cl-accent)' : 'inherit' }}
                        onClick={(): void => onNavigation(index)}
                    >
                        {name}
                    </a>
                );
            })}
        </nav>
    )
}

export default forwardRef(Nav)
