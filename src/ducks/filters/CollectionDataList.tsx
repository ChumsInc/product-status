import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterSetCategoryAction, selectCollectionList, selectFilter} from "./index";
import FilterInput from "./FilterInput";


const CollectionDataList: React.FC<{ id: string }> = ({id}) => {
    const list = useSelector(selectCollectionList);

    return (
        <datalist id={id}>
            {list
                .map((c) => (
                    <option key={c.Category3} value={c.Category3}>{c.Category3}</option>
                ))}
        </datalist>
    );
}

export default React.memo(CollectionDataList);
