import {type ChangeEvent} from 'react';
import AutoComplete from "@/components/auto-complete/AutoComplete.tsx";
import type {ProductSearchItem} from "chums-types";
import SearchItem from "@/ducks/filters/item-code/SearchItem.tsx";
import {itemSearchFilter} from "@/ducks/filters/item-code/utils.ts";
import type {FormControlProps} from "react-bootstrap";
import {useItemAutocomplete} from "@/ducks/filters/item-code/useItemAutocomplete.ts";
import {filters} from "@/components/form/filters.ts";


export default function ItemCodeAutocomplete({
                                                 id,
                                                 children,
                                                 ...props
                                             }: FormControlProps) {
    const {itemCode, setItemCode, status, list, searchItem} = useItemAutocomplete();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setItemCode(ev.target.value);
    }

    const recordChangeHandler = (value?: ProductSearchItem) => {
        setItemCode(value?.ItemCode || '');
    }

    return (
        <AutoComplete {...props} name={filters.itemCode.key}
                      id={id} loading={status === 'loading'}
                      value={itemCode} onChange={changeHandler}
                      data={list} onChangeRecord={recordChangeHandler}
                      renderItem={SearchItem}
                      itemKey={item => item.ItemCode} itemStyle={{display: 'flex'}}
                      filter={itemSearchFilter} helpText={searchItem?.ItemCodeDesc}/>
    )
}

