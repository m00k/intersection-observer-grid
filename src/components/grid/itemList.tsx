
import { FunctionComponent, h } from 'preact';
import style from './style.css';

export interface ItemListProps {
}

const ItemList: FunctionComponent<ItemListProps> = ({
    children
}) => {
    return (
        <ul className={style.itemList}>
            {children}
        </ul>
    );
}

export default ItemList;