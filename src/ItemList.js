/**
 * Created by steve on 2/9/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import DataTable, { Pagination, DataTableFilter } from './chums/DataTable';
import numeral from 'numeral';
import SaveForm from './SaveForm';




export default class ItemList extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onlySelected: PropTypes.bool,
        onSelect: PropTypes.func.isRequired,
        itemsPerPage: PropTypes.number,
        pending: PropTypes.number,
        statusList: PropTypes.array.isRequired,
    };


    constructor() {
        super();
        this.state = {
            selectAll: false,
            pageLength: 10,
            filter: '',
            newItemStatus: null,
            showOnlySelected: false,
            pendingUpdates: 0,
            hideZeroOnHand: true,
        };
    }


    onClickItem(item) {
        this.props.onSelect(item);
    }

    onClickAll(ev) {
        this.setState({selectAll: !this.state.selectAll}, () => {
            this.props.items
                .map(i => {
                    i.selected = this.state.selectAll;
                });
        });
    }

    onSelectRow(row) {
        row.selected = !row.selected;
    }

    renderSelector(selected, row) {
        return (
            <input type="checkbox" checked={row.selected} onChange={() => {}}/>
        )
    }

    onChangePageLength(ev) {
        const pageLength = Number(ev.target.value);
        this.setState({pageLength});
    }

    onChangeFilter(val) {
        this.filter = val;
    }

    onChangeBinLocation(value) {
        this.newItemStatus = value.toUpperCase();
    }

    onShowSelected() {
        this.showOnlySelected = !this.showOnlySelected;
    }

    onSaveSelected() {
        this.props.items
            .filter(i => i.selected)
            .map(i => {
                this.pendingUpdates += 1;
                i.saveStatus(this.newItemStatus)
                    .then(() => {
                        this.pendingUpdates -= 1;
                    })
                    .catch(err => {console.log(err)});
            })
    }

    onToggleHideZeroOnHand() {
        const {hideZeroOnHand} = this.state;
        this.setState({hideZeroOnHand: !hideZeroOnHand});
    }


    render() {
        const { items, onlySelected } = this.props;
        const { filter, showOnlySelected, hideZeroOnHand, pageLength } = this.state;
        let itemFilter = new RegExp('\\b', 'i');
        try {
            itemFilter = new RegExp('\\b' + filter, 'i');
        } catch (err) {

        }

        const itemList = items
            .filter(i => !showOnlySelected || i.selected)
            .filter(i => !hideZeroOnHand || i.QuantityOnHand !== 0)
            .filter(i => {
                return filter === ''
                || itemFilter.test(i.ItemCode) || itemFilter.test(i.WarehouseCode)
                || itemFilter.test(i.Category2) || itemFilter.test(i.Category3) || itemFilter.test(i.Category4);
            });

        const selectAll = <input type="checkbox" checked={this.state.selectAll} onChange={::this.onClickAll} title="Select All|None" />;

        const fields = {
            selected: {title: selectAll, render: ::this.renderSelector, sortable: false},
            ItemCode: {title: 'Item', total: 'Total'},
            WarehouseCode: 'Whse',
            ItemCodeDesc: 'Description',
            ProductLine: 'P/L',
            Category2: 'Category',
            Category3: 'Sub Category',
            Category4: 'SKU',
            ItemStatus: 'Status',
            QuantityOnHand: {title: 'Qty', render: (v) => numeral(v).format('0,0'), className: 'right', total: true},
            AverageUnitCost: {title: 'Item Cost', render: (v) => numeral(v).format('0,0.0000'), className: 'right'},
            ItemCost: {title: 'Ext Cost', render: (v) => numeral(v).format('0,0.00'), className: 'right', total: true},
        };

        return (
            <div>
                <DataTableFilter filter={filter} onChangeFilter={::this.onChangeFilter}>
                    <div className="form-group">
                        <label className="hidden-xs">Items/Page</label>
                        <select className="form-control" value={pageLength}
                                onChange={::this.onChangePageLength}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="button" className={classNames('btn', {'btn-warning': hideZeroOnHand, 'btn-default': !hideZeroOnHand})}
                                onClick={::this.onToggleHideZeroOnHand}>
                            {hideZeroOnHand ? 'Show All' : 'Show On Hand'}
                        </button>
                    </div>
                    <SaveForm newItemStatus={this.state.newItemStatus} showSelected={this.state.showOnlySelected}
                              onChange={::this.onChangeBinLocation}
                              onShowSelected={::this.onShowSelected}
                              onSave={::this.onSaveSelected} statusList={this.props.statusList}/>
                </DataTableFilter>
                <DataTable fields={fields} data={itemList} onSelect={::this.onSelectRow} selected={{id: 0}} loading={false} rowsPerPage={this.state.pageLength}
                           hasTotal defaultSort="ItemCode"/>
                <div>
                    Items: {items.length},
                    Selected: {items.filter(i => i.selected).length},
                    Processing: {this.pendingUpdates || 'N/A'}
                </div>
            </div>
        )
    }
}
