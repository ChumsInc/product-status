import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SelectItemForm from '../ducks/filters/SelectItemForm';
import ItemReport from '../ducks/items/ItemReport';
import AppTabs, {TAB_EDIT, TAB_NOTES, TAB_REORDER, TAB_VIEW, tabKey} from "./Tabs";
import {AlertList, selectCurrentTab} from "chums-ducks";
import {fetchFiltersAction} from "../ducks/filters";
import {checkIsAdminAction, selectIsAdmin} from "../ducks/app";
import ItemStatusEdit from "../ducks/items/ItemStatusEdit";
import NotesTabContent from "./NotesTabContent";
import ItemReorderEdit from "../ducks/items/ItemReorderEdit";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(selectIsAdmin);
    const tab = useSelector(selectCurrentTab(tabKey))

    useEffect(() => {
        dispatch(checkIsAdminAction());
        dispatch(fetchFiltersAction());
    }, [])

    return (
        <React.StrictMode>
            <AlertList/>
            <SelectItemForm/>
            <AppTabs/>
            <div className="tab-content">
                {(!isAdmin || tab === TAB_VIEW) && <ItemReport/>}
                {isAdmin && tab === TAB_EDIT && <ItemStatusEdit/>}
                {isAdmin && tab === TAB_REORDER && <ItemReorderEdit/>}
                {tab === TAB_NOTES && <NotesTabContent/>}
            </div>
        </React.StrictMode>
    )
}

export default App;


/*
@todo - still need to work the code to push teh new statuses up to the server, was in Item.js but is deprecated
 */
