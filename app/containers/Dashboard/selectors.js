import { createSelector } from 'reselect';

const selectMain = () => (state) => state.get('mainAppReducer');
const selectDashboard = () => (state) => state.get('dashboardMainReducer');
const selectNavigation = () => (state) => state.get('navigationReducer');

const selectDataType = () => createSelector(
    selectDashboard(),
    (dashboardState) => dashboardState.get('dataType')
);

const selectStoreName = () => createSelector(
    selectMain(),
    (mainState) => mainState.getIn(['data']).storeName
);

const selectDataFetched = () => createSelector(
    selectDashboard(),
    (dashboardState) => dashboardState.get('dataFetched')
);

const selectIsFetching = () => createSelector(
    selectDashboard(),
    (dashboardState) => dashboardState.get('isFetching')
);

const selectView = () => createSelector(
    selectNavigation(),
    (navigationState) => navigationState.get('view')
);

export {
  selectDataType,
  selectStoreName,
  selectDataFetched,
  selectIsFetching,
  selectView
};