/**
 * Created by steve on 2/9/2017.
 */

import React, {FormEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {fetchItemsAction} from "../items/actions";
import DownloadButton from "./DownloadButton";
import VendorFilter from "./VendorFilter";

const SelectItemForm:React.FC = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectItemsLoading);

    const onDownload = (ev:MouseEvent) => {
        ev.preventDefault();
        // const {Company, ItemCode, ...queryProps} = this.props.selection;
        // window.location = `/api/operations/production/item/status-xlsx/:company/:itemcode?:query`
        //     .replace(':company', encodeURIComponent(Company))
        //     .replace(':itemcode', encodeURIComponent(ItemCode))
        //     .replace(':query', getQuery(queryProps));
    }

    const submitHandler = (ev:FormEvent) => {
        ev.preventDefault();
        dispatch(fetchItemsAction());
    }

    return (
        <form className="row g-3 block-labels hidden-print row--filter" onSubmit={submitHandler}>
            <FormGroup label="Item">
                <ItemCodeFilter />
            </FormGroup>
            <FormGroup label="Product Type" htmlFor="sif-product-type">
                <ProductTypeFilter id="sif-product-type" />
            </FormGroup>
            <FormGroup label="Warehouse" htmlFor="sif-warehouse">
                <WarehouseFilter id="sif-warehouse"/>
            </FormGroup>
            <FormGroup label="Prod Line" htmlFor="sif-pl">
                <ProductLineFilter id="sif-pl"/>
            </FormGroup>
            <FormGroup label="Vendor" htmlFor="sif-vendor">
                <VendorFilter id="sif-vendor"/>
            </FormGroup>
            <FormGroup label="Category" htmlFor="sif-category">
                <CategoryFilter id="sif-category"/>
            </FormGroup>
            <FormGroup label="Sub Category" htmlFor="sif-subcategory">
                <CollectionFilter id="sif-subcategory"/>
            </FormGroup>
            <FormGroup label="Base SKU" htmlFor="sif-base-sku">
                <BaseSKUFilter id="sif-base-sku"/>
            </FormGroup>
            <FormGroup label="Item Status" htmlFor="sif-status">
                <ProductStatusFilter id="sif-status"/>
            </FormGroup>
            <FormGroup label={<span>&nbsp;</span>}>
                <button type="submit" className="btn btn-sm btn-primary">
                    Load
                </button>
            </FormGroup>
            <FormGroup label={<span>&nbsp;</span>}>
                <DownloadButton />
            </FormGroup>
        </form>
    )
}

export default React.memo(SelectItemForm);
