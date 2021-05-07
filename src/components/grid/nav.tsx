import { FunctionComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import * as VM from '../../api/model';
import style from './style.css';


interface NavItemProps {
    category: VM.Category;
    index: number;
    activeIndex: number;
}

const NavItem: FunctionComponent<NavItemProps> = ({
    category,
    index,
    activeIndex,
}) => {
    const { name } = category;
    const ref = useRef<HTMLAnchorElement>()
    useEffect(() => {
        const el = ref.current
        const active = activeIndex === index
        if (active && el?.parentElement) {
            // TODO: only scroll into view when intersectionTarget !== self
            el.parentElement.scrollTo({ left: el.offsetLeft, behavior: 'smooth' })
        }
    }, [activeIndex, index])
    return (
        <a
            ref={ref}
            href={`#${name}`} // TODO
            style={{ color: activeIndex === index ? 'hotpink' : 'inherit' }}
        >
            {name}
        </a>
    )
}

export interface NavProps {
    categories: Array<VM.Category>;
    activeIndex: number;
}

const Nav: FunctionComponent<NavProps> = ({
    categories,
    activeIndex,
}) => {
    return (
        <nav
            class={style.nav}
        >
            {categories?.map((category, index) => {
                return (
                    <NavItem key={category.id} {...{ category, index, activeIndex }} />
                );
            })}
        </nav>
    )
}

export default Nav