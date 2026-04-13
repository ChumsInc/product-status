import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import type {RootState} from "@/app/configureStore";
import {NavLink, useLocation, useSearchParams} from "react-router";
import type {Tab} from "../types";
import {Nav} from "react-bootstrap";


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
    const [searchParams] = useSearchParams();
    const isAdmin = useSelector((state: RootState) => state.app.isAdmin);
    const [tabList, setTabList] = useState(initialTabList);

    useEffect(() => {
        setTabList(tabList.map(t => ({...t, disabled: t.requireAdmin && !isAdmin})));
    }, [isAdmin]);

    return (
        <div>
            <Nav activeKey={location.pathname} className="nav-tabs mt-3 mb-1">
                {tabList.map(tab => (
                    <Nav.Item key={tab.id}>
                        <Nav.Link as={NavLink} eventKey={tab.id} disabled={tab.disabled}
                                  to={`${tab.id}?${searchParams.toString()}`}>
                            {tab.title}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    )
}

export default AppTabs;
