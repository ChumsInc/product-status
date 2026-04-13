import {type ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FormSelect, type FormSelectProps} from "react-bootstrap";
import {filters} from "@/components/form/filters.ts";
import {selectProductTypeFilter, setProductTypeFilter} from "@/ducks/filters/product-type/productTypeSlice.ts";

const ProductTypeSelect = ({id, ...props}: FormSelectProps) => {
    const dispatch = useDispatch();
    const productType = useSelector(selectProductTypeFilter);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setProductTypeFilter(ev.target.value));
    }

    return (
        <FormSelect id={id} {...props} value={productType} onChange={changeHandler} size="sm"
                    name={filters.productType.key}>
            <option value="FKR">FG/RM/Kit</option>
            <option value="F">Finished Goods</option>
            <option value="K">Kits</option>
            <option value="R">Raw Materials</option>
            <option value="D">Discontinued</option>
        </FormSelect>
    )
}

export default ProductTypeSelect;
