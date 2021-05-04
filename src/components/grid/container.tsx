import { FunctionComponent, h } from 'preact';
import style from './style.css';

export interface ContainerProps {

}

const Container: FunctionComponent<ContainerProps> = ({
    children,
    ...props
}) => {
    return (
        <article class={style.container} {...{ props }}>
            {children}
        </article>
    );
}

export default Container