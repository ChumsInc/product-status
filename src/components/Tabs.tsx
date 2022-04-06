import React, {useEffect} from 'react';
import {Tab, TabList, tabListCreatedAction, tabToggleStatusAction} from 'chums-ducks';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../ducks";

export const tabKey = 'product-status-tabs';
export const TAB_VIEW = 'TAB_VIEW';
export const TAB_EDIT = 'TAB_EDIT';
export const TAB_REORDER = 'TAB_REORDER';
export const TAB_NOTES = 'TAB_NOTES';

const tabList:Tab[] = [
    {id: TAB_VIEW, title: 'Product Status Report'},
    {id: TAB_EDIT, title: 'Edit Product Status', disabled: true},
    {id: TAB_REORDER, title: 'Item Reorder Options', disabled: true},
    {id: TAB_NOTES, title: 'Notes'}


]
const AppTabs:React.FC = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state:RootState) => state.app.isAdmin);

    useEffect(() => {
        dispatch(tabListCreatedAction(tabList, tabKey, tabList[0].id));
    }, [])

    useEffect(() => {
        dispatch(tabToggleStatusAction(TAB_EDIT, tabKey, isAdmin));
        dispatch(tabToggleStatusAction(TAB_REORDER, tabKey, isAdmin));
    }, [isAdmin]);
    return (
        <TabList tabKey={tabKey} className="mt-3 mb-1"/>
    )
}

export default AppTabs;
