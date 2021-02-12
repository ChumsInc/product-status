/**
 * Created by steve on 2/9/2017.
 */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types'
import numeral from 'numeral';
import {connect} from 'react-redux';
import ProgressBar from "./ProgressBar";
import SortableTable from "./SortableTable";
import {setRowsPerPage, setPage} from '../actions/app';
import {selectItem, selectItemAll} from '../actions/items';
import {TABS} from "../constants";

export const itemListFields = [
    {field: 'ItemCode', title: 'Item'},
    {field: 'WarehouseCode', title: 'Whse'},
    {field: 'ItemCodeDesc', title: 'Description'},
    {field: 'ProductLine', title: 'P/L'},
    {field: 'Category2', title: 'Category'},
    {field: 'Category3', title: 'Sub Category'},
    {field: 'Category4', title: 'SKU'},
    {field: 'ItemStatus', title: 'Status', className: 'status-container'},
    {
        field: 'QuantityOnHand',
        title: 'Qty On Hand',
        render: ({QuantityOnHand}) => numeral(QuantityOnHand).format('0,0'),
        className: 'right'
    },
    // {
    //     field: 'QuantityOnPurchaseOrder',
    //     title: 'Qty On PO',
    //     render: ({QuantityOnPurchaseOrder}) => numeral(QuantityOnPurchaseOrder).format('0,0'),
    //     className: 'right'
    // },
    {
        field: 'QuantityAvailable',
        title: 'Qty Available',
        render: ({QuantityAvailable}) => numeral(QuantityAvailable).format('0,0'),
        className: 'right'
    },
    {
        field: 'AverageUnitCost',
        title: 'Item Cost',
        render: ({AverageUnitCost}) => numeral(AverageUnitCost).format('0,0.0000'),
        className: 'right'
    },
    {
        field: 'QuantityAvailableCost',
        title: 'Ext Cost',
        render: ({QuantityAvailableCost}) => numeral(QuantityAvailableCost).format('0,0.00'),
        className: 'right'
    },
];

const itemSorter = ({list, field, asc}) => {
    return list.sort((a, b) => {
        return (asc ? 1 : -1) * (
            a[field] === b[field]
                ? (a.key === b.key ? 0 : (a.key > b.key ? 1 : -1))
                : (a[field] > b[field] ? 1 : -1)
        );
    })
};


const rowClassName = ({QuantityOnHand, selected}) => ({
    'table-warning': !selected && QuantityOnHand === 0,
    'table-info': selected,
});

class ItemList extends Component {
    static propTypes = {
        visibleItems: PropTypes.array.isRequired,
        itemCount: PropTypes.number,
        allowSelectItems: PropTypes.bool,
        loading: PropTypes.bool,
        rowsPerPage: PropTypes.number,
        page: PropTypes.number,

        setRowsPerPage: PropTypes.func.isRequired,
        setPage: PropTypes.func.isRequired,
        selectItem: PropTypes.func.isRequired,
        selectItemAll: PropTypes.func.isRequired,

    };

    static defaultProps = {
        visibleItems: [],
        itemCount: 0,
        allowSelectItems: false,
        loading: false,
        rowsPerPage: 10,
        page: 1,
    };

    constructor(props) {
        super(props);
        this.onToggleSelected = this.onToggleSelected.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const {page, rowsPerPage, visibleItems, loading} = this.props;

        const pages = Math.ceil(visibleItems.length / rowsPerPage);
        if (loading === false && page > 1 && page > pages) {
            this.props.setPage(pages === 0 ? 1 : pages);
        }
    }


    onSelectAll(rows) {
        const keys = rows.map(item => item.key);
        this.props.selectItemAll(keys);
    }

    onToggleSelected({key, selected}) {
        this.props.selectItem(key, !selected);
    }

    render() {
        const {loading, visibleItems, itemCount, rowsPerPage, page, allowSelectItems} = this.props;

        const totals = {
            Category4: 'Items:',
            ItemStatus: 0,
            QuantityOnHand: 0,
            // QuantityOnPurchaseOrder: 0,
            QuantityAvailable: 0,
            QuantityAvailableCost: 0,
        };

        visibleItems.map(item => {
            totals.ItemStatus += 1;
            totals.QuantityOnHand += item.QuantityOnHand;
            // totals.QuantityOnPurchaseOrder += item.QuantityOnPurchaseOrder;
            totals.QuantityAvailable += item.QuantityAvailable;
            totals.QuantityAvailableCost += item.QuantityAvailableCost;
        });

        totals.ItemStatus = itemCount === 0 ? 0 : `${totals.ItemStatus}/${itemCount}`;

        return (
            <Fragment>
                {loading && <ProgressBar striped={true}/>}
                <SortableTable data={visibleItems}
                               useCheckBoxSelect={allowSelectItems}
                               isActive={(row) => !!row.selected}
                               activeClassName=""
                               className={{'item-list': true}}
                               fields={itemListFields}
                               filtered={visibleItems.length !== itemCount}
                               defaultSort="ItemCode"
                               sorter={itemSorter}
                               keyField="key"
                               rowClassName={rowClassName}
                               onSelect={this.onToggleSelected}
                               onSelectAll={this.onSelectAll}
                               onChangeSort={() => this.props.setPage(1)}
                               page={page} onChangePage={this.props.setPage}
                               rowsPerPage={rowsPerPage}
                               onChangeRowsPerPage={this.props.setRowsPerPage}
                               hasFooter={true} footerData={totals}/>
            </Fragment>
        )
    }
}



const mapStateToProps = (state) => {
    const {rowsPerPage, page, tab} = state.app;
    const {list, loading, itemsLoaded, visibleItems} = state.items;
    const itemCount = list.length;
    const allowSelectItems = tab === TABS.edit;
    return {visibleItems, itemCount, loading, itemsLoaded, rowsPerPage, page, allowSelectItems};
};

const mapDispatchToProps = {
    setRowsPerPage,
    setPage,
    selectItem,
    selectItemAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
