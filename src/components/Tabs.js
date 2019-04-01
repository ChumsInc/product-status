import React from 'react';
import classNames from 'classnames';

/**
 *
 * @param {boolean} active
 * @param {String|Number} id
 * @param {String} title
 * @param {function} onSelect
 * @return {*}
 * @constructor
 */
const Tab = ({active = false, id, title, onSelect}) => {
    const onClick = (ev) => {
        ev.preventDefault();
        onSelect(id);
    };
    return (
        <li className="nav-item">
            <a className={classNames('nav-link', {active})} href="#" onClick={onClick}>{title}</a>
        </li>
    );
};

/**
 *
 * @param {Array} tabList
 * @param {String|Number} activeTab
 * @param {function} onSelect
 * @return {*}
 * @constructor
 */
const Tabs = ({tabList = [], activeTab, onSelect}) => (
    <ul className="nav nav-tabs mb-2">
        {tabList.map(tab => <Tab key={tab.id} {...tab} active={activeTab === tab.id} onSelect={(id) => onSelect(id)}/>)}
    </ul>
);

export default Tabs;
