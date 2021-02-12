import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from './Select';

const categorySort = (a, b) => (a.code || a.Category2) === (b.code || b.Category2)
    ? 0
    : ((a.code || a.Category2) > (b.code || b.Category2) ? 1 : -1);

class CategorySelect extends Component {
    static propTypes = {
        categories: PropTypes.arrayOf(PropTypes.shape({
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
        const {categories, field, value, onChange, ...rest} = this.props;

        return (
            <Select value={value} field={field} onChange={onChange} {...rest}>
                <option value="%">ALL</option>
                {categories
                    .sort(categorySort)
                    .map((cat, index) => (
                        <option key={cat.id || cat.Category2}
                                value={cat.code || cat.Category2}>
                            {cat.code || cat.Category2} - {cat.description}
                        </option>
                    ))}
            </Select>
        );
    }
}

const mapStateToProps = (state) => {
    const {categories} = state.app;
    return {categories};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect)
