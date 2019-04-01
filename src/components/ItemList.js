/**
 * Created by steve on 2/9/2017.
 */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types'
import numeral from 'numeral';
import {connect} from 'react-redux';
import ProgressBar from "./ProgressBar";
import SortableTable from "./SortableTable";
import {selectItem, selectItemAll, saveItemStatus} from '../actions';
import {noop} from '../utils';

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
        items: PropTypes.array.isRequired,
        loading: PropTypes.bool,
        itemsLoaded: PropTypes.number,
        fields: PropTypes.array,
        filter: PropTypes.string,
        hideZeroOnHand: PropTypes.bool,

        onSelect: PropTypes.func,

    };

    static defaultProps = {
        items: [],
        loading: false,
        itemsLoaded: 0,
        fields: [],
        filter: '',
        hideZeroOnHand: true,
    };

    state = {
        rowsPerPage: 10,
        page: 1,
    };

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.itemsLoaded !== prevProps.itemsLoaded && this.state.page !== 1) {
            this.setState({page: 1});
        }
    }

    getVisibleItems() {
        const {filter, hideZeroOnHand, items} = this.props;

        let itemFilter = new RegExp('^', 'i');
        try {
            itemFilter = new RegExp(filter, 'i');
        } catch (err) {

        }
        return items
            .filter(i => !hideZeroOnHand || i.QuantityOnHand !== 0)
            .filter(i => {
                return filter === ''
                    || itemFilter.test(i.ItemCode) || itemFilter.test(i.WarehouseCode)
                    || itemFilter.test(i.ItemCodeDesc)
                    || itemFilter.test(i.Category2) || itemFilter.test(i.Category3) || itemFilter.test(i.Category4);
            });
    }


    render() {
        const {loading, fields, onSelect} = this.props;
        const {filter, page, rowsPerPage} = this.state;

        const itemList = this.getVisibleItems();

        const totals = {Category4: onSelect ? 'Selected:' : '', ItemStatus: onSelect ? 0 : '', QuantityOnHand: 0, QuantityAvailableCost: 0};
        itemList.map(item => {
            if (onSelect) {
                totals.ItemStatus += 1;
            }
            totals.QuantityOnHand += item.QuantityOnHand;
            totals.QuantityAvailableCost += item.QuantityAvailableCost;
        });

        return (
            <Fragment>
                {loading && <ProgressBar striped={true}/>}
                <SortableTable data={itemList}
                               fields={fields} filtered={filter !== ''} defaultSort="ItemCode"
                               sorter={itemSorter}
                               keyField="key" rowClassName={rowClassName}
                               onSelect={(onSelect || noop)}
                               onChangeSort={() => this.setState({page: 1})}
                               page={page} onChangePage={page => this.setState({page})}
                               rowsPerPage={rowsPerPage}
                               onChangeRowsPerPage={rowsPerPage => this.setState({rowsPerPage, page: 1})}
                               hasFooter={true} footerData={totals}/>
            </Fragment>
        )
    }
}

const mapStateToProps = ({items, loading, itemsLoaded}) => {
    return {items, loading, itemsLoaded};
};

const mapDispatchToProps = {
    selectItem,
    selectItemAll,
    saveItemStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
