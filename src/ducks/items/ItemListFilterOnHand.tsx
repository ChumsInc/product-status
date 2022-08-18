import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemsFilterOnHand} from "./selectors";
import {FormCheck} from "chums-components";
import {itemsSetFilterOnHandAction} from "./actions";


const ItemListFilterOnHand:React.FC = () => {
    const dispatch = useDispatch();
    const checked = useSelector(selectItemsFilterOnHand);

    return(
        <FormCheck type="checkbox" label="Show Only On Hand" checked={checked}
                   onChange={(ev:ChangeEvent<HTMLInputElement>) => dispatch(itemsSetFilterOnHandAction(ev.target.checked))} />
    )
}

export default React.memo(ItemListFilterOnHand);
