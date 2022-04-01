

import React, {Component, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import SelectItemForm from './SelectItemForm';
import {
    fetchCompanyOptions,
    setTab,
} from '../actions/app';
import ItemReport from './ItemReport';
import Tabs, {TAB_EDIT, TAB_VIEW, tabKey} from "./Tabs";
import {COMPANY_CHUMS, TAB_LIST, TABS} from "../constants";
import ItemEditor from "./ItemEditor";
import ItemList from "./ItemList";
import {AlertList, selectCurrentTab} from "chums-ducks";
import {RootState} from "../ducks";
import AppTabs from "./Tabs";
import {fetchFiltersAction} from "../ducks/filters";

const App:React.FC = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state:RootState) => state.app.isAdmin);
    const tab = useSelector(selectCurrentTab(tabKey))

    useEffect(() => {
        dispatch(fetchFiltersAction());
    }, [])

    return (
        <div>
            <AlertList />
            <SelectItemForm  />
            <AppTabs />
            <div className="tab-content">
            {(!isAdmin || tab === TAB_VIEW) && <ItemReport/>}
            {isAdmin && tab === TAB_EDIT && <ItemEditor />}
            <ItemList />
            </div>
        </div>
    )
}

export default App;
// class oldApp extends Component {
//     static propTypes = {
//         tab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//         company: PropTypes.string.isRequired,
//         isAdmin: PropTypes.bool,
//
//         fetchCompanyOptions: PropTypes.func.isRequired,
//         setTab: PropTypes.func.isRequired,
//     };
//
//     static defaultProps = {
//         statusList: [],
//         tab: TABS.report,
//         company: COMPANY_CHUMS.code,
//         isAdmin: false,
//     };
//
//
//     constructor(props) {
//         super(props);
//         this.onSelectItem = this.onSelectItem.bind(this);
//         this.onSelectTab = this.onSelectTab.bind(this);
//     }
//
//     componentDidMount() {
//         const {company, fetchCompanyOptions} = this.props;
//         fetchCompanyOptions(company);
//     }
//
//
//     onSelectItem(item) {
//         this.items
//             .filter(i => i.Company === item.Company && i.ItemCode === item.ItemCode && i.WarehouseCode === item.WarehouseCode)
//             .map(i => {
//                 i.selected = !i.selected;
//             });
//     }
//
//     onSelectTab(tab) {
//         this.setState({currentTab: tab});
//     }
//
//     render() {
//         const {tab, isAdmin} = this.props;
//         return (
//             <div>
//                 <AlertList />
//                 <SelectItemForm  />
//                 <div className="mt-3">
//                     {isAdmin && <Tabs tabList={TAB_LIST} activeTab={tab} onSelect={this.props.setTab}/>}
//                     <div className="tab-content">
//                         {/*{(!isAdmin || tab === TABS.report) && <ItemReport/>}*/}
//                         {/*{isAdmin && tab === TABS.edit && <ItemEditor />}*/}
//                         {/*<ItemList />*/}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
//
//
// const mapStateToProps = (state) => {
//     const {isAdmin, tab, company} = state.app;
//     return {isAdmin, tab, company};
// };
//
// const mapDispatchToProps = {
//     setTab,
//     fetchCompanyOptions,
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);



/*
@todo - Find the published version and copy in code from it, the editor is the default and should not be.
@todo - still need to work the code to push teh new statuses up to the server, was in Item.js but is deprecated
 */
