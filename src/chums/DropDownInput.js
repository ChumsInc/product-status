/**
 * Created by steve on 9/8/2016.
 */

import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../components/ProgressBar';
import { KEYMAP } from './keymap';
import TextInput from '../components/TextInput';
import classNames from 'classnames';

const noop = () => {};

export const MAX_DROPDOWN_INPUT_ITEMS = 20;
/**
 *
 * @param {boolean} active
 * @param {Number} index
 * @param {function} onClick
 * @param {String} text
 * @return {*}
 * @constructor
 */
export const DropDownItem = ({active, index, onClick, text}) => (
    <li className={classNames('menu-item', {active})}
        onClick={() => onClick(index)}
        onTouchEnd={() => onClick(index)}>
        {text}
    </li>
);

export default class DropDownInput extends Component {
    static propTypes = {
        value: PropTypes.string,
        field: PropTypes.string,
        items: PropTypes.any.isRequired,
        minLength: PropTypes.number,
        placeholder: PropTypes.string,
        className: PropTypes.string,
        loading: PropTypes.bool,
        maxItems: PropTypes.number,

        onChange: PropTypes.func,
        onSelect: PropTypes.func.isRequired,
        formatter: PropTypes.func,
    };

    static defaultProps = {
        value: '',
        field: '',
        items: [],
        formatter: DropDownInput.formatter,
        minLength: 0,
        placeholder: '',
        className: '',
        loading: false,
        maxItems: MAX_DROPDOWN_INPUT_ITEMS,
    };

    state = {
        index: 0,
        page: 0,
        visible: false,
    };

    constructor(props) {
        super(props);
        this.timer = null;
        this.ref = createRef();
        this.onChange = this.onChange.bind(this);
        this.setIndex = this.setIndex.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.onClickOutside);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {value, minLength, loading, items} = this.props;

        // const visible = prevState.visible || loading;
        // if (loading && !this.state.visible) {
        //     this.setState({visible: true, index: 0});
        // }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        document.removeEventListener('click', this.onClickOutside);
    }

    onClickOutside(ev) {
        // if (!this.ref.current.contains(ev.target)) {
        //     return;
        // }
        const isInside = this.ref.current.contains(ev.target);
        if (this.state.visible && !isInside) {
            this.showDropdown(false);
        }
    }

    showDropdown(visible, callback = noop) {
        if (visible != this.state.visible) {
            document.removeEventListener('click', this.onClickOutside);
            if (visible) {
                document.addEventListener('click', this.onClickOutside);
            }
            this.setState({visible}, callback);
        } else {
            callback();
        }
    }


    onChange({field, value}) {
        let visible = value.length >= this.props.minLength;
        this.showDropdown(visible, () => {
            this.props.onChange({field, value});
        });
    }

    setIndex(index) {
        const {items, maxItems} = this.props;
        if (index < 0) {
            index = 0;
        } else if (index >= items.length) {
            index = items.length - 1;
        }
        const page = Math.floor(index / maxItems);
        this.showDropdown(true, () => this.setState({index, page}));
    }


    onKeyup(ev) {
        const {visible, index} = this.state;
        const {items, field, minLength, value} = this.props;
        switch (KEYMAP[ev.which]) {
        case 'enter':
            if (!visible) {
                return;
            }
            ev.preventDefault();
            ev.stopPropagation();
            return this.onSelect();
        case 'escape':
            ev.preventDefault();
            return this.onBlur();
        case 'up':
            ev.preventDefault();
            return this.setIndex(index - 1);
        case 'down':
            ev.preventDefault();
            if (!visible && items.length >= minLength) {
                this.onChange({field, value});
                return this.setIndex(0);
            }
            return this.setIndex(index + 1);
        }
    }

    static formatter(str) {
        return String(str);
    }

    onSelect() {
        const selected = this.props.items[this.state.index];
        this.props.onSelect(selected);
        this.showDropdown(false);
    }

    onClick(index) {
        const selected = this.props.items[index];
        this.props.onSelect(selected);
        this.showDropdown(false);
    }

    onBlur(ev) {
        console.log(this.node);
        // this.timer = setTimeout(() => {
        //     this.setState({visible: false});
        // }, 250);
    }

    onClickNext(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const {index} = this.state;
        const {maxItems} = this.props;
        this.setIndex(index + maxItems);
    }

    onClickPrev(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const {index} = this.state;
        const {maxItems} = this.props;
        this.setIndex(index - maxItems);
    }

    render() {
        const dropDownStyle = {
            display: 'inline-block',
            position: 'relative',
            verticalAlign: 'middle',
        };
        const {index, visible, page} = this.state;
        const {items, formatter, loading, placeholder, className, value, field, maxItems} = this.props;
        const pages = Math.floor(items.length / maxItems);


        return (
            <div style={dropDownStyle} className="open" ref={this.ref}>
                <TextInput value={value} field={field} placeholder={placeholder} className={className}
                           onKeyDown={this.onKeyup} onChange={this.onChange}/>
                {visible && <ul className="dropdown-menu" style={{display: 'block'}}>
                    {loading && <li><ProgressBar striped={true} style={{height: '5px'}}/></li>}
                    {page > 0 && <li className="menu-item" onClick={this.onClickPrev}>...</li>}
                    {items
                        .filter((item, i) => Math.floor(i / maxItems) === page)
                        .map((item, i) => (
                        <DropDownItem key={i} active={index % maxItems === i} index={i + page * maxItems    } onClick={this.onClick}
                                      text={formatter(item)} />
                    ))}
                    {page < pages && <li className="menu-item" onClick={this.onClickNext}>...</li>}
                </ul>}
            </div>
        )
    }
}
