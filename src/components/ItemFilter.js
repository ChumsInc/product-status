import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../actions/items';
import FormGroupTextInput from "./FormGroupTextInput";

function mapStateToProps(state) {
    const {filter} = state.items;
    return {filter};
}

const ItemFilter = ({filter, setFilter}) => {
    return (
        <FormGroupTextInput value={filter} onChange={({value}) => setFilter(value)} label="Filter" id="if-filter"/>
    );
}

export default connect(
    mapStateToProps,
    {setFilter}
)(ItemFilter);
