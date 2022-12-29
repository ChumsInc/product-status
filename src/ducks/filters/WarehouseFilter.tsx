import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {filterWarehouse, selectActiveWarehouseList, selectWarehouse} from "./index";
import AutoComplete from "./AutoComplete";
import {useAppDispatch} from "../../app/configureStore";
import {Warehouse} from "chums-types";

const WarehouseAutoComplete = AutoComplete<Warehouse>;

const warehouseFilter = (value: string) => (element: Warehouse) => {
    let regex = /^/;
    try {
        regex = new RegExp(value, 'i')
    } catch (err: unknown) {
    }

    return !value
        || element.WarehouseCode.toLowerCase().startsWith(value.toLowerCase())
        || regex.test(element.WarehouseDesc);
}

const WarehouseItem = ({WarehouseCode, WarehouseDesc}: Warehouse) => (
    <>
        <div className="me-3">{WarehouseCode}</div>
        <div>{WarehouseDesc}</div>
    </>
)

const WarehouseFilter = ({id = 'filter-warehouse', ...props}: InputHTMLAttributes<HTMLInputElement>) => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectWarehouse);
    const warehouseList = useSelector(selectActiveWarehouseList);
    const [helpText, setHelpText] = useState<string | null>(null);

    useEffect(() => {
        const [whs] = warehouseList.filter(whs => whs.WarehouseCode === value)
        setHelpText(whs?.WarehouseDesc ?? null);
    }, [value])

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterWarehouse(ev.target.value));
    }

    return (
        <WarehouseAutoComplete {...props}
                               id={id}
                               value={value} data={warehouseList} onChange={changeHandler}
                               onChangeRecord={value => dispatch(filterWarehouse(value?.WarehouseCode ?? ''))}
                               renderItem={WarehouseItem}
                               itemKey={value => value.WarehouseCode}
                               filter={warehouseFilter} itemStyle={{display: 'flex'}}
                               helpText={helpText}/>
    )
}

export default React.memo(WarehouseFilter);
