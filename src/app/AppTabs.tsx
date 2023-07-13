import React, {useEffect, useState} from 'react';
import {Tab, TabList} from 'chums-components'
import {useSelector} from "react-redux";
import {RootState} from "../ducks";
import {useLocation, useNavigate} from "react-router-dom";


export interface ValidatedTab extends Tab {
    requireAdmin?: boolean;
}

const initialTabList: ValidatedTab[] = [
    {id: '/', title: 'Product Status Report'},
    {id: '/edit', title: 'Edit Product Status', disabled: true, requireAdmin: true},
    {id: '/reorder', title: 'Item Reorder Options', disabled: true, requireAdmin: true},
    {id: '/notes', title: 'Notes'}


]

const AppTabs = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isAdmin = useSelector((state: RootState) => state.app.isAdmin);
    const [tabList, setTabList] = useState(initialTabList);

    useEffect(() => {
        setTabList(tabList.map(t => ({...t, disabled: t.requireAdmin && !isAdmin})));
    }, [isAdmin]);

    const selectHandler = (tab: Tab) => {
        navigate(tab.id);
    }

    return (
        <div>
            <TabList tabs={tabList} currentTabId={location.pathname} className="mt-3 mb-1" onSelectTab={selectHandler}/>
        </div>
    )
}

export default AppTabs;
