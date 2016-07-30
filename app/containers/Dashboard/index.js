import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchDataAction, displayDataAction } from './actions';
import { navigateTo } from '../DashboardNavigation/actions';
import { checkCredentials } from '../App/actions';
import { shallowMerge } from '../../utils/sharedHelpers';

import AppHeader from '../AppHeader';
import DashboardNavigation from '../DashboardNavigation';
import DashboardList from '../DashboardList';
import DashboardDetail from '../DashboardDetail';


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayParams: {

      }
    };
  }


  componentDidMount() {
    /*
    TODO: Remove this when application is no longer reloaded by HMR
    Take the code inside the then statement out of it and just let the app auth
    itself everytime, we don't expect people to reload the app unless using
    the built in reload button

    TODO: The fetchData Action shouldn't be here, this should be in inital set up,
    this is just the development env which fetches data from api on load
    */

    this.props.actions.auth.checkCredentials()
    .then(() => {
      const { dashboardMainReducer } = this.props.state;
      const dataType = dashboardMainReducer.get('dataType');
      const { fetchDataAction, displayDataAction } = this.props.actions.data; // eslint-disable-line


      const originalParams = {
        dataType
      }; // when the component is being mounted, we have a default view

      this.updateViewParams(originalParams).then(() => {
        displayDataAction(this.state.displayParams.dataType, this.state.displayParams);
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  // Handles Changing search params and pagination
  onChangeListDisplay = (data) => {
    const { displayParams } = this.state;

    this.props.actions.data.displayDataAction(displayParams.dataType,
     displayParams, data, displayParams.query);
  }

  onListItemClick = (data) => {
    console.log(data);
  }

  onNavigationItemClick = (nextView) => {
    this.props.actions.navigation.navigateTo(nextView)
    .then(() => {
      const newParams = shallowMerge(this.state.displayParams, { dataType: nextView });
      this.updateViewParams(newParams)
      .then(() => {
          this.props.actions.data.displayDataAction(this.state.displayParams.dataType, this.state.displayParams); //eslint-disable-line
        // when clicking on a new view, we will display new data obviously
      });
    });
  }

  onSearchQuery = (query) => {
    const newParams = shallowMerge(this.state.displayParams, { query });
    this.updateViewParams(newParams)
    .then(() => {
      this.props.actions.data
      .displayDataAction(
        this.state.displayParams.dataType,
        this.state.displayParams,
        null,
        query);
    });
  }

  // Helper function to update View Params in a promise
  updateViewParams = (newParams) => {
    return new Promise((resolve) => {
      resolve(this.setState({ displayParams: newParams }));
    });
  }


  /* Application Infrastructure

  DashboardNavigation -> Determine which data source to show
  DashboardList -> Display list of data with filtering and SQL querying
  DashboardDetail -> Pull from redux store to determine which data to display/
                    pull further information from Shopify Api
  */

  render() {
    const storeName = this.props.state.mainAppReducer.getIn(['data', 'storeName']);
    const dataFetched = this.props.state.dashboardMainReducer.get('dataFetched');
    const isFetching = this.props.state.dashboardMainReducer.get('isFetching');
    const view = this.props.state.navigationReducer.get('view');
    const { dataType, query } = this.state.displayParams;

    return (
      <AppHeader>
        <div className="window-content">
          <div className="pane-group">
            <DashboardNavigation
              storeName={storeName}
              currentView={view}
              onClick={this.onNavigationItemClick}
            />
            <DashboardList
              listData={dataFetched}
              dataType={dataType}
              isListFetching={isFetching}
              displayParams={this.state.displayParams[`${dataType}_pointer`]}
              searchQuery={query}
              onListItemClick={this.onListItemClick}
              onChangeDisplay={this.onChangeListDisplay}
              onSearchQuery={this.onSearchQuery}
            />
            <DashboardDetail />
          </div>
        </div>
      </AppHeader>);
  }

}


function mapStateToProps(state) {
  return {
    state: {
      mainAppReducer: state.get('mainAppReducer'),
      dashboardMainReducer: state.get('dashboardMainReducer'),
      navigationReducer: state.get('navigationReducer')
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      data: bindActionCreators({ fetchDataAction, displayDataAction }, dispatch),
      navigation: bindActionCreators({ navigateTo }, dispatch),
      auth: bindActionCreators({ checkCredentials }, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
