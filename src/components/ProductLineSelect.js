import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from './Select';

class ProductLineSelect extends Component {
    static propTypes = {
        productLines: PropTypes.arrayOf(PropTypes.shape({
            ProductLine: PropTypes.string,
            ProductLineDesc: PropTypes.string,
            active: PropTypes.bool,
        })),
        value: PropTypes.string.isRequired,
        field: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        productLines: [],
        value: '',
        field: 'ProductLine',
    };

    render() {
        const {productLines, field, value, onChange} = this.props;

        return (
            <Select value={value} field={field} onChange={onChange}>
                <option value="%">ALL</option>
                {productLines
                    .filter(pl => pl.active)
                    .map(pl => (
                        <option key={pl.ProductLine}
                                value={pl.ProductLine}>{pl.ProductLine} - {pl.ProductLineDesc}</option>
                    ))}
            </Select>
        );
    }
}

const mapStateToProps = ({productLines}) => {
    return {productLines};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductLineSelect)
