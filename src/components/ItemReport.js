/**
 * Created by steve on 2/9/2017.
 */
import React from 'react';
import ItemFilter from "./ItemFilter";
import FilterButtons from "./FilterButtons";


const ItemReport = () => {
    return (
        <div>
            <div className="row row--filter g-3 mb-3">
                <ItemFilter />
                <FilterButtons />
            </div>
        </div>
    )
}

export default ItemReport;
