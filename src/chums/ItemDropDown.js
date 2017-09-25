/**
 * Created by steve on 9/8/2016.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropDownInput from './DropDownInput';
import { fetchGET } from './fetch';

export default class ItemDropDown extends Component {
    minLength = 2;

    static propTypes = {
        company: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        minLength: PropTypes.number,
        options: PropTypes.string,
        loading: PropTypes.bool,
    };

    constructor() {
        super();
        this.state = {
            lookup: '',
            lookupResult: [],
            timer: null,
            loading: false,
            minLength: 2
        };
        this.doLookup = ::this.doLookup;
        this.setItem = ::this.setItem;
    }

    componentWillMount() {
        this.setState({minLength: this.props.minLength === undefined ? this.minLength : this.props.minLength});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({minLength: nextProps.minLength === undefined ? this.minLength : nextProps.minLength});
    }

    setItem(val) {
        if (val.target) {
            val = val.target.value;
        }
        if (val === '' && this.state.minLength > 0) {
            clearTimeout(this.state.timer);
            this.setState({
                lookupResult: [],
                lookup: '',
                timer: null,
                loading: false,
            });
            return;
        }
        clearTimeout(this.state.timer);
        const timer = setTimeout(this.doLookup, 350);
        this.setState({lookup: val, timer: timer});
        this.props.onChange(val);
    }

    doLookup() {
        if (this.state.lookup.length < this.state.minLength) {
            return;
        }
        const url = `/node/search/item/:company/:search`
            .replace(':company', encodeURIComponent(this.props.company || 'chums'))
            .replace(':search', encodeURIComponent(this.state.lookup || (this.state.minLength === 0 ? '.+' : '')))
            + (this.props.options === undefined ? '' : ('?' + this.props.options));
        fetchGET(url)
            .then(res => {
                this.setState({lookupResult: res.result});
            })
            .catch(err => {
                console.log('doLookup()',this.state.lookup, err.message);
            })
            .then(() => {
                this.setState({loading: false});
            });
        this.setState({loading: true});
    }

    static formatter(item) {
        return (
            <span><strong style={{display: 'inline-block', minWidth: '6em'}}>{item.ItemCode}</strong>{'  '}{item.ItemCodeDesc}</span>
        );
    }

    onSelectItem(item) {
        if (item === undefined) {
            return;
        }
        this.setState({
            lookup: item.ItemCode || ''
        }, () => {
            this.props.onSelect(item);
        });
    }


    render() {
        return (
            <DropDownInput placeholder="search" minLength={this.state.minLength}
                           value={this.state.lookup}
                           items={this.state.lookupResult}
                           loading={this.props.loading && this.state.loading}
                           formatter={ItemDropDown.formatter}
                           className="form-control"
                           onSelect={this.onSelectItem.bind(this)}
                           onChange={this.setItem}
            />
        )
    }
}
