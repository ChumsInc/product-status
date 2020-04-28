import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from './Select';

class WarehouseSelect extends Component {
    static propTypes = {
        warehouses: PropTypes.arrayOf(PropTypes.shape({
            WarehouseCode: PropTypes.string,
            WarehouseDesc: PropTypes.string,
        })),
        value: PropTypes.string.isRequired,
        field: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        warehouses: [],
        value: '',
        field: 'WarehouseCode',
    };

    render() {
        const {warehouses, field, value, onChange} = this.props;

        return (
            <Select value={value} field={field} onChange={onChange}>
                <option value="%">ALL</option>
                {warehouses.map(warehouse => (
                    <option key={warehouse.WarehouseCode}
                            value={warehouse.WarehouseCode}>{warehouse.WarehouseCode} - {warehouse.WarehouseDesc}</option>
                ))}
            </Select>
        );
    }
}

const mapStateToProps = (state) => {
    const {warehouses} = state.app;
    return {warehouses};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseSelect) 
