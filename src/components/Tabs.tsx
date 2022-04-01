import React, {useEffect} from 'react';
import {Tab, TabList, tabListCreatedAction, tabToggleStatusAction} from 'chums-ducks';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../ducks";

export const tabKey = 'product-status-tabs';
export const TAB_VIEW = 'TAB_VIEW';
export const TAB_EDIT = 'TAB_EDIT';
export const TAB_VENDOR = 'TAB_VENDOR';

const tabList:Tab[] = [
    {id: TAB_VIEW, title: 'Product Status Report'},
    {id: TAB_EDIT, title: 'Edit Product Status', disabled: true},
    {id: TAB_VENDOR, title: 'Item Vendor Options', disabled: true},

]
const AppTabs:React.FC = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state:RootState) => state.app.isAdmin);

    useEffect(() => {
        dispatch(tabListCreatedAction(tabList, tabKey, tabList[0].id));
    }, [])

    useEffect(() => {
        dispatch(tabToggleStatusAction(TAB_EDIT, tabKey, isAdmin));
        dispatch(tabToggleStatusAction(TAB_VENDOR, tabKey, isAdmin));
    }, [isAdmin]);
    return (
        <TabList tabKey={tabKey} />
    )
}

export default AppTabs;
