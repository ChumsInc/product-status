import React, {useEffect} from "react";
import {loadAdminRole} from "../ducks/app";
import {loadFilters} from "../ducks/filters";
import ItemReport from "../ducks/items/ItemReport";
import ItemStatusEdit from "../ducks/items/ItemStatusEdit";
import ItemReorderEdit from "../ducks/items/ItemReorderEdit";
import NotesTabContent from "../components/NotesTabContent";
import {useAppDispatch} from "./configureStore";
import AppContent from "./AppContent";
import {Route, Routes} from 'react-router-dom';


const App: React.FC = () => {
    const dispatch = useAppDispatch();

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
        </React.StrictMode>
    )
}

export default App;
