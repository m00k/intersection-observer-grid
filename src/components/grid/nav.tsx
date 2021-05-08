import { FunctionComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
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
}) => {
    const navRef = useRef<HTMLElement>();
    const activeItemRef = useRef<HTMLAnchorElement>();
    // TODO: move to container?
    useEffect(() => {
        const el = activeItemRef.current
        // TODO: no support for behavior 'smooth' on safari
        // -> investigate: calc scroll length, direction
        // -> use requestAnimationFrame and scrollBy to scroll incrementally on each frame
        navRef.current.scrollTo({ left: el.offsetLeft, behavior: 'smooth' })
    }, [activeIndex])
    return (
        <nav
            ref={navRef}
            class={style.nav}
        >
            {categories?.map(({ name, id }, index) => {
                return (
                    <a
                        ref={index === activeIndex ? activeItemRef : null}
                        key={id}
                        href={`#${name}`} // TODO
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

export default Nav