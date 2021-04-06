import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import classNames from "classnames";
import FormGroup from "./FormGroup";
import {toggleShowOnlyOnHand, toggleShowOnlySelected} from '../actions/items';

function mapStateToProps(state) {
    const {isAdmin} = state.app;
    const {hideZeroOnHand, showOnlySelected} = state.items;
    return {hideZeroOnHand, showOnlySelected, isAdmin};
}

const FilterButtons = ({hideZeroOnHand, showOnlySelected,
                           allowFilterSelected = false, isAdmin,
                           toggleShowOnlyOnHand, toggleShowOnlySelected}) => {
    const btnOnHand = {
        'btn-warning': hideZeroOnHand,
        'btn-outline-secondary': !hideZeroOnHand,
    };
    const btnOnlySelected = {
        'btn-info': showOnlySelected,
        'btn-outline-info': !showOnlySelected
    };
    return (
        <Fragment>
            <FormGroup label="Available">
                <div className="btn-group btn-group-sm me-3">
                    <input type="radio" className="btn-check" name="btn-show-onhand" id="ps-list--show-onhand"
                           checked={hideZeroOnHand} onChange={toggleShowOnlyOnHand} />
                    <label className={classNames('btn', {'btn-outline-secondary': !hideZeroOnHand, 'btn-secondary': hideZeroOnHand})}
                           htmlFor="ps-list--show-onhand">Show On Hand</label>

                    <input type="radio" className="btn-check" name="btn-show-onhand" id="ps-list--show-all"
                           checked={!hideZeroOnHand} onChange={toggleShowOnlyOnHand} />
                    <label className={classNames('btn', {'btn-outline-secondary': hideZeroOnHand, 'btn-secondary': !hideZeroOnHand})}
                           htmlFor="ps-list--show-all">Show All</label>

                </div>
            </FormGroup>
            {!!allowFilterSelected && !!isAdmin && (
                <FormGroup label="Selections">
                    <div className="btn-group btn-group-sm me-3">
                        <input type="radio" className="btn-check" id="ps-list--selections-show-selected"
                               checked={showOnlySelected} onChange={toggleShowOnlySelected} />
                        <label className={classNames('btn', {'btn-outline-primary': !showOnlySelected, 'btn-primary': showOnlySelected})}
                               htmlFor="ps-list--selections-show-selected">Show Selected</label>

                        <input type="radio" className="btn-check" id="ps-list--selections-show-all"
                               checked={!showOnlySelected} onChange={toggleShowOnlySelected} />
                        <label className={classNames('btn', {'btn-outline-primary': showOnlySelected, 'btn-primary': !showOnlySelected})}
                               htmlFor="ps-list--selections-show-all">Show All</label>
                    </div>
                </FormGroup>
            )}

        </Fragment>
    );
}

export default connect(
    mapStateToProps,
    {toggleShowOnlyOnHand, toggleShowOnlySelected}
)(FilterButtons);
