import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from './Select';

class CollectionSelect extends Component {
    static propTypes = {
        collections: PropTypes.arrayOf(PropTypes.shape({
            Category3: PropTypes.string,
        })),
        value: PropTypes.string.isRequired,
        field: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        collections: [],
        value: '',
        field: 'WarehouseCode',
    };

    render() {
        const {collections, field, value, onChange, ...rest} = this.props;

        return (
            <Select value={value} field={field} onChange={onChange} {...rest}>
                <option value="%">ALL</option>
                {collections.map(c => (
                    <option key={c.Category3} value={c.Category3}>{c.Category3}</option>
                ))}
            </Select>
        );
    }
}

const mapStateToProps = (state) => {
    const {collections} = state.app;
    return {collections};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionSelect)
