import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {selectItemsLoading, selectItemsSaving, selectSelectedItems} from "./selectors";
import ProductStatusSelect from "../filters/ProductStatusSelect";
import {saveMultipleItemStatus} from "./actions";
import {useAppDispatch} from "../../app/configureStore";


const SaveStatusForm= () => {
    const dispatch = useAppDispatch();
    const selectedItems = useSelector(selectSelectedItems);
    const [nextStatus, setNextStatus] = useState('');
    const saving = useSelector(selectItemsSaving);
    const loading = useSelector(selectItemsLoading);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => setNextStatus(ev.target.value);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (nextStatus === '' && !window.confirm(`Are you sure you want to remove the status from: ${selectedItems.map(i => i.ItemCode).join(', ')}?`)) {
            return;
        }
        const items = selectedItems.map(item => ({...item, ItemStatus: nextStatus}))
        dispatch(saveMultipleItemStatus(items));
        setNextStatus('');
    }

    return (
        <form onSubmit={submitHandler} className="row g-3">
            <div className="col-auto">
                <div className="input-group input-group-sm">
                    <span className="input-group-text">Next Status</span>
                    <ProductStatusSelect value={nextStatus} onChange={changeHandler}/>
                </div>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-sm btn-primary"
                        disabled={selectedItems.length === 0 || saving || loading}>
                    Save Status ({selectedItems.length})
                </button>
            </div>
        </form>
    )
}

export default SaveStatusForm;
