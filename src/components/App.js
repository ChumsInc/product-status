

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectItemForm from './SelectItemForm';
import {
    fetchCompanyOptions,
    setTab,
} from '../actions';
import ItemReport from './ItemReport';
import Tabs from "./Tabs";
import {COMPANY_CHUMS, TAB_LIST, TABS} from "../constants";
import AlertList from "./AlertList";
import ItemEditor from "./ItemEditor";



class App extends Component {
    static propTypes = {
        tab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        company: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool,

        fetchCompanyOptions: PropTypes.func.isRequired,
        setTab: PropTypes.func.isRequired,
    };

    static defaultProps = {
        statusList: [],
        tab: TABS.report,
        company: COMPANY_CHUMS.code,
        isAdmin: false,
    };


    constructor(props) {
        super(props);
        this.onSelectItem = this.onSelectItem.bind(this);
        this.onSelectTab = this.onSelectTab.bind(this);
    }

    componentDidMount() {
        const {company, fetchCompanyOptions} = this.props;
        fetchCompanyOptions(company);
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
        const {tab, isAdmin} = this.props;
        return (
            <div>
                <AlertList/>
                <SelectItemForm  />
                <div className="mt-3">
                    {isAdmin && <Tabs tabList={TAB_LIST} activeTab={tab} onSelect={this.props.setTab}/>}
                    <div className="tab-content">
                        {(!isAdmin || tab === TABS.report) && <ItemReport/>}
                        {isAdmin && tab === TABS.edit && <ItemEditor />}
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({isAdmin, tab, company}) => {
    return {isAdmin, tab, company};
};

const mapDispatchToProps = {
    setTab,
    fetchCompanyOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


/*
@todo - Find the published version and copy in code from it, the editor is the default and should not be.
@todo - still need to work the code to push teh new statuses up to the server, was in Item.js but is deprecated
 */
