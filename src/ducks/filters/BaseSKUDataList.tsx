import React from 'react';
import {useSelector} from 'react-redux';
import {selectBaseSKUList} from "./index";

const BaseSKUDataList: React.FC<{ id: string }> = ({id}) => {
    const list = useSelector(selectBaseSKUList);

    return (
        <datalist id={id}>
            {list
                .map((sku) => (
                    <option key={sku.id || sku.Category4} value={sku.Category4}>
                        {sku.Category4} - {sku.description}
                    </option>
                ))}
        </datalist>
    );
}

export default React.memo(BaseSKUDataList);
