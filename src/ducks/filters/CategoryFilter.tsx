import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterSetCategoryAction, selectFilter} from "./index";
import FilterInput, {FilterInputContainerProps} from "./FilterInput";
import CategoryDataList from "./CategoryDataList";


const CategoryFilter: React.FC<FilterInputContainerProps> = ({
                                                                 id = 'filter--category',
                                                                 children,
                                                                 ...props
                                                             }) => {
    const dispatch = useDispatch();
    const {category} = useSelector(selectFilter);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterSetCategoryAction(ev.target.value));
    }

    const listId = id + '--list';

    return (
        <FilterInput value={category} onChange={changeHandler} list={listId} id={id} {...props} >
            <CategoryDataList id={listId}/>
            {children}
        </FilterInput>
    );
}

export default React.memo(CategoryFilter);
