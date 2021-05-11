import { FunctionComponent, h, RefObject } from 'preact';
import { forwardRef } from 'preact/compat';
import * as VM from '../../api/model';
import style from './style.css';


export const scrollChildIntoView = (parentEl: HTMLElement | null, childIndex: number ): void => {
    const el = parentEl?.children?.[childIndex] as HTMLElement | null
    const left = el?.offsetLeft
    parentEl?.scrollTo({ left, behavior: 'smooth' })
}

export const scrollChildIntoViewFn = (parentRef: RefObject<HTMLElement>) => (index: number): void => scrollChildIntoView(parentRef.current, index)

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
