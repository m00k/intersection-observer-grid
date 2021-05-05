import { ComponentChildren, FunctionComponent, h, RefObject } from 'preact';
import { forwardRef } from 'preact/compat';
import style from './style.css';

export interface ContainerProps {
    children: ComponentChildren[];
}

const Container: FunctionComponent<ContainerProps> = forwardRef((
    props,
    ref: RefObject<HTMLElement>,
) => {
    const { children, ...restProps } = props
    return (
        <article ref={ref} class={style.container} {...{ restProps }}>
            {children}
        </article>
    );
})

export default Container