import { FunctionComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import * as VM from '../../api/model';
import { IntersectionTarget } from '../../routes/home/grid';
import style from './style.css';


interface NavItemProps {
    category: VM.Category;
    index: number;
    activeIndex: number;
    intersectionTarget: IntersectionTarget;
}

const NavItem: FunctionComponent<NavItemProps> = ({
    category,
    index,
    activeIndex,
    intersectionTarget,
}) => {
    const { name } = category;
    const ref = useRef<HTMLAnchorElement>()
    useEffect(() => {
        const isTargetSelf = intersectionTarget === 'nav'
        const active = activeIndex === index
        if (isTargetSelf || !active) return

        const el = ref.current
        if (active && el?.parentElement) {
            // TODO: only scroll into view when intersectionTarget !== self
            // TODO: no support for behavior 'smooth' on safari
            // -> investigate: calc scroll length, direction
            // -> use requestAnimationFrame and scrollBy to scroll incrementally on each frame
            el.parentElement.scrollTo({ left: el.offsetLeft, behavior: 'smooth' })
        }
    }, [activeIndex, index, intersectionTarget])
    return (
        <a
            ref={ref}
            href={`#${name}`} // TODO
            style={{ color: activeIndex === index ? 'var(--cl-accent)' : 'inherit' }}
        >
            {name}
        </a>
    )
}

export interface NavProps {
    categories: Array<VM.Category>;
    activeIndex: number;
    intersectionTarget: IntersectionTarget;
}

const Nav: FunctionComponent<NavProps> = ({
    categories,
    activeIndex,
    intersectionTarget,
}) => {
    return (
        <nav
            class={style.nav}
        >
            {categories?.map((category, index) => {
                return (
                    <NavItem key={category.id} {...{ category, index, activeIndex, intersectionTarget }} />
                );
            })}
        </nav>
    )
}

export default Nav