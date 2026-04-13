import {type ChangeEvent, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {itemKey} from "../utils.ts";
import {selectCheckedCount, selectFilteredItems, toggleMultipleItems} from "@/ducks/items/itemListSlice.ts";
import {useAppSelector} from "@/app/configureStore.ts";

function isIndeterminate(qtyChecked: number, qtyRecords: number) {
    return qtyRecords > 0 && qtyChecked > 0 && qtyChecked !== qtyRecords;
}

export default function SelectAllCheckbox() {
    const dispatch = useDispatch();
    const list = useSelector(selectFilteredItems);
    const qtyChecked = useAppSelector(selectCheckedCount);
    const checked = qtyChecked > 0 && qtyChecked === list.length;
    const indeterminate = isIndeterminate(qtyChecked, list.length)
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const itemKeys = list.map(item => itemKey(item));
        dispatch(toggleMultipleItems({keys: itemKeys, checked: ev.target.checked}));
    }

    return (
        <div>
            <div className="form-check form-check-inline">
                <input type="checkbox" className="form-check-input" checked={checked && !indeterminate}
                       onChange={changeHandler} ref={ref}/>
                <label className="form-check-label">({qtyChecked})</label>
            </div>
        </div>
    )
}
