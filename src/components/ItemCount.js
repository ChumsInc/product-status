import React from 'react';
import {connect} from 'react-redux';
import FormGroupTextInput from "./FormGroupTextInput";

function mapStateToProps({items}) {
    return {count: items.length};
}

const ItemCount = ({count}) => {
    return (
        <FormGroupTextInput onChange={() => {}} label="Items" readOnly disabled value={count} />
    );
}

export default connect(
    mapStateToProps,
)(ItemCount);
