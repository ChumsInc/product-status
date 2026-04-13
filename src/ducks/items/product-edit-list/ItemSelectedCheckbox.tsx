import {type ChangeEvent, useId} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FormCheck} from "react-bootstrap";
import {selectIsAdmin} from "../../app";
import type {ItemKeyProps} from "../../../types.ts";
import {toggleItem} from "@/ducks/items/itemListSlice.ts";
import {itemKey} from "@/ducks/items/utils.ts";

export interface ItemSelectedCheckboxProps {
    item: ItemKeyProps,
    selected: boolean,
}

const ItemSelectedCheckbox = ({item, selected}: ItemSelectedCheckboxProps) => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(selectIsAdmin);
    const id = useId();
    if (!isAdmin) {
        return null;
    }
    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const key = itemKey(item);
        dispatch(toggleItem({key, checked: ev.target.checked}));
    }

    return (<FormCheck id={id} label="" checked={selected || false} onChange={changeHandler} type="checkbox"/>)
}
export default ItemSelectedCheckbox;
