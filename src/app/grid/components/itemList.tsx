
import { FunctionComponent, h } from 'preact';
import style from '../styles/index.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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