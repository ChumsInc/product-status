import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FormCheck} from "chums-components";
import {selectItemAction} from "./actions";
import {selectIsAdmin} from "../app";

export interface ItemSelectedCheckboxProps {
    itemKey: string,
    selected: boolean,
}
const ItemSelectedCheckbox:React.FC<ItemSelectedCheckboxProps> = ({itemKey, selected}) => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(selectIsAdmin);
    if (!isAdmin) {
        return null;
    }
    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(selectItemAction(itemKey, ev.target.checked));
    }

    return (<FormCheck label="" checked={selected || false} onChange={changeHandler} type="checkbox" />)
}
export default ItemSelectedCheckbox;
