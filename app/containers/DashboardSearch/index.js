import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fuzzy from 'fuzzy';
import Autosuggest from 'react-autosuggest';

import { getAutofillFieldsAction } from './actions';
import searchConstants from './searchConstants';


const initialState = {
  searchQuery: '',
  searchbarFocus: false,
  searchbarSelector: 0,
  suggestions: undefined
};

function getSuggestions(data, fields) {
  return fuzzy.filter(data.replace(/ /g, '')
              .split(/AND|WHERE|SORT|SORT BY/i).pop()
              , fields);
}

function selectDropdown(currentState, newData) {
  const filtered = currentState.split(' ');
  filtered.splice(filtered.length - 1, 1, newData);
  return filtered.join(' ');
}

class DashboardSearch extends Component {
  static PropTypes = {
    actions: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    dataType: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.dataType !== this.props.dataType) {
      this.setState(initialState);
      this.props.actions.searchActions.getAutofillFieldsAction(newProps.dataType);
    }
  }

  onSearchInput = (newValue) => {
    this.setState({ searchQuery: newValue,
                    suggestions: getSuggestions(newValue, this.props.state.fields) });
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
            getSuggestionValue={function (sug) { return sug.string; }}
            renderSuggestion={(sug) => { return <span>{sug.string}<span className="search-description"> {searchConstants[this.props.dataType][sug.string]}</span></span>; }}
            inputProps={inputProps}
            theme={{ input: 'form-control', container: { display: 'flex', flex: 10 }, suggestionsContainer: 'suggestions', suggestionFocused: { backgroundColor: '#3187e1', color: 'white' }, suggestion: { padding: '5px 0px 5px 40px' } }}
            onSuggestionSelected={(event, { suggestionValue }) => {
              this.setState({ searchQuery: selectDropdown(this.state.searchQuery, suggestionValue) });
            }}
            onSubmit={this.onSearch}
          />
          <span className="icon icon-search" onClick={this.onSearch} />
        </div>
      </li>);
  }
}


function mapStateToProps(state) {
  return {
    state: state.searchReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      searchActions: bindActionCreators({ getAutofillFieldsAction }, dispatch)
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardSearch);
