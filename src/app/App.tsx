import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAdminAction, selectIsAdmin} from "../ducks/app";
import AppTabs, {TAB_EDIT, TAB_NOTES, TAB_REORDER, TAB_VIEW, tabKey} from "./Tabs";
import {fetchFiltersAction} from "../ducks/filters";
import SelectItemForm from "../ducks/filters/SelectItemForm";
import ItemReport from "../ducks/items/ItemReport";
import ItemStatusEdit from "../ducks/items/ItemStatusEdit";
import ItemReorderEdit from "../ducks/items/ItemReorderEdit";
import NotesTabContent from "../components/NotesTabContent";
import {AlertList, selectCurrentTab} from "chums-connected-components";
import {useAppDispatch} from "./configureStore";


const App: React.FC = () => {
    const dispatch = useAppDispatch();
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
