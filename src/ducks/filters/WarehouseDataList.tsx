import React, {ChangeEvent, SelectHTMLAttributes} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filtersSetWarehouseAction, selectFilter, selectWarehouseList} from "./index";
import {Select} from "chums-ducks";


const WarehouseDataList: React.FC<{ id:string }> = ({id}) => {
    const warehouseList = useSelector(selectWarehouseList);

    return (
        <datalist id={id}>
            {warehouseList
                .filter(whse => whse.WarehouseStatus === 'A')
                .map(warehouse => (
                    <option key={warehouse.WarehouseCode} value={warehouse.WarehouseCode}>
                        {warehouse.WarehouseCode} - {warehouse.WarehouseDesc}
                    </option>
                ))}
        </datalist>
    );
}

export default React.memo(WarehouseDataList);
