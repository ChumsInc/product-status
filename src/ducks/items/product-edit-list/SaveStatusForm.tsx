import {type ChangeEvent, useState} from 'react';
import {useSelector} from "react-redux";
import ProductStatusSelect from "../../filters/product-status/ProductStatusSelect.tsx";
import {saveMultipleItemStatus} from "../actions.ts";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectItemListStatus, selectSelectedItems} from "@/ducks/items/itemListSlice.ts";


export default function SaveStatusForm() {
    const dispatch = useAppDispatch();
    const selectedItems = useSelector(selectSelectedItems);
    const [nextStatus, setNextStatus] = useState('');
    const status = useAppSelector(selectItemListStatus)

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => setNextStatus(ev.target.value);

    const submitHandler = async () => {
        if (nextStatus === '' && !window.confirm(`Are you sure you want to remove the status from: ${selectedItems.map(i => i.ItemCode).join(', ')}?`)) {
            return;
        }
        const items = selectedItems.map(item => ({...item, ItemStatus: nextStatus}))
        await dispatch(saveMultipleItemStatus(items));
        setNextStatus('');
    }

    return (
        <form action={submitHandler} className="row g-3">
            <div className="col-auto">
                <div className="input-group input-group-sm">
                    <span className="input-group-text">Next Status</span>
                    <ProductStatusSelect value={nextStatus} onChange={changeHandler}/>
                </div>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-sm btn-primary"
                        disabled={selectedItems.length === 0 || status !== 'idle'}>
                    Save Status ({selectedItems.length})
                </button>
            </div>
        </form>
    )
}
