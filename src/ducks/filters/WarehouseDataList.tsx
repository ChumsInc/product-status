import React from 'react';
import {useSelector} from 'react-redux';
import {selectWarehouseList} from "./index";


const WarehouseDataList: React.FC<{ id: string }> = ({id}) => {
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
