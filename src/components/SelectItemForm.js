/**
 * Created by steve on 2/9/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemDropDown from './ItemDropDown';
import {fetchCompanyOptions, fetchItems, getQuery, updateSelection, setCompany} from "../actions";
import { connect } from 'react-redux';
import {COMPANIES, defaultSelection} from '../constants';
import Select from './Select';
import WarehouseSelect from "./WarehouseSelect";
import ProductLineSelect from "./ProductLineSelect";
import CategorySelect from "./CategorySelect";
import CollectionSelect from "./CollectionSelect";
import BaseSKUSelect from "./BaseSKUSelect";
import StatusSelect from "./StatusSelect";

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
        updateSelection: PropTypes.func.isRequired,
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
    onChangeField(field, value) {
        this.props.dispatch(updateSelection(field, value));
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
        const url = `/node-dev/production/item/status-xlsx/:company/:itemcode?:query`
            .replace(':company', encodeURIComponent(Company))
            .replace(':itemcode', encodeURIComponent(ItemCode))
            .replace(':query', getQuery(queryProps));
        window.location = url;
    }

    render() {
        const { Company, WarehouseCode, ItemCode, ProductLine, Category2, Category3, Category4, ItemStatus } = this.props.selection;
        const searchOptions = getQuery(this.props);
        return (
            <div>
                <form className="form-inline block-labels hidden-print" onSubmit={this.onLoad}>
                    <div className="form-group">
                        <label>Company</label>
                        <Select value={Company} field="Company" onChange={this.onChange}>
                            {COMPANIES.map(co => (
                                <option key={co.code} value={co.code}>{co.name}</option>
                            ))}
                        </Select>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Item</label>
                        <ItemDropDown company={Company} options={searchOptions}
                                      value={ItemCode} field="ItemCode"
                                      minLength={0}
                                      onChange={this.onChange}
                                      onSelect={this.onSelectItem} />
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Warehouse</label>
                        <WarehouseSelect field="WarehouseCode" value={WarehouseCode} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Prod Line</label>
                        <ProductLineSelect value={ProductLine} field="ProductLine" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Category</label>
                        <CategorySelect value={Category2} field="Category2" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Sub Category</label>
                        <CollectionSelect value={Category3} field="Category3" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Base SKU</label>
                        <BaseSKUSelect value={Category4} field="Category4" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Item Status</label>
                        <StatusSelect value={ItemStatus} field="ItemStatus"
                                      allowSelectAll allowWildCardStatus
                                      onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">&nbsp;</label>
                        <button type="submit" className="btn btn-sm btn-primary" onClick={this.onLoad}>
                            Load
                        </button>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">&nbsp;</label>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.onDownload}>Download .xlsx</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {selection, warehouses, productLines, categories, collections, baseSKUs, statusList} = state;
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
    updateSelection,
    fetchCompanyOptions,
    fetchItems,
    setCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectItemForm);
