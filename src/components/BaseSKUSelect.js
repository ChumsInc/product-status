import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from './Select';

class BaseSKUSelect extends Component {
    static propTypes = {
        baseSKUs: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            Category4: PropTypes.string,
            description: PropTypes.string,
        })),
        value: PropTypes.string.isRequired,
        field: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        baseSKUs: [],
        value: '',
        field: 'baseSKU',
    };

    render() {
        const {baseSKUs, field, value, onChange} = this.props;

        return (
            <Select value={value} field={field} onChange={onChange}>
                <option value="%">ALL</option>
                {baseSKUs.map(sku => (
                    <option key={sku.id || sku.Category4}
                            value={sku.Category4}>{sku.Category4} - {sku.description}</option>
                ))}
            </Select>
        );
    }
}

const mapStateToProps = ({baseSKUs}) => {
    return {baseSKUs};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BaseSKUSelect)
