import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterSetCategoryAction, selectCollectionList, selectFilter} from "./index";
import FilterInput from "./FilterInput";
import CollectionDataList from "./CollectionDataList";


const CollectionFilter: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
                                                                               id = 'filter-collection',
                                                                               value,
                                                                               children,
                                                                               ...props
                                                                           }) => {
    const dispatch = useDispatch();
    const {collection} = useSelector(selectFilter);
    const list = useSelector(selectCollectionList);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterSetCategoryAction(ev.target.value));
    }
    const listId = `${id}--datalist`;
    return (
        <FilterInput value={collection} onChange={changeHandler} list={listId} {...props}>
            <CollectionDataList id={listId} />
        </FilterInput>
    );
}

export default React.memo(CollectionFilter);
