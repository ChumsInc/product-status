import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {loadAdminRole, selectIsAdmin} from "../ducks/app";
import {tabKey} from "./AppTabs";
import {loadFilters} from "../ducks/filters";
import ItemReport from "../ducks/items/ItemReport";
import ItemStatusEdit from "../ducks/items/ItemStatusEdit";
import ItemReorderEdit from "../ducks/items/ItemReorderEdit";
import NotesTabContent from "../components/NotesTabContent";
import {selectCurrentTab} from "chums-connected-components";
import {useAppDispatch} from "./configureStore";
import AppContent from "./AppContent";
import {Route, Routes} from 'react-router-dom';


const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAdmin = useSelector(selectIsAdmin);
    const tab = useSelector(selectCurrentTab(tabKey))

    useEffect(() => {
        dispatch(loadAdminRole());
        dispatch(loadFilters());
    }, [])

    return (
        <React.StrictMode>

            <Routes>
                <Route path="/" element={<AppContent/>}>
                    <Route index element={<ItemReport/>}/>
                    <Route path="/edit" element={<ItemStatusEdit/>}/>
                    <Route path="/reorder" element={<ItemReorderEdit/>}/>
                    <Route path="/notes" element={<NotesTabContent/>}/>
                </Route>
            </Routes>
            {/*<div className="tab-content">*/}
            {/*    {(!isAdmin || tab === TAB_VIEW) && <ItemReport/>}*/}
            {/*    {isAdmin && tab === TAB_EDIT && <ItemStatusEdit/>}*/}
            {/*    {isAdmin && tab === TAB_REORDER && <ItemReorderEdit/>}*/}
            {/*    {tab === TAB_NOTES && <NotesTabContent/>}*/}
            {/*</div>*/}
        </React.StrictMode>
    )
}

export default App;
