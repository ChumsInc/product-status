import {type ChangeEvent, useId} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCheckedCount, selectShowOnlySelected, setShowOnlySelected} from "../itemListSlice.ts";
import {FormCheck} from "react-bootstrap";
import {selectIsAdmin} from "../../app";


const ItemListFilterSelected = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectShowOnlySelected);
    const count = useSelector(selectCheckedCount);
    const isAdmin = useSelector(selectIsAdmin);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowOnlySelected(ev.target.checked));
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <FormCheck id={id} type="checkbox" label={`Show Only Selected (${count})`} checked={checked}
                   onChange={changeHandler}/>
    )
}

export default ItemListFilterSelected;
