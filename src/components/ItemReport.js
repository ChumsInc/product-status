/**
 * Created by steve on 2/9/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import FormGroup from "./FormGroup";
import FormGroupTextInput from "./FormGroupTextInput";
import ItemList, {itemListFields} from "./ItemList";


export default class ItemReport extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        loading: PropTypes.bool,
    };

    static defaultProps = {
        items: [],
        loading: false,
    };

    state = {
        rowsPerPage: 10,
        page: 1,
        filter: '',
        hideZeroOnHand: true,
    };

    constructor(props) {
        super(props);
        this.onToggleHideZeroOnHand = this.onToggleHideZeroOnHand.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
    }

    onChangeFilter({value}) {
        this.setState({filter: value});
    }


    onToggleHideZeroOnHand() {
        const hideZeroOnHand = !this.state.hideZeroOnHand;
        this.setState({hideZeroOnHand});
    }


    render() {
        const { filter, hideZeroOnHand, } = this.state;

        const filterOnHandButtonClassName = {
            'btn-warning': hideZeroOnHand,
            'btn-outline-secondary': !hideZeroOnHand
        };
        
        return (
            <div>
                <div className="form-inline mb-3">
                    <FormGroupTextInput value={filter} onChange={this.onChangeFilter} label="Filter" />
                    <FormGroup>
                        <button type="button" className={classNames('btn btn-sm', filterOnHandButtonClassName)}
                                onClick={this.onToggleHideZeroOnHand}>
                            {hideZeroOnHand ? 'Show All' : 'Show On Hand'}
                        </button>
                    </FormGroup>
                </div>
                <ItemList filter={filter} fields={itemListFields} hideZeroOnHand={hideZeroOnHand} />
            </div>
        )
    }
}
