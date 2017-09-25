

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SelectItemForm from './SelectItemForm';
import ItemList from './ItemList';
import ProgressBar from './chums/ProgressBar';
import {
    fetchCat2, fetchCat3, fetchCat4,
    fetchProductLines,
    fetchProducts, fetchStatuses, fetchWarehouses,
} from './actions';

const defaultState = {
    Company: 'CHI',
    ItemCode: '',
    WarehouseCode: '',
    ProductLine: '',
    Category2: '',
    Category3: '',
    Category4: '',
    ItemStatus: 'D%',
};

class App extends Component {
    static propTypes = {
        warehouses: PropTypes.array,
        productLines: PropTypes.array,
        categories: PropTypes.array,
        subCategories: PropTypes.array,
        baseSKUs: PropTypes.array,
        statuses: PropTypes.array,
        products: PropTypes.array,
        hasError: PropTypes.bool,
        isLoading: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(params) {
        super(params);
        this.state = {
            Company: 'CHI',
            ItemCode: '',
            WarehouseCode: '',
            ProductLine: '',
            Category2: '',
            Category3: '',
            Category4: '',
            ItemStatus: '',
            currentTab: 'editor',
        }
    }

    componentWillMount() {
        this.setState({...defaultState, Company: 'CHI'});
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchWarehouses());
        dispatch(fetchProductLines());
        dispatch(fetchCat2());
        dispatch(fetchCat3());
        dispatch(fetchCat4());
        dispatch(fetchStatuses());
    }

    onChangeCompany(Company) {
        const {dispatch} = this.props;
        this.setState({...defaultState, Company});
        dispatch(fetchWarehouses(Company));
        dispatch(fetchProductLines(Company));
        dispatch(fetchCat2(Company));
        dispatch(fetchCat3(Company));
        dispatch(fetchCat4(Company));
        dispatch(fetchStatuses(Company));
    }

    onChangeField(field, value) {
        if (this.state[field] !== undefined) {
            this.setState({[field]: value});
        }
    }

    onLoad() {
        this.props.dispatch(fetchProducts(this.state));
    }

    onSelectItem(item) {
        this.items
            .filter(i => i.Company === item.Company && i.ItemCode === item.ItemCode && i.WarehouseCode === item.WarehouseCode)
            .map(i => {
                i.selected = !i.selected;
            });
    }

    onSelectTab(tab) {
        this.setState({currentTab: tab});
    }

    render() {
        let content;
        const {
            Company, ItemCode, WarehouseCode, ProductLine, Category2, Category3, Category4, ItemStatus, currentTab
        } = this.state;
        const { warehouses, productLines, categories, subCategories, baseSKUs, statuses } = this.props;
        switch (currentTab) {
        case 'editor':
            content = (
                <div>
                    <ItemList onSelect={::this.onSelectItem} items={this.props.products} statusList={statuses}/>

                </div>
            );
            break;
        case 'report':
            content = <div>content goes here</div>;
            break;
        }
        return (
            <div>
                <SelectItemForm  onChangeField={::this.onChangeField} onLoad={::this.onLoad}
                                 onChangeCompany={::this.onChangeCompany} Company={Company} ItemCode={ItemCode}
                                 WarehouseCode={WarehouseCode} ProductLine={ProductLine}
                                 Category2={Category2} Category3={Category3} Category4={Category4}
                                 ItemStatus={ItemStatus} warehouses={warehouses} statuses={statuses} baseSKUs={baseSKUs}
                                 subCategories={subCategories} categories={categories} productLines={productLines}/>
                <div style={{marginTop: '10px'}}>
                    <ul className="nav nav-tabs" role="tablist" style={{marginBottom: '5px'}}>
                        <li role="presentation" className={classNames({active: currentTab === 'editor'})}>
                            <a href="#editor" role="tab" onClick={this.onSelectTab.bind(this, 'editor')}>Editor</a>
                        </li>
                        <li role="presentation" className={classNames({active: currentTab === 'report'})}>
                            <a href="#report" role="tab" onClick={this.onSelectTab.bind(this, 'report')}>Report</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <ProgressBar active={true} visible={this.props.isLoading} striped={true}/>
                        {content}
                    </div>
                </div>
                <code>{JSON.stringify(this.state, ' ', 2)}</code>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(App);
