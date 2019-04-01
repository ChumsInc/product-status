/**
 * Created by steve on 2/9/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import {connect} from 'react-redux';
import ProgressBar from "./ProgressBar";
import FormGroup from "./FormGroup";
import FormGroupTextInput from "./FormGroupTextInput";
import {selectItem, selectItemAll, saveItemStatus} from '../actions';
import StatusSelect from "./StatusSelect";
import ItemList, {itemListFields} from "./ItemList";


const SelectItemInput = ({selected, onChange}) => (
    <div className="form-check form-check-inline">
        <input type="checkbox" className="form-check-input" onChange={() => onChange()} checked={selected}/>
    </div>
);

class ItemEditor extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        loading: PropTypes.bool,
        itemsLoaded: PropTypes.number,

        selectItem: PropTypes.func.isRequired,
        selectItemAll: PropTypes.func.isRequired,
        saveItemStatus: PropTypes.func.isRequired,
    };

    static defaultProps = {
        items: [],
        loading: false,
        itemsLoaded: 0,
    };

    state = {
        rowsPerPage: 10,
        page: 1,
        filter: '',
        hideZeroOnHand: true,
        showOnlySelected: false,
        checkAll: false,
        newItemStatus: '',
    };

    constructor(props) {
        super(props);
        this.onToggleHideZeroOnHand = this.onToggleHideZeroOnHand.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onToggleSelected = this.onToggleSelected.bind(this);
        this.onToggleSelectAll = this.onToggleSelectAll.bind(this);
        this.areAllSelected = this.areAllSelected.bind(this);
        this.onSaveSelected = this.onSaveSelected.bind(this);

        this.fields = [
            {field: 'selected',
                title: '',
                noSort: true,
                render: ({key, selected}) => (
                    <SelectItemInput selected={selected} onChange={() => this.onToggleSelected(key, !selected)}/>
                )
            },
            ...itemListFields
        ];
    }

    componentDidUpdate(prevProps, prevState) {
        const checkAll = this.areAllSelected();
        if (checkAll !== this.state.checkAll) {
            this.setState({checkAll});
        }
        if (this.props.itemsLoaded !== prevProps.itemsLoaded && this.state.page !== 1) {
            this.setState({page: 1});
        }
    }

    getVisibleItems() {
        const {filter, hideZeroOnHand, showOnlySelected} = this.state;

        if (showOnlySelected) {
            return this.props.items.filter(i => i.selected);
        }

        let itemFilter = new RegExp('^', 'i');
        try {
            itemFilter = new RegExp(filter, 'i');
        } catch (err) {

        }
        return this.props.items
            .filter(i => !hideZeroOnHand || i.QuantityOnHand !== 0)
            .filter(i => {
                return filter === ''
                    || itemFilter.test(i.ItemCode) || itemFilter.test(i.WarehouseCode)
                    || itemFilter.test(i.ItemCodeDesc)
                    || itemFilter.test(i.Category2) || itemFilter.test(i.Category3) || itemFilter.test(i.Category4);
            });
    }

    getVisiblePageItems() {
        const {page, rowsPerPage} = this.state;
        return this.getVisibleItems().filter((i, index) => Math.floor(index / rowsPerPage) === page - 1);
    }

    onChangeFilter({value}) {
        this.setState({filter: value});
    }


    onToggleHideZeroOnHand() {
        const hideZeroOnHand = !this.state.hideZeroOnHand;
        this.setState({hideZeroOnHand});
    }

    onToggleSelected(key, status) {
        this.props.selectItem(key, status);
    }


    areAllSelected() {
        const items = this.getVisiblePageItems();
        return items.filter(i => i.selected).length === items.length;
    }

    onToggleSelectAll() {
        const items = this.getVisiblePageItems();

        const allSelected = items.filter(i => i.selected).length === items.length;
        items.forEach(i => this.props.selectItem(i.key, !allSelected));
    }

    onSaveSelected() {
        const {items, saveItemStatus} = this.props;
        const {newItemStatus} = this.state;
        items.filter(i => i.selected)
            .forEach(i => {
                saveItemStatus(i, newItemStatus);
            });
    }

    render() {
        const {filter, hideZeroOnHand, newItemStatus, showOnlySelected} = this.state;

        const itemList = this.getVisibleItems();

        const totals = {Category4: 'Selected:', ItemStatus: 0, QuantityOnHand: 0, ItemCost: 0};
        itemList.map(item => {
            totals.ItemStatus += item.selected ? 1 : 0;
            totals.QuantityOnHand += item.QuantityOnHand;
            totals.ItemCost += item.ItemCost;
        });

        const btnOnHand = {
            'btn-warning': hideZeroOnHand,
            'btn-outline-secondary': !hideZeroOnHand,
        };
        const btnOnlySelected = {
            'btn-info': showOnlySelected,
            'btn-outline-info': !showOnlySelected
        };

        this.fields[0].title = (<SelectItemInput selected={this.state.checkAll} onChange={this.onToggleSelectAll}/>);

        const checked = itemList.filter(i => i.selected).length;

        return (
            <div>
                <div className="form-inline mb-3">
                    <FormGroupTextInput value={filter} onChange={this.onChangeFilter} label="Filter"/>
                    <FormGroup label="Show">
                        <div className="btn-group btn-group-sm ml-1">
                            <button type="button" className={classNames('btn', btnOnHand)}
                                    onClick={this.onToggleHideZeroOnHand}>
                                Only On Hand
                            </button>
                            <button type="button" className={classNames('btn', btnOnlySelected)}
                                    onClick={() => this.setState({showOnlySelected: !showOnlySelected, page: 1})}>
                                Only Selected
                            </button>
                        </div>
                    </FormGroup>
                    <FormGroup label="New Status">
                        <StatusSelect value={newItemStatus} allowNoStatus={true}
                                      onChange={({value}) => this.setState({newItemStatus: value})} />
                    </FormGroup>
                    <FormGroup>
                        <button type="submit" onClick={this.onSaveSelected}
                                disabled={checked === 0 || newItemStatus === ''} className="btn btn-sm btn-primary">
                            Update Items ({checked})
                        </button>
                    </FormGroup>
                </div>
                <ItemList fields={this.fields} hideZeroOnHand={hideZeroOnHand} filter={filter}
                          onSelect={({key, selected}) => this.onToggleSelected(key, !selected)}/>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemEditor);
