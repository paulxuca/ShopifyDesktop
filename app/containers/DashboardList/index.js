import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DashboardListItem from '../../components/DashboardItem';
import Preset from '../../components/DashboardItem/Preset';
import Dropdown from '../../components/Dropdown';
import DashboardSearch from '../DashboardSearch';

import { selectQueries } from './selectors';
import { createStructuredSelector } from 'reselect';

import * as dashboardActions from './actions';
import searchPresets from '../../utils/ShopifyConstants/search';

class DashboardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presetsMenuOpen: false,
      presetsGenerated: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.dataType !== this.props.dataType) {
      this.props.actions.dashboard.fetchQueryAction(newProps.dataType);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.listData !== this.props.listData) {
      return true;
    } else if (nextState.presetsMenuOpen !== this.state.presetsMenuOpen) {
      return true;
    } else if (nextProps.searchQuery !== this.props.searchQuery) {
      return true;
    }
    return false;
  }


  onListItemClick = (uniqueID) => {
    this.props.onListItemClick(`${uniqueID}_${this.props.dataType}`); // eslint-disable-line
  }

  onPresetClick = (query) => {
    this.props.onSearchQuery(query);
  }

  generateListItem = (data) => {
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
    if (this.props.listData) {
      return this.props.listData.map((each) => {
        return this.generateListItem(each);
      });
    }
    return null;
  }

  generateUserPresets = () => {
    const listNodes = [];
    const { queries } = this.props;
    for (let key in this.props.queries) { //eslint-disable-line
      listNodes.push(
        <Preset
          onPresetClick={this.onPresetClick}
          name={queries[key].name}
          key={queries[key].name}
          query={queries[key].query}
          alignment="flex-start"
        />);
    }
    return listNodes;
  }

  generatePresets = () => {
    return (
      <div className="search-presets">
        <div className="presets-desc">
          <div className="presets-title"><span style={{ marginLeft: 20 }}>Filter By</span></div>
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
          <Dropdown active={this.state.presetsMenuOpen}>
            {this.generateUserPresets()}
          </Dropdown>
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

DashboardList.PropTypes = {
  displayParams: PropTypes.object.isRequired,
  listData: PropTypes.object.isRequired,
  onListItemClick: PropTypes.func.isRequired,
  onSearchQuery: PropTypes.func.isRequired,
  onChangeDisplay: PropTypes.func.isRequired,
  dataType: PropTypes.string.isRequired,
  isListFetching: PropTypes.bool,
  searchQuery: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
  queries: selectQueries()
});

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      dashboard: bindActionCreators(dashboardActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardList);
