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

    this.props.actions.authActions.checkCredentials()
    .then(() => {
      const { accessToken, storeName } = this.props.state.mainAppReducer.data;
      const { isFetching, dataType } = this.props.state.dashboardMainReducer;
      const { fetchDataAction, displayDataAction } = this.props.actions.dataActions; // eslint-disable-line


      if (accessToken &&
        storeName &&
        !isFetching) fetchDataAction(accessToken, storeName);

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

    this.props.actions.dataActions.displayDataAction(displayParams.dataType,
     displayParams, data, displayParams.query);
  }

  onListItemClick = (data) => {
    console.log(data);
  }

  onNavigationItemClick = (nextView) => {
    this.props.actions.navigationActions.navigateTo(nextView)
    .then(() => {
      const newParams = shallowMerge(this.state.displayParams, { dataType: nextView });
      this.updateViewParams(newParams)
      .then(() => {
          this.props.actions.dataActions.displayDataAction(this.state.displayParams.dataType, this.state.displayParams); //eslint-disable-line
        // when clicking on a new view, we will display new data obviously
      });
    });
  }

  onSearchQuery = (query) => {
    const newParams = shallowMerge(this.state.displayParams, { query });
    this.updateViewParams(newParams)
    .then(() => {
      this.props.actions.dataActions
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
    const { storeName } = this.props.state.mainAppReducer.data;
    const { dataFetched, isFetching } = this.props.state.dashboardMainReducer;
    const { view } = this.props.state.navigationReducer;
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
      mainAppReducer: state.mainAppReducer,
      dashboardMainReducer: state.dashboardMainReducer,
      navigationReducer: state.navigationReducer
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      dataActions: bindActionCreators({ fetchDataAction, displayDataAction }, dispatch),
      navigationActions: bindActionCreators({ navigateTo }, dispatch),
      authActions: bindActionCreators({ checkCredentials }, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
