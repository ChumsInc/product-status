import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemSearchFilter} from "./selectors";
import {Input, InputGroup} from "chums-components";
import {searchItems} from "./actions";

const ItemListSearchInput= () => {
    const dispatch = useDispatch();
    const search = useSelector(selectItemSearchFilter);
    const [timeoutHandle, setTimeoutHandle] = useState(0);
    const [value, setValue] = useState(search);

    useEffect(() => {
        return () => {
            window.clearTimeout(timeoutHandle);
        }
    }, []);

    useEffect(() => {
        setValue(search);
    }, [search])

    useEffect(() => {
        window.clearTimeout(timeoutHandle);
        const t = window.setTimeout(() => {
            dispatch(searchItems(value));
        }, 600);
        setTimeoutHandle(() => t);
    }, [value]);

    return (
        <InputGroup bsSize="sm">
            <span className="bi-search input-group-text"/>
            <Input type="search" value={value} onChange={(ev) => setValue(ev.target.value)}/>
        </InputGroup>

    )
}

export default ItemListSearchInput;
