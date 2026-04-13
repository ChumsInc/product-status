import {type ChangeEvent, useId} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectInactiveCount, selectShowInactive, setShowInactive} from "../itemListSlice.ts";
import {FormCheck} from "react-bootstrap";


const ItemListFilterInactive = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectShowInactive);
    const count = useSelector(selectInactiveCount);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowInactive(ev.target.checked));
    }

    const label = `Show Inactive (${count})`;
    return (
        <FormCheck type="checkbox" label={label} title="InactiveItem = 'Y' OR ProductType = 'D'" id={id}
                   checked={checked} onChange={changeHandler}/>
    )
}

export default ItemListFilterInactive;
