import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilterOnlySelected} from "./selectors";
import {FormCheck} from "chums-components";
import {itemsSetFilterSelectedAction} from "./actions";


const ItemListFilterSelected: React.FC = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectFilterOnlySelected);

    return (
        <FormCheck type="checkbox" label="Show Only Seleced" checked={checked}
                   onChange={(ev:ChangeEvent<HTMLInputElement>) => dispatch(itemsSetFilterSelectedAction(ev.target.checked))}/>
    )
}

export default React.memo(ItemListFilterSelected);
