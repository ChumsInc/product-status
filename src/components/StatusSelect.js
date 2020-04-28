import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from './Select';

class StatusSelect extends Component {
    static propTypes = {
        statusList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            code: PropTypes.string,
            description: PropTypes.string,
        })),
        value: PropTypes.string.isRequired,
        field: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        allowSelectAll: PropTypes.bool,
        allowNoStatus: PropTypes.bool,
        allowWildCardStatus: PropTypes.bool,
    };

    static defaultProps = {
        statusList: [],
        value: '',
        field: 'statusCode',
        allowSelectAll: false,
        allowNoStatus: false,
        allowWildCardStatus: false,
    };

    render() {
        const {statusList, field, value, onChange, allowSelectAll, allowNoStatus, allowWildCardStatus,
            ...rest} = this.props;

        const filteredStatusList = statusList.filter(status => {
            return allowWildCardStatus || /[^%]$/.test(status.code)
        });

        return (
            <Select value={value} field={field} onChange={onChange} {...rest}>
                {!allowSelectAll && <option value="">Select Status</option>}
                {allowSelectAll && <option value="%">ALL</option>}
                {allowNoStatus && <option value="clear">Remove Item Status</option>}
                {filteredStatusList
                    .map(status => (
                    <option key={status.id}
                            value={status.code}>{status.code} - {status.description}</option>
                ))}
            </Select>
        );
    }
}

const mapStateToProps = (state) => {
    const {statusList} = state.app;
    return {statusList};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatusSelect) 
