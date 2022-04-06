import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilteredItems} from "./selectors";
import {selectPagedData} from "chums-ducks";
import {itemStatusTableKey} from "./actionTypes";
import {ItemRecord} from "../../types";
import {itemKey} from "./utils";
import {selectItemsAction} from "./actions";

function isIndeterminate(qtyChecked: number, qtyRecords: number) {
    return qtyRecords > 0 && qtyChecked > 0 && qtyChecked !== qtyRecords;
}

const SelectAllCheckbox: React.FC = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectFilteredItems);
    const pagedList:ItemRecord[] = useSelector(selectPagedData(itemStatusTableKey, list));
    const [qtyChecked, setQtyChecked] = useState(pagedList.filter(row => row.selected).length);
    const [checked, setChecked] = useState<boolean>(qtyChecked > 0 && qtyChecked === pagedList.length);
    const [indeterminate, setIndeterminate] = useState(isIndeterminate(qtyChecked, pagedList.length));
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setQtyChecked(pagedList.filter(row => row.selected).length);
    }, [pagedList.filter(row => row.selected).length]);

    useEffect(() => {
        setIndeterminate(isIndeterminate(qtyChecked, pagedList.length));
        setChecked(qtyChecked > 0 && qtyChecked === pagedList.length);
    }, [qtyChecked, pagedList.length]);

    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);


    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const itemKeys = pagedList.map(item => itemKey(item));
        dispatch(selectItemsAction(itemKeys, ev.target.checked));
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

export default SelectAllCheckbox;
