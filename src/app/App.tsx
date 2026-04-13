import {StrictMode, useEffect} from "react";
import {loadAdminRole} from "../ducks/app";
import {loadFilters} from "../ducks/filters";
import ItemReport from "../ducks/items/ItemReport";
import ItemStatusEdit from "@/ducks/items/product-edit-list/ItemStatusEdit.tsx";
import ItemReorderEdit from "@/ducks/items/product-reorder-list/ItemReorderEdit.tsx";
import NotesTabContent from "../components/NotesTabContent";
import {useAppDispatch} from "./configureStore";
import AppContent from "./AppContent";
import {Route, Routes} from 'react-router';


const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadAdminRole());
        dispatch(loadFilters());
    }, [dispatch])

    return (
        <StrictMode>
            <Routes>
                <Route path="/" element={<AppContent/>}>
                    <Route index element={<ItemReport/>}/>
                    <Route path="/edit" element={<ItemStatusEdit/>}/>
                    <Route path="/reorder" element={<ItemReorderEdit/>}/>
                    <Route path="/notes" element={<NotesTabContent/>}/>
                </Route>
            </Routes>
        </StrictMode>
    )
}

export default App;
