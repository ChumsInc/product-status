/**
 * Created by steve on 2/9/2017.
 */

import React, {FormEvent, useEffect} from 'react';
import {useSelector} from 'react-redux';
import WarehouseFilter from "./WarehouseFilter";
import ProductLineFilter from "./ProductLineFilter";
import CategoryFilter from "./CategoryFilter";
import CollectionFilter from "./CollectionFilter";
import BaseSKUFilter from "./BaseSKUFilter";
import ProductStatusFilter from "./ProductStatusFilter";
import FormGroup from "../../components/FormGroup";
import ProductTypeFilter from "./ProductTypeFilter";
import ItemCodeFilter from "./ItemCodeFilter";
import {selectItemsLoading} from "../items/selectors";
import {loadItems} from "../items/actions";
import DownloadButton from "./DownloadButton";
import VendorFilter from "./VendorFilter";
import {useAppDispatch} from "../../app/configureStore";
import {defaultFilter, Filter, selectFilter, setFilter} from "./index";
import {useSearchParams} from "react-router-dom";

const searchFilter = (filter:Filter):URLSearchParams => {
    const params = new URLSearchParams();
    Object.keys(filter)
        .map(key => {
            if (filter[key]) {
                params.set(key, filter[key]);
            }
        })
    return params;
}

const filterFromSearchParams = (params:URLSearchParams):Filter => {
    const filter = {...defaultFilter};
    Object.keys(filter)
        .map(key => {
            filter[key] = params.get(key) ?? '';
        });
    return filter;
}

const SelectItemForm= () => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectItemsLoading);
    const filter = useSelector(selectFilter);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const filter = filterFromSearchParams(searchParams);
        dispatch(setFilter(filter));
        const filters = Object.keys(filter)
            .filter(key => key !== 'ProductType')
            .filter(key => !!filter[key as keyof Filter]);
        if (filters.length) {
            dispatch(loadItems(filter));
        }
    }, []);

    const submitHandler = (ev?: FormEvent) => {
        ev?.preventDefault();
        const searchParams = new URLSearchParams();

        setSearchParams(searchFilter(filter));
        dispatch(loadItems(filter));
    }

    return (
        <form className="row g-3 hidden-print row--filter align-items-baseline" onSubmit={submitHandler}>
            <FormGroup label="Item" className="col">
                <ItemCodeFilter id="sif-item-code" placeholder="All"/>
            </FormGroup>
            <FormGroup label="Product Type" htmlFor="sif-product-type" className="col">
                <ProductTypeFilter id="sif-product-type"/>
            </FormGroup>
            <FormGroup label="Warehouse" htmlFor="sif-warehouse" className="col">
                <WarehouseFilter id="sif-warehouse" placeholder="All"/>
            </FormGroup>
            <FormGroup label="Prod Line" htmlFor="sif-pl" className="col">
                <ProductLineFilter id="sif-pl" placeholder="All"/>
            </FormGroup>
            <FormGroup label="Vendor" htmlFor="sif-vendor">
                <VendorFilter id="sif-vendor" placeholder="All"/>
            </FormGroup>
            <FormGroup label="Category" htmlFor="sif-category">
                <CategoryFilter id="sif-category" placeholder="All"/>
            </FormGroup>
            <FormGroup label="Collection" htmlFor="sif-subcategory">
                <CollectionFilter id="sif-subcategory" placeholder="All"/>
            </FormGroup>
            <FormGroup label="Base SKU" htmlFor="sif-base-sku">
                <BaseSKUFilter id="sif-base-sku" placeholder="All"/>
            </FormGroup>
            <FormGroup label="Status" htmlFor="sif-status">
                <ProductStatusFilter id="sif-status" placeholder="All"/>
            </FormGroup>
            <FormGroup label={<span>&nbsp;</span>}>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => dispatch(setFilter(defaultFilter))}>Reset</button>
            </FormGroup>
            <FormGroup label={<span>&nbsp;</span>}>
                <button type="submit" className="btn btn-sm btn-primary" disabled={loading}>
                    Load
                </button>
            </FormGroup>
            <FormGroup label={<span>&nbsp;</span>}>
                <DownloadButton/>
            </FormGroup>
        </form>
    )
}

export default React.memo(SelectItemForm);
