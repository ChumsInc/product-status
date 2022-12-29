import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemsFilterOnHand, selectZeroCount} from "./selectors";
import {FormCheck} from "chums-components";
import {toggleFilterOnHand} from "./actions";


const ItemListFilterOnHand: React.FC = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectItemsFilterOnHand);
    const count = useSelector(selectZeroCount);

    return (
        <FormCheck type="checkbox" label={`Hide Zero On Hand (${count})`} title="Hide Zero On Hand and and Zero available" checked={checked}
                   onChange={(ev: ChangeEvent<HTMLInputElement>) => dispatch(toggleFilterOnHand(ev.target.checked))}/>
    )
}

export default ItemListFilterOnHand;
