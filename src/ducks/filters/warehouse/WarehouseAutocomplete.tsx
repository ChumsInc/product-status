import {type ChangeEvent} from 'react';
import {useSelector} from 'react-redux';
import AutoComplete from "@/components/auto-complete/AutoComplete.tsx";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import type {Warehouse} from "chums-types";
import {warehouseFilter} from "@/ducks/filters/warehouse/utils.ts";
import {
    selectWarehouseFilter,
    selectWarehouseList,
    selectWarehouseValue,
    setWarehouseFilter
} from "@/ducks/filters/warehouse/warehouseSlice.ts";
import type {FormControlProps} from "react-bootstrap";
import WarehouseItem from "@/ducks/filters/warehouse/WarehouseItem.tsx";
import {filters} from "@/components/form/filters.ts";


export default function WarehouseAutocomplete({id = 'filter-warehouse', ...props}: FormControlProps) {
    const dispatch = useAppDispatch();
    const value = useSelector(selectWarehouseFilter);
    const warehouseList = useSelector(selectWarehouseList);
    const warehouse = useAppSelector(selectWarehouseValue);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setWarehouseFilter(ev.target.value));
    }

    const recordChangeHandler = (value?: Warehouse) => {
        dispatch(setWarehouseFilter(value?.WarehouseCode ?? ''));
    }

    return (
        <AutoComplete {...props} name={filters.warehouseCode.key}
                      id={id}
                      value={value} data={warehouseList} onChange={changeHandler}
                      onChangeRecord={recordChangeHandler}
                      renderItem={WarehouseItem}
                      itemKey={value => value.WarehouseCode}
                      filter={warehouseFilter} itemStyle={{display: 'flex'}}
                      helpText={warehouse?.WarehouseDesc}/>
    )
}
