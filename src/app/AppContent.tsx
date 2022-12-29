import React from 'react';
import AlertList from "../ducks/alerts/AlertList";
import SelectItemForm from "../ducks/filters/SelectItemForm";
import AppTabs from "./AppTabs";
import {Outlet} from 'react-router-dom';

const AppContent = () => {

    return (
        <div>
            <AlertList/>
            <SelectItemForm/>
            <AppTabs/>
            <Outlet />
        </div>
    )
}

export default AppContent;
