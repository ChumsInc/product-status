/**
 * Created by steve on 2/9/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemDropDown from './ItemDropDown';
import {fetchCompanyOptions, setCompany, updateSelection} from "../actions/app";
import {fetchItems, getQuery} from "../actions/items";
import { connect } from 'react-redux';
import {COMPANIES, defaultSelection} from '../constants';
import Select from './Select';
import WarehouseSelect from "./WarehouseSelect";
import ProductLineSelect from "./ProductLineSelect";
import CategorySelect from "./CategorySelect";
import CollectionSelect from "./CollectionSelect";
import BaseSKUSelect from "./BaseSKUSelect";
import StatusSelect from "./StatusSelect";
import FormGroup from "./FormGroup";

class SelectItemForm extends Component {
    static propTypes = {
        selection: PropTypes.shape({
            Company: PropTypes.string,
            WarehouseCode: PropTypes.string,
            ItemCode: PropTypes.string,
            ProductLine: PropTypes.string,
            Category2: PropTypes.string,
            Category3: PropTypes.string,
            Category4: PropTypes.string,
            ItemStatus: PropTypes.string,
        }),

        fetchCompanyOptions: PropTypes.func.isRequired,
        fetchItems: PropTypes.func.isRequired,
        setCompany: PropTypes.func.isRequired,
    };

    static defaultProps = {
        selection: {...defaultSelection},
    };

    constructor(props) {
        super(props);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelectItem = this.onSelectItem.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onDownload = this.onDownload.bind(this);
    }


    onChange({field, value}) {
        this.props.updateSelection({[field]: value});
    }

    onChangeCompany({value}) {
        this.props.setCompany(value);
    }

    onSelectItem(item) {
        this.onChange({field: 'ItemCode', value: item.ItemCode});
        // store.itemParams.ItemCode = item.ItemCode;
    }

    onLoad(ev) {
        ev.preventDefault();
        this.props.fetchItems();
    }

    onDownload(ev) {
        ev.preventDefault();
        const {Company, ItemCode, ...queryProps} = this.props.selection;
        window.location = `/api/operations/production/item/status-xlsx/:company/:itemcode?:query`
            .replace(':company', encodeURIComponent(Company))
            .replace(':itemcode', encodeURIComponent(ItemCode))
            .replace(':query', getQuery(queryProps));
    }

    render() {
        const { Company, WarehouseCode, ItemCode, ProductLine, Category2, Category3, Category4, ItemStatus } = this.props.selection;
        const searchOptions = getQuery(this.props);
        return (
            <form className="row g-3 block-labels hidden-print row--filter" onSubmit={this.onLoad}>
                <FormGroup label="Company">
                    <Select value={Company} field="Company" onChange={this.onChange}>
                        {COMPANIES.map(co => (
                            <option key={co.code} value={co.code}>{co.name}</option>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup label="Item">
                    <ItemDropDown company={Company} options={searchOptions}
                                  value={ItemCode} field="ItemCode"
                                  minLength={0}
                                  onChange={this.onChange}
                                  onSelect={this.onSelectItem} />
                </FormGroup>
                <FormGroup label="Warehouse" htmlFor="sif-warehouse">
                    <WarehouseSelect field="WarehouseCode" value={WarehouseCode} onChange={this.onChange} id="sif-warehouse"/>
                </FormGroup>
                <FormGroup label="Prod Line" htmlFor="sif-pl">
                    <ProductLineSelect value={ProductLine} field="ProductLine" onChange={this.onChange} id="sif-pl"/>
                </FormGroup>
                <FormGroup label="Category" htmlFor="sif-category">
                    <CategorySelect value={Category2} field="Category2" onChange={this.onChange} id="sif-category"/>
                </FormGroup>
                <FormGroup label="Sub Category" htmlFor="sif-subcategory">
                    <CollectionSelect value={Category3} field="Category3" onChange={this.onChange} id="sif-subcategory"/>
                </FormGroup>
                <FormGroup label="Base SKU" htmlFor="sif-base-sku">
                    <BaseSKUSelect value={Category4} field="Category4" onChange={this.onChange} id="sif-base-sku"/>
                </FormGroup>
                <FormGroup label="Item Status" htmlFor="sif-status">
                    <StatusSelect value={ItemStatus} field="ItemStatus" id="sif-status"
                                  allowSelectAll allowWildCardStatus
                                  onChange={this.onChange}/>
                </FormGroup>
                <FormGroup label={<span>&nbsp;</span>}>
                    <button type="submit" className="btn btn-sm btn-primary" onClick={this.onLoad}>
                        Load
                    </button>
                </FormGroup>
                <FormGroup label={<span>&nbsp;</span>}>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.onDownload}>Download .xlsx</button>
                </FormGroup>
            </form>
        )
    }
}

const mapStateToProps = state => {
    const {selection, warehouses, productLines, categories, collections, baseSKUs, statusList} = state.app;
    return {
        selection,
        warehouses,
        productLines,
        categories,
        collections,
        baseSKUs,
        statusList
    };
};

const mapDispatchToProps = {
    fetchCompanyOptions,
    fetchItems,
    setCompany,
    updateSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectItemForm);
