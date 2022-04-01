import React from 'react';
import {useSelector} from "react-redux";
import {selectProductStatusList} from "./index";

const ProductStatusDataList:React.FC<{id:string}> = ({id}) => {
    const list = useSelector(selectProductStatusList);

    return (
        <datalist id={id}>
            {list.map(status => (<option key={status.id} value={status.code}>{status.description}</option>))}
        </datalist>
    )
}
export default ProductStatusDataList;
