import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState, FocusEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterSetItemCodeAction, selectFilter} from "./index";
import FilterInput from "./FilterInput";
import ItemDataList from "chums-ducks/dist/components/ItemDataList";


const ItemCodeFilter: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
                                                                             id = 'filter-collection',
                                                                             value, // discard passed value prop
                                                                             children,
    onBlur,
                                                                             ...props
                                                                         }) => {
    const dispatch = useDispatch();
    const {itemCode} = useSelector(selectFilter);
    const [search, setSearch] = useState(itemCode);
    const [timeoutHandle, setTimeoutHandle] = useState(0);

    useEffect(() => {
        return () => {
            window.clearTimeout(timeoutHandle);
        }
    }, []);

    useEffect(() => {
        setSearch(itemCode);
    }, [itemCode]);

    useEffect(() => {
        window.clearTimeout(timeoutHandle);
        const t = window.setTimeout(() => {
            dispatch(filterSetItemCodeAction(search));
        }, 600);
        setTimeoutHandle(() => t);
    }, [search]);

    const blurHandler = (ev:FocusEvent<HTMLInputElement>) => {
        dispatch(filterSetItemCodeAction(search));
        if (!!onBlur) {
            onBlur(ev);
        }
    }


    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setSearch(ev.target.value);
    }
    const listId = `${id}--datalist`;
    return (
        <FilterInput value={search} onChange={changeHandler} list={listId} className="input-autocomplete"
                     placeholder="search item" onBlur={blurHandler}  {...props}>
            <ItemDataList search={itemCode} id={listId} delay={50}/>
        </FilterInput>
    );
}

export default React.memo(ItemCodeFilter);
