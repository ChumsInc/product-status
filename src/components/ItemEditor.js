/**
 * Created by steve on 2/9/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import FormGroup from "./FormGroup";
import {clearSelections, saveSelected} from '../actions/items';
import StatusSelect from "../ducks/filters/ProductStatusSelect";
import ItemFilter from "./ItemFilter";
import FilterButtons from "./FilterButtons";

class ItemEditor extends Component {
    static propTypes = {
        selectedItemCount: PropTypes.number,
        loading: PropTypes.bool,

        clearSelections: PropTypes.func.isRequired,
        saveSelected: PropTypes.func.isRequired,
    };

    static defaultProps = {
        loading: false,
        selectedItemCount: 0,
    };

    state = {
        newItemStatus: '',
    };

    constructor(props) {
        super(props);
        this.onSaveSelected = this.onSaveSelected.bind(this);
    }


    onSaveSelected() {
        const {newItemStatus} = this.state;
        this.props.saveSelected(newItemStatus);
    }

    render() {
        const {newItemStatus} = this.state;
        const {selectedItemCount} = this.props;


        return (
            <div>
                <div className="row row--filter mb-3">
                    <ItemFilter />
                    <FilterButtons allowFilterSelected={!!selectedItemCount}/>
                    <FormGroup label="New Status">
                        <StatusSelect value={newItemStatus}
                                      onChange={(ev) => this.setState({newItemStatus: ev.target.value})} />
                    </FormGroup>
                    <FormGroup>
                        <button type="button"
                                onClick={this.onSaveSelected}
                                disabled={selectedItemCount === 0 || newItemStatus === ''}
                                className="btn btn-sm btn-primary">
                            Update Items ({selectedItemCount})
                        </button>
                    </FormGroup>
                    <FormGroup>
                        <button className="btn btn-sm btn-outline-secondary"
                                onClick={this.props.clearSelections}>
                            Clear Selections
                        </button>
                    </FormGroup>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {list, loading} = state.items;
    const selectedItemCount = list.filter(item => !!item.selected).length;
    return {loading, selectedItemCount};
};

const mapDispatchToProps = {
    clearSelections,
    saveSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemEditor);
