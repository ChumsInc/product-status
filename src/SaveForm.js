/**
 * Created by steve on 2/9/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TEST_WC = /%/g;


export default class SaveForm extends Component {
    static propTypes = {
        statusList: PropTypes.array.isRequired,
        newItemStatus: PropTypes.string,
        showSelected: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        onShowSelected: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
    };

    onChange(ev) {
        this.props.onChange(ev.target.value);
    }

    onShowSelected(ev) {
        ev.preventDefault();
        this.props.onShowSelected();
    }

    onSave(ev) {
        ev.preventDefault();
        this.props.onSave();
    }

    renderItemStatusOptions() {
        return this.props.statusList
            .filter(obj => !TEST_WC.test(obj.code))
            .sort((a, b) => {
                return a.code === b.code ? 0 : (a.code > b.code ? 1 : -1);
            })
            .map(obj => {
                return (
                    <option key={obj.id} value={obj.code}>{obj.code} - {obj.description}</option>
                )
            });
    }

    render() {
        const { newItemStatus, showSelected } = this.props;
        const statusOptions = this.renderItemStatusOptions();
        return (
            <form className="form-inline save-form" onSubmit={::this.onShowSelected} style={{display: 'inline-block'}}>
                <div className="form-group">
                    <label className="hidden-xs">New Item Status</label>
                    <select className="form-control" value={newItemStatus || '%'}
                            onChange={::this.onChange}>
                        <option value={null}>Select One</option>
                        <option value="">Clear Status</option>
                        {statusOptions}
                    </select>
                </div>
                <button type="button"
                        className={classNames("btn", {'btn-default': !showSelected, 'btn-warning': showSelected})}
                        onClick={::this.onShowSelected}>
                    {showSelected ? 'Show All' : 'Show Selected'}
                </button>
                <button type="submit" className="btn btn-primary"
                        onClick={::this.onSave}
                        disabled={this.newItemStatus === null}>
                    Save
                </button>
            </form>
        )
    }
}
