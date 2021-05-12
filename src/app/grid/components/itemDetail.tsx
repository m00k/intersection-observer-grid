import { FunctionComponent, h } from 'preact';
import * as VM from '../../../api/model';
import style from '../styles/index.css';

export interface ItemDetailProps {
    item: VM.Item;
}

const ItemDetail: FunctionComponent<ItemDetailProps> = ({
    item
}) => {
    const { name } = item;
    return (
        <li class={style.itemDetail}>
            {name}
        </li>
    );
}

export default ItemDetail;