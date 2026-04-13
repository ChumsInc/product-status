import {type ChangeEvent, useId} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectShowOnHand, selectZeroCount, setShowOnHand} from "../itemListSlice.ts";
import {FormCheck} from "react-bootstrap";


const ItemListFilterOnHand = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectShowOnHand);
    const count = useSelector(selectZeroCount);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowOnHand(ev.target.checked));
    }

    return (
        <FormCheck type="checkbox" label={`Hide Zero On Hand (${count})`}
                   title="Hide Zero On Hand and and Zero available" checked={checked}
                   id={id} onChange={changeHandler}/>
    )
}

export default ItemListFilterOnHand;
