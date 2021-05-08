import { FunctionComponent, h } from 'preact';
import { forwardRef } from 'preact/compat';
import { useImperativeHandle, useRef } from 'preact/hooks';
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
    const navRef = useRef<HTMLElement>()
    const activeItemRef = useRef<HTMLAnchorElement>();
    useImperativeHandle(ref, () => ({
        scrollActiveNavItem: (): void => {
            // TODO: safari does not support 'smooth'
            // -> calc scroll length and use requestAnimationFrame
            const left = activeItemRef.current.offsetLeft
            navRef.current.scrollTo({ left, behavior: 'smooth' })
        }
    }))
    return (
        <nav
            ref={navRef}
            class={style.nav}
        >
            {categories?.map(({ name, id }, index) => {
                return (
                    <a
                        ref={index === activeIndex ? activeItemRef : undefined}
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

export default forwardRef(Nav)