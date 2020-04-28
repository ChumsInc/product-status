import React from 'react';
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
        <FormGroup label="Show">
            <div className="btn-group btn-group-sm ml-1">
                <button type="button" className={classNames('btn', btnOnHand)}
                        onClick={toggleShowOnlyOnHand}>
                    Only On Hand
                </button>
                {!!allowFilterSelected && !!isAdmin && (
                    <button type="button" className={classNames('btn', btnOnlySelected)}
                            onClick={toggleShowOnlySelected}>
                        Only Selected
                    </button>
                )}
            </div>
        </FormGroup>
    );
}

export default connect(
    mapStateToProps,
    {toggleShowOnlyOnHand, toggleShowOnlySelected}
)(FilterButtons);
