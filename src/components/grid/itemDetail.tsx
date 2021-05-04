import { FunctionComponent, h } from 'preact';
import * as VM from '../../api/model';
import style from './style.css';

export interface ItemDetailProps {
    item: VM.Item;
}

const ItemDetail: FunctionComponent<ItemDetailProps> = ({
    item
}) => {
    const { name, category } = item;
    return (
        <li class={style.itemDetail}>
            <h3>{category.name}</h3>
            <p>{name}</p>
        </li>
    );
}

export default ItemDetail;