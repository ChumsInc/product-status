import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FormCheck} from "chums-ducks";
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
    const changeHandler = () => {
        dispatch(selectItemAction(itemKey, !selected));
    }

    return (<FormCheck label="" checked={selected} onClick={changeHandler} type="checkbox" />)
}
export default ItemSelectedCheckbox;
