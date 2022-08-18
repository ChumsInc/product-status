import React from 'react';
import ItemListSearchInput from "./ItemListSearchInput";
import ItemListFilterOnHand from "./ItemListFilterOnHand";
import ItemListFilterSelected from "./ItemListFilterSelected";
import ItemListFilterInactive from "./ItemListFilterInactive";

export interface ItemListFilterBarProps {
    children?: React.ReactNode
}
const ItemListFilterBar = ({children}:ItemListFilterBarProps) => {

    return (
        <div className="row g-3 align-items-baseline mb-3">
            <div className="col-auto">
                <ItemListSearchInput/>
            </div>
            <div className="col-auto">
                <ItemListFilterOnHand/>
            </div>
            <div className="col-auto">
                <ItemListFilterInactive/>
            </div>
            <div className="col-auto">
                <ItemListFilterSelected/>
            </div>
            {children}
        </div>
    )
}

export default ItemListFilterBar;
