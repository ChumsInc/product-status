import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterSetCollectionAction, selectCollectionList, selectFilter} from "./index";
import FilterInput from "./FilterInput";
import CollectionDataList from "./CollectionDataList";


const CollectionFilter: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
                                                                               id = 'filter-collection',
                                                                               value, //discard item prop
                                                                               children,
                                                                               ...props
                                                                           }) => {
    const dispatch = useDispatch();
    const {collection} = useSelector(selectFilter);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterSetCollectionAction(ev.target.value));
    }
    const listId = `${id}--datalist`;
    return (
        <FilterInput value={collection} onChange={changeHandler} list={listId} {...props}>
            <CollectionDataList id={listId}/>
        </FilterInput>
    );
}

export default React.memo(CollectionFilter);
