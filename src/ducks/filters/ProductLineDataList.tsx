import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {filterSetProductLineAction, selectFilter, selectProductLineList} from "./index";


const ProductLineDataList: React.FC<{ id:string }> = ({id}) => {
    const productLineList = useSelector(selectProductLineList);

    return (
        <datalist id={id}>
            {productLineList
                .filter(pl => pl.active)
                .map(pl => (
                    <option key={pl.ProductLine} value={pl.ProductLine}>
                        {pl.ProductLine} - {pl.ProductLineDesc}
                    </option>
                ))}
        </datalist>
    );
}

export default React.memo(ProductLineDataList);
