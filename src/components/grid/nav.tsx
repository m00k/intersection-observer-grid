import { FunctionComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import * as VM from '../../api/model';
import style from './style.css';


interface NavItemProps {
    category: VM.Category;
    index: number;
    activeIndex: number;
    onNavigation: (index: number) => void;
}

const NavItem: FunctionComponent<NavItemProps> = ({
    category,
    index,
    activeIndex,
    onNavigation,
}) => {
    const { name } = category;
    const ref = useRef<HTMLAnchorElement>()
    // TODO: move to container component
    useEffect(() => {
        const active = activeIndex === index
        if (!active) return

        const el = ref.current
        if (el?.parentElement) {
            // TODO: only scroll into view when intersectionTarget !== self
            // TODO: no support for behavior 'smooth' on safari
            // -> investigate: calc scroll length, direction
            // -> use requestAnimationFrame and scrollBy to scroll incrementally on each frame
            el.parentElement.scrollTo({ left: el.offsetLeft, behavior: 'smooth' })
        }
    }, [activeIndex, index])
    return (
        <a
            ref={ref}
            href={`#${name}`} // TODO
            style={{ color: activeIndex === index ? 'var(--cl-accent)' : 'inherit' }}
            onClick={(): void => onNavigation(index)}
        >
            {name}
        </a>
    )
}

export interface NavProps {
    categories: Array<VM.Category>;
    activeIndex: number;
    onNavigation: (index: number) => void;
}

const Nav: FunctionComponent<NavProps> = ({
    categories,
    activeIndex,
    onNavigation,
}) => {
    return (
        <nav
            class={style.nav}
        >
            {categories?.map((category, index) => {
                return (
                    <NavItem
                        key={category.id}
                        {...{ category, index, activeIndex, onNavigation }}
                    />
                );
            })}
        </nav>
    )
}

export default Nav