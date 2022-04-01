import React from 'react';
import {useSelector} from 'react-redux';
import {selectCategoryList} from "./index";


const CategoryDataList: React.FC<{ id: string }> = ({id}) => {
    const categoryList = useSelector(selectCategoryList);
    return (
        <datalist id={id}>
            {categoryList
                .map((cat) => (
                    <option key={cat.id || cat.Category2} value={cat.code || cat.Category2}>
                        {cat.code || cat.Category2} - {cat.description}
                    </option>
                ))}
        </datalist>
    );
}

export default React.memo(CategoryDataList);
