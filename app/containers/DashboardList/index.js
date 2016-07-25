import React, { Component, PropTypes } from 'react';

import DashboardListItem from '../../components/DashboardItem';
import Preset from '../../components/DashboardItem/Preset';
import DashboardSearch from '../DashboardSearch';

import searchPresets from '../../utils/ShopifyConstants/search';

class DashboardList extends Component {
  static PropTypes = {
    displayParams: PropTypes.object.isRequired,
    listData: PropTypes.object.isRequired,
    onListItemClick: PropTypes.func.isRequired,
    onSearchQuery: PropTypes.func.isRequired,
    onChangeDisplay: PropTypes.func.isRequired,
    dataType: PropTypes.string.isRequired,
    isListFetching: PropTypes.bool,
    searchQuery: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      presetsMenuOpen: false
    };
  }

  onListItemClick = (uniqueID) => {
    this.props.onListItemClick(`${uniqueID}_${this.props.dataType}`); // eslint-disable-line
  }

  onPresetClick = (query) => {
    this.props.onSearchQuery(query);
  }

  generateListItem(data) {
    const { dataType } = this.props; //eslint-disable-line
    return (
      <DashboardListItem
        key={data.id}
        view={dataType}
        properties={data}
        onListItemClick={this.onListItemClick}
      />);
  }

  generateList = () => {
    if (this.props.listData) { //eslint-disable-line
      return this.props.listData.map((each) => { //eslint-disable-line
        return this.generateListItem(each);
      });
    }
    return null;
  }

  generatePresets() {
    return (
      <div className="search-presets">
        <div className="presets-desc">
          <span className="presets-title">Filter By</span>
        </div>
        <div className="presets" >
        {searchPresets[this.props.dataType].map((elem) => {
          return (
            <Preset
              {...elem}
              key={elem.name}
              onPresetClick={this.onPresetClick}
              currentQuery={this.props.searchQuery === elem.query}
            />); })}
          <span
            className="presets-dropdown-toggle icon icon-dot-3"
            onClick={() => { this.setState({ presetsMenuOpen: !this.state.presetsMenuOpen }); }}
            style={{ flex: 0.5 }}
          >
          </span>
        </div>
      </div>);
  }

  render() {
    const {
      dataType,
      onSearchQuery,
      searchQuery,
      onChangeDisplay,
      displayParams,
      isListFetching
    } = this.props;
    const list = (!isListFetching) ? this.generateList() :
      '';
    const presets = (searchPresets[dataType]) ? this.generatePresets() : null;

    return (
      <div className="pane search">

        <DashboardSearch dataType={dataType} search={onSearchQuery} />
        {presets}
        <div className="pane no-left">
          <ul className="list-group">
            {list}
          </ul>
        </div>
        <li className="list-group-item footer">
          <div
            className="btn-group footer"
            style={{ visibility: (searchQuery) ? 'hidden' : 'visible' }}
          >
            <div>
              <button
                className="btn btn-mini btn-default"
                id="prev"
                onClick={() => {
                  onChangeDisplay('prev');
                }}
                style={{
                  visibility: (displayParams &&
                  displayParams.pointer_value.offset === 0) ?
                  'hidden' :
                  'visible'
                }}
              >
                <span className="icon icon-left-dir"></span>
              </button>
              <button
                className="btn btn-mini btn-default"
                id="next"
                onClick={() => {
                  onChangeDisplay('next');
                }}
                style={{ visibility: (displayParams &&
                  displayParams.pointer_value.lastPage) ?
                  'hidden' :
                  'visible' }}
              >
                <span className="icon icon-right-dir"></span>
              </button>
            </div>
          </div>
        </li>
      </div>);
  }
}

export default DashboardList;
