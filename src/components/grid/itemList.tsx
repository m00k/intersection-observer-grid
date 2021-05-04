
import { FunctionComponent, h } from 'preact';
import * as VM from '../../api/model';
import style from './style.css';

export interface ItemListProps {
    items: Array<VM.Item>;
}

const ItemList: FunctionComponent<ItemListProps> = ({
    children
}) => {
    return (
        <article className={style.itemList}>
            {children}
        </article>
    );
}

export default ItemList