import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FormControl, InputGroup} from "react-bootstrap";
import {selectItemListSearch, setSearch} from "@/ducks/items/itemListSlice.ts";

const ItemListSearchInput = () => {
    const dispatch = useDispatch();
    const search = useSelector(selectItemListSearch);
    const timerRef = useRef<number>(0)
    const [value, setValue] = useState(search);

    useEffect(() => {
        return () => {
            window.clearTimeout(timerRef.current);
        }
    }, []);

    useEffect(() => {
        setValue(search);
    }, [search])

    useEffect(() => {
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            dispatch(setSearch(value));
        }, 600);
        return () => window.clearTimeout(timerRef.current);
    }, [value, dispatch]);

    return (
        <InputGroup size="sm">
            <span className="bi-search input-group-text"/>
            <FormControl type="search" value={value} onChange={(ev) => setValue(ev.target.value)}/>
        </InputGroup>

    )
}

export default ItemListSearchInput;
