/**
 * Created by steve on 9/8/2016.
 */

import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {buildPath, fetchGET} from '../fetch';
import TypeaheadInput from "./TypeaheadInput";
import classNames from 'classnames';

export const PATH_SEARCH_ITEMS = '/api/search/item/:company/:search';

const MIN_LENGTH = 2;


const DropDownItem = ({itemCode = '', itemCodeDesc = ''}) => (
    <div className="item-dropdown-item">
        <div className="item-code">{itemCode}</div>
        <div className="item-description">{itemCodeDesc}</div>
    </div>
);

export default class ItemDropDown extends Component {
    static propTypes = {
        company: PropTypes.string.isRequired,
        field: PropTypes.string,
        value: PropTypes.string,
        minLength: PropTypes.number,
        queryOptions: PropTypes.string,
        maxItems: PropTypes.number,

        onChange: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
    };

    static defaultProps = {
        company: 'chums',
        minLength: MIN_LENGTH,
        queryOptions: '',
        maxItems: 20,
    };

    state = {
        lookupResult: [],
        timer: null,
        loading: false,
    };

    constructor(props) {
        super(props);
        this.doLookup = this.doLookup.bind(this);
        this.onChange = this.onChange.bind(this);
        this.timer = null;
        this.onSelectItem = this.onSelectItem.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {value, minLength} = this.props;
        if (value !== prevProps.value) {
            clearTimeout(this.timer);
            if (value.length >= minLength) {
                this.timer = setTimeout(this.doLookup, 350);
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    onChange({field, value}) {
        const {minLength, onChange} = this.props;
        clearTimeout(this.timer);
        if (value === '' && minLength > 0) {
            this.setState({
                lookupResult: [],
                loading: false,
            });
            return;
        }
        onChange({field, value});
    }

    doLookup() {
        const {loading} = this.state;
        const {minLength, queryOptions, company, value} = this.props;
        if (loading) {
            return;
        }
        if (value.length < minLength) {
            return;
        }

        try {
            //check invalid regexp
            const test = new RegExp(value);
        } catch(err) {
            return;
        }

        this.setState({loading: true});
        const search = minLength === 0 && value === ''
            ? '.+'
            : value;
        const url = buildPath(PATH_SEARCH_ITEMS + `?${queryOptions}`, {company, search},
            true, 60000);
        fetchGET(url)
            .then(res => {
                this.setState({lookupResult: res.result, loading: false}, () => {
                    // handle the lookup being changed while loading
                    if (this.props.value !== value && this.props.value) {
                        this.doLookup();
                    }
                });
            })
            .catch(err => {
                console.log('doLookup()', value, err.message);
            })
            .then(() => {
                this.setState({loading: false});
            });
    }

    onSelectItem(item) {
        if (item === undefined) {
            return;
        }
        this.props.onSelect(item);
    }


    render() {
        const {lookupResult, loading} = this.state;
        const {minLength, field, value} = this.props;
        const inputClassNames = {
            'form-control': true,
        };
        try {
            const test = new RegExp(value);
        } catch(err) {
            inputClassNames['text-danger'] = true
        }

        return (
            <TypeaheadInput placeholder="search" minLength={minLength}
                            itemRender={({ItemCode, ItemCodeDesc}) => (
                                <DropDownItem itemCode={ItemCode} itemCodeDesc={ItemCodeDesc}/>
                            )}
                            value={value} field={field}
                            data={lookupResult}
                            loading={loading}
                            className={classNames(inputClassNames)}
                            onSelect={this.onSelectItem}
                            onChange={this.onChange}
            />
        )
    }
}

