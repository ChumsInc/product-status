/**
 * Created by steve on 9/8/2016.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { KEYMAP } from './keymap';

export default class DropDownInput extends Component {
    static propTypes = {
        items: PropTypes.any.isRequired,
        minLength: PropTypes.number,
        onChange: PropTypes.func,
        onSelect: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.string,
        loading: PropTypes.bool,
        formatter: PropTypes.func,
    };


    constructor() {
        super();
        this.state = {
            index: 0,
            visible: false,
            value: ''
        };
    }

    componentWillMount() {
        if (this.props.value !== undefined) {
            this.setState({value: this.props.value});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== undefined) {
            this.setState({value: nextProps.value});
        }
    }


    onChange(ev) {
        let value = ev.target.value;
        let visible = value.length >= (this.props.minLength || 0);
        this.setState({value, visible});
        this.props.onChange(value);
    }

    setIndex(index) {
        if (index < 0) {
            index = 0;
        } else if (index >= this.props.items.length) {
            index = this.props.items.length - 1;
        }
        this.setState({index, visible: true});
    }

    noop() {}

    onKeyup(ev) {
        ev.preventDefault();
        switch (KEYMAP[ev.which]) {
        case 'enter':
            return this.onSelect();
        case 'escape':
            return this.onBlur();
        case 'up':
            return this.setIndex(this.state.index - 1);
        case 'down':
            if (!this.state.visible && this.props.items.length >= (this.props.minLength || 0)) {
                this.props.onChange(this.state.value);
                return this.setIndex(0);
            }
            return this.setIndex(this.state.index + 1);
        }
    }

    static formatter(str) {
        return String(str);
    }

    onSelect() {
        const selected = this.props.items[this.state.index];
        this.props.onSelect(selected);
        this.setState({visible: false});
    }

    onClick(index) {
        const selected = this.props.items[index];
        this.props.onSelect(selected);
        this.setState({visible: false});
    }

    onBlur() {
        setTimeout(() => {
            this.setState({visible: false});
        }, 250);

    }

    render() {
        const dropDownStyle = {
            display: 'inline-block',
            position: 'relative',
            verticalAlign: 'middle',
        };


        // console.log(this.props.loading);
        let formatter = this.props.formatter || DropDownInput.formatter;
        const items = (this.props.items || [])
            .map((item, index) => {
                const str = formatter(item);
                const active = index === this.state.index ? 'active' : '';
                return (
                    <li key={index} className={active}>
                        <a style={{cursor: 'pointer'}}
                              onClick={this.onClick.bind(this, index)}
                              onTouchEnd={this.onClick.bind(this, index)}>{str}</a>
                    </li>
                )
            });

        if (this.props.loading) {
            let progressbar = (
                <li key="progress-bar">
                    <ProgressBar visible={true} active={true} striped={true} />
                </li>
            );
            items.unshift(progressbar);
        }
        return (
            <div style={dropDownStyle} className="open">
                <input type="text" placeholder={this.props.placeholder || ''} className={this.props.className || ''}
                       value={this.state.value}
                       onKeyUp={this.onKeyup.bind(this)}
                       onChange={this.onChange.bind(this)}
                       onBlur={this.onBlur.bind(this)}
                />
                <ul className="dropdown-menu" style={{display: this.state.visible ? 'block' : 'none'}}>{items}</ul>
            </div>
        )
    }
}