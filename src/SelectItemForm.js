/**
 * Created by steve on 2/9/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemDropDown from './chums/ItemDropDown';
import DownloadReportForm from './DownloadReportForm';
import {getQuery} from "./actions";

export default class SelectItemForm extends Component {
    static propTypes = {
        onLoad: PropTypes.func.isRequired,
        Company: PropTypes.string.isRequired,
        ItemCode: PropTypes.string.isRequired,
        WarehouseCode: PropTypes.string.isRequired,
        ProductLine: PropTypes.string.isRequired,
        Category2: PropTypes.string.isRequired,
        Category3: PropTypes.string.isRequired,
        Category4: PropTypes.string.isRequired,
        ItemStatus: PropTypes.string.isRequired,
        onChangeCompany: PropTypes.func.isRequired,
        onChangeField: PropTypes.func.isRequired,
        warehouses: PropTypes.array.isRequired,
        productLines: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        subCategories: PropTypes.array.isRequired,
        baseSKUs: PropTypes.array.isRequired,
        statuses: PropTypes.array.isRequired
    };

    pageLength = 25;

    onChangeCompany(ev) {
        this.props.onChangeCompany(ev.target.value);
    }

    onSelectItem(item) {
        store.itemParams.ItemCode = item.ItemCode;
    }

    onChange(field, ev) {
        const val = ev.target !== undefined ? ev.target.value : ev;
        this.props.onChangeField(field, val);
    }


    onLoad(ev) {
        ev.preventDefault();
        this.props.onLoad();
    }

    renderWarehouseOptions() {
        return this.props.warehouses
            .sort((a, b) => {
                return a.WarehouseCode === b.WarehouseCode ? 0 : (a.WarehouseCode > b.WarehouseCode ? 1 : -1);
            })
            .map(w => {
                return (
                    <option key={w.WarehouseCode} value={w.WarehouseCode}>{w.WarehouseCode} - {w.WarehouseDesc}</option>
                )
            });
    }

    renderCategory2() {
        return this.props.categories
            .sort((a, b) => {
                return a.Category2 === b.Category2 ? 0 : (a.Category2 > b.Category2 ? 1 : -1);
            })
            .map(cat => {
                return (
                    <option key={cat.Category2} value={cat.Category2}>{cat.Category2}</option>
                )
            });
    }

    renderCategory3() {
        return this.props.subCategories
            .sort((a, b) => {
                return a.Category3 === b.Category3 ? 0 : (a.Category3 > b.Category3 ? 1 : -1);
            })
            .map(cat => {
                return (
                    <option key={cat.Category3} value={cat.Category3}>{cat.Category3}</option>
                )
            });
    }

    renderCategory4() {
        return this.props.baseSKUs
            .sort((a, b) => {
                return a.Category4 === b.Category4 ? 0 : (a.Category4 > b.Category4 ? 1 : -1);
            })
            .map(cat => {
                return (
                    <option key={cat.Category4} value={cat.Category4}>{cat.Category4}</option>
                )
            });
    }


    renderProductLineOptions() {
        return this.props.productLines
            .sort((a, b) => {
                return a.ProductLine === b.ProductLine ? 0 : (a.ProductLine > b.ProductLine ? 1 : -1);
            })
            .map(pl => {
                return (
                    <option key={pl.ProductLine} value={pl.ProductLine}>{pl.ProductLine} - {pl.ProductLineDesc}</option>
                )
            });
    }

    renderItemStatusOptions() {
        return this.props.statuses
            .sort((a, b) => {
                return a.code === b.code ? 0 : (a.code > b.code ? 1 : -1);
            })
            .map(obj => {
                return (
                    <option key={obj.id} value={obj.code}>{obj.code} - {obj.description}</option>
                )
            });
    }

    render() {
        const { Company, WarehouseCode, ItemCode, ProductLine, Category2, Category3, Category4, ItemStatus } = this.props;
        const warehouses = this.renderWarehouseOptions();
        const productLines = this.renderProductLineOptions();
        const cat2Options = this.renderCategory2();
        const cat3Options = this.renderCategory3();
        const cat4Options = this.renderCategory4();
        const statusOptions = this.renderItemStatusOptions();
        const searchOptions = getQuery(this.props);
        return (
            <div>
                <form className="form-inline block-labels" onSubmit={::this.onLoad}>
                    <div className="form-group">
                        <label>Company</label>
                        <select className="form-control" value={Company}
                                onChange={this.onChangeCompany.bind(this)}>
                            <option value="CHI">Chums</option>
                            <option value="BCS">Beyond Coastal</option>
                            <option value="TST">TEST Company</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Item</label>
                        <ItemDropDown company={Company} options={searchOptions} minLength={0} loading={true}
                                      onChange={this.onChange.bind(this, 'ItemCode')}
                                      onSelect={::this.onSelectItem} />
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Warehouse</label>
                        <select className="form-control" value={WarehouseCode} style={{maxWidth: '250px'}}
                                onChange={this.onChange.bind(this, 'WarehouseCode')}>
                            <option value="%">ALL</option>
                            {warehouses}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Prod Line</label>
                        <select className="form-control" value={ProductLine} style={{maxWidth: '250px'}}
                                onChange={this.onChange.bind(this, 'ProductLine')}>
                            <option value="%">ALL</option>
                            {productLines}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Category</label>
                        <select className="form-control" value={Category2} style={{maxWidth: '250px'}}
                                onChange={this.onChange.bind(this, 'Category2')}>
                            <option value="%">ALL</option>
                            {cat2Options}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Sub Category</label>
                        <select className="form-control" value={Category3} style={{maxWidth: '250px'}}
                                onChange={this.onChange.bind(this, 'Category3')}>
                            <option value="%">ALL</option>
                            {cat3Options}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Base SKU</label>
                        <select className="form-control" value={Category4} style={{maxWidth: '250px'}}
                                onChange={this.onChange.bind(this, 'Category4')}>
                            <option value="%">ALL</option>
                            {cat4Options}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">Item Status</label>
                        <select className="form-control" value={ItemStatus || '%'} style={{maxWidth: '250px'}}
                                onChange={this.onChange.bind(this, 'ItemStatus')}>
                            <option value="%">ALL</option>
                            {statusOptions}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="hidden-xs">&nbsp;</label>
                        <button type="submit" className="btn btn-primary" onClick={::this.onLoad}>
                            Load
                        </button>
                    </div>
                </form>
                <DownloadReportForm ItemStatus={ItemStatus}
                                    Category2={Category2} Category4={Category4} Category3={Category3}
                                    ProductLine={ProductLine} WarehouseCode={WarehouseCode} ItemCode={ItemCode}
                                    Company={Company}/>
            </div>
        )
    }
}
