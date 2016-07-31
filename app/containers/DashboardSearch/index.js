import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

import * as searchActions from './actions';
import searchConstants from './searchConstants';
import { getSuggestions, selectDropdown } from './helpers';

import Dropdown from '../../components/Dropdown';


const initialState = {
  searchQuery: '',
  searchbarFocus: false,
  searchbarSelector: 0,
  suggestions: undefined,
  querySaveDropdownOpen: false,
  querySaveName: ''
};

class DashboardSearch extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.dataType !== this.props.dataType) {
      this.setState(initialState);
      this.props.actions.search.getAutofillFieldsAction(newProps.dataType);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onSearchInput = (newValue) => {
    if (this.state.querySaveDropdownOpen) this.setState({ querySaveDropdownOpen: false });
    this.setState({ searchQuery: newValue,
                    suggestions: getSuggestions(newValue, this.props.state.get('fields')) });
  }

  onSearch = (event) => {
    event.preventDefault();
    this.props.search(this.state.searchQuery);
  }

  render() {
    const suggestions = this.state.suggestions ? this.state.suggestions : [];
    // const searchPlaceholder = (this.props.dataType) ? this.props.dataType : '';
    const inputProps = {
      value: this.state.searchQuery,  // `inputValue` usually comes from application state
      onChange: (e, { newValue, method }) => {
        if (method === 'type') this.onSearchInput(newValue);
      }, // called when input value changes
      type: 'search',
      placeholder: `Search for ${this.props.dataType || ''}...`
    };

    return (
      <li className="list-group-item header">
        <div className="search-input">
          <Autosuggest
            suggestions={suggestions}
            getSuggestionValue={(sug) => { return sug.string; }}
            renderSuggestion={(sug) => {
              return (
                <span>
                  {sug.string}
                  <span className="search-description">
                    {` ${searchConstants[this.props.dataType][sug.string] || ''}`}
                  </span>
                </span>);
            }}
            inputProps={inputProps}
            theme={{ input: 'form-control',
                     container: 'suggestion-container',
                     suggestionsContainer: 'suggestions',
                     suggestionFocused: 'suggestion-container-focused',
                     suggestion: 'suggestion-container-suggestion' }}
            onSuggestionSelected={(event, { suggestionValue }) => {
              this.setState({ searchQuery: selectDropdown(this.state.searchQuery,
              suggestionValue) });
            }}
            onSubmit={this.onSearch}
          />
          <span className="icon icon-search" onClick={this.onSearch} />
          <span
            className="icon icon-pencil"
            onClick={() => {
              this.setState({
                querySaveDropdownOpen: !this.state.querySaveDropdownOpen
              }); }}
          />
          <Dropdown active={this.state.querySaveDropdownOpen}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.props.actions.search.saveQueryAction(this.state.searchQuery, this.props.dataType, this.state.querySaveName);
              }}
            >
              <input
                value={this.state.querySaveName}
                onInput={(e) => { this.setState({ querySaveName: e.target.value }); }}
                placeholder="Name your query!"
                className="form-control"
              />
              <button className="styled-btn">Save</button>
            </form>
          </Dropdown>
        </div>
      </li>);
  }
}

DashboardSearch.PropTypes = {
    actions: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    dataType: PropTypes.string
}


function mapStateToProps(state) {
  return {
    state: state.get('searchReducer')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      search: bindActionCreators(searchActions, dispatch)
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardSearch);
